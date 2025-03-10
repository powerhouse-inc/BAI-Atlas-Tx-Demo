/**
 * This is a scaffold file meant for customization.
 * Delete the file and run the code generator again to have it reset
 */

import { actions as BaseActions, DocumentModel } from "document-model/document";
import { actions as InvoiceActions, Invoice } from "./gen";
import { reducer } from "./gen/reducer";
import { documentModel } from "./gen/document-model";
import genUtils from "./gen/utils";
import * as customUtils from "./src/utils";
import { InvoiceState, InvoiceAction, InvoiceLocalState } from "./gen/types";

const Document = Invoice;
const utils = { ...genUtils, ...customUtils };
const actions = { ...BaseActions, ...InvoiceActions };

export const module: DocumentModel<
  InvoiceState,
  InvoiceAction,
  InvoiceLocalState
> = {
  Document,
  reducer,
  actions,
  utils,
  documentModel,
};

export { Invoice, Document, reducer, actions, utils, documentModel };

export * from "./gen/types";
export * from "./src/utils";
