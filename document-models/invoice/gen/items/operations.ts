import { SignalDispatch } from "document-model/document";
import {
  AddLineItemAction,
  EditLineItemAction,
  DeleteLineItemAction,
} from "./actions";
import { InvoiceState } from "../types";

export interface InvoiceItemsOperations {
  addLineItemOperation: (
    state: InvoiceState,
    action: AddLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  editLineItemOperation: (
    state: InvoiceState,
    action: EditLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteLineItemOperation: (
    state: InvoiceState,
    action: DeleteLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
}
