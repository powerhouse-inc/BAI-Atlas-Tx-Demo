import { Action } from "document-model/document";
import {
  EditInvoiceInput,
  EditStatusInput,
  AddRefInput,
  EditRefInput,
  DeleteRefInput,
} from "../types";

export type EditInvoiceAction = Action<
  "EDIT_INVOICE",
  EditInvoiceInput,
  "global"
>;
export type EditStatusAction = Action<"EDIT_STATUS", EditStatusInput, "global">;
export type AddRefAction = Action<"ADD_REF", AddRefInput, "global">;
export type EditRefAction = Action<"EDIT_REF", EditRefInput, "global">;
export type DeleteRefAction = Action<"DELETE_REF", DeleteRefInput, "global">;

export type InvoiceGeneralAction =
  | EditInvoiceAction
  | EditStatusAction
  | AddRefAction
  | EditRefAction
  | DeleteRefAction;
