import { generateId } from "document-model/utils";
import {
  AnalyticsProcessor,
  ProcessorOptions,
  ProcessorUpdate,
  AnalyticsSeriesInput,
} from "@powerhousedao/reactor-api";
import { AnalyticsPath } from "@powerhousedao/analytics-engine-core";
import { AddFileInput, DeleteNodeInput, DocumentDriveDocument } from "document-model-libs/document-drive";
import { DateTime } from "luxon";

const log = (msg: string) => {
  console.log(`[DocumentAnalyticsProcessor] ${msg}`);
};

type DocumentType = DocumentDriveDocument;

const findNode = (state: any, id: string) => {
  const { nodes } = state;
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
  }

  return null;
};

export class DocumentAnalyticsProcessor extends AnalyticsProcessor<DocumentType> {
  protected processorOptions: ProcessorOptions = {
    listenerId: generateId(),
    filter: {
      branch: ["main"],
      documentId: ["*"],
      documentType: ["powerhouse/document-drive"],
      scope: ["global"],
    },
    block: false,
    label: "document-analytics",
    system: true,
  };

  async onStrands(strands: ProcessorUpdate<DocumentType>[]): Promise<void> {
    if (strands.length === 0) {
      log('no strands');
      return;
    }

    const values:AnalyticsSeriesInput[] = [];

    for (const strand of strands) {
      if (strand.operations.length === 0) {
        log('no operations');
        continue;
      }

      const source = AnalyticsPath.fromStringArray(["switchboard", "default", strand.driveId]);
      
      const firstOp = strand.operations[0];
      if (firstOp.index === 0) {
        log('clearing source');
        await this.clearSource(source);
      }

      for (const operation of strand.operations) {
        const start = DateTime.fromISO(operation.timestamp);
        const dimensions: any = {
          "document-drive": AnalyticsPath.fromStringArray(
            ["ph", "drive", strand.driveId],
          ),
        }

        switch (operation.type) {
          case "ADD_FILE": {
            log('ADD_FILE');

            // count documents of each type (ADD_FILE, input.documentType)

            // lookup node in state
            const input = operation.input as AddFileInput;
            const node = findNode(strand.state, input.id);
            if (!node) {
              continue;
            }
    
            // update dimensions
            dimensions["document-type"] = AnalyticsPath.fromStringArray(
              ["ph", "document-type", input.documentType],
            );
            dimensions["kind"] = AnalyticsPath.fromStringArray(
              ["document", "kind", node.kind],
            );
    
            values.push({
              source,
              start,
              value: 1,
              metric: "Count",
              dimensions,
            });
            
            break;
          }
          case "ADD_FOLDER": {
            log('ADD_FOLDER');

            dimensions["kind"] = AnalyticsPath.fromStringArray(
              ["document", "kind", "folder"],
            );
    
            values.push({
              source,
              start,
              value: 1,
              metric: "Count",
              dimensions,
            });
            
            break;
          }
          case "DELETE_NODE": {
            log('DELETE_NODE');

            // lookup item type in previous state
            const input = operation.input as DeleteNodeInput;
            const node = findNode(operation.previousState, input.id);
            if (!node) {
              continue;
            }
    
            dimensions["kind"] = AnalyticsPath.fromStringArray(
              ["document", "kind", node.kind],
            );

            if (node.documentType) {
              dimensions["document-type"] = AnalyticsPath.fromStringArray(
                ["ph", "document-type", node.documentType],
              );
            }
    
            values.push({
              source,
              start,
              value: -1,
              metric: "Count",
              dimensions,
            });
    
            break;
          }
        }
      }
    }

    if (values.length > 0) {
      log('Adding values', JSON.stringify(values, null, 2));

      // batch insert
      try {
        await this.analyticsStore.addSeriesValues(values);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async onDisconnect() {}

  private async clearSource(source: AnalyticsPath) {
    try {
      await this.analyticsStore.clearSeriesBySource(source, true);
    } catch (e) {
      console.error(e);
    }
  }
}
