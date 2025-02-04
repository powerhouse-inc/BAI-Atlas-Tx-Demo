import {
  BaseDocument,
  ExtendedState,
  PartialState,
  applyMixins,
  SignalDispatch,
} from "document-model/document";
import { InvoiceState, InvoiceLocalState } from "./types";
import { InvoiceAction } from "./actions";
import { reducer } from "./reducer";
import utils from "./utils";
import Invoice_General from "./general/object";
import Invoice_Parties from "./parties/object";
import Invoice_Items from "./items/object";

export * from "./general/object";
export * from "./parties/object";
export * from "./items/object";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface Invoice extends Invoice_General, Invoice_Parties, Invoice_Items {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class Invoice extends BaseDocument<
  InvoiceState,
  InvoiceAction,
  InvoiceLocalState
> {
  static fileExtension = ".test.ph";

  constructor(
    initialState?: Partial<
      ExtendedState<PartialState<InvoiceState>, PartialState<InvoiceLocalState>>
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, Invoice.fileExtension, name);
  }

  public loadFromFile(path: string) {
    return super.loadFromFile(path);
  }

  static async fromFile(path: string) {
    const document = new this();
    await document.loadFromFile(path);
    return document;
  }
}

applyMixins(Invoice, [Invoice_General, Invoice_Parties, Invoice_Items]);

export { Invoice };
