import { SignalDispatch } from "document-model/document";
import {
  EditInvoiceAction,
  EditStatusAction,
  AddRefAction,
  EditRefAction,
  DeleteRefAction,
} from "./actions";
import { InvoiceState } from "../types";

export interface InvoiceGeneralOperations {
  editInvoiceOperation: (
    state: InvoiceState,
    action: EditInvoiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  editStatusOperation: (
    state: InvoiceState,
    action: EditStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  addRefOperation: (
    state: InvoiceState,
    action: AddRefAction,
    dispatch?: SignalDispatch,
  ) => void;
  editRefOperation: (
    state: InvoiceState,
    action: EditRefAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteRefOperation: (
    state: InvoiceState,
    action: DeleteRefAction,
    dispatch?: SignalDispatch,
  ) => void;
}
