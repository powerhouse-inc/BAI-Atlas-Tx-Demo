import { Action } from "document-model/document";
import {
  AddLineItemInput,
  EditLineItemInput,
  DeleteLineItemInput,
} from "../types";

export type AddLineItemAction = Action<
  "ADD_LINE_ITEM",
  AddLineItemInput,
  "global"
>;
export type EditLineItemAction = Action<
  "EDIT_LINE_ITEM",
  EditLineItemInput,
  "global"
>;
export type DeleteLineItemAction = Action<
  "DELETE_LINE_ITEM",
  DeleteLineItemInput,
  "global"
>;

export type InvoiceItemsAction =
  | AddLineItemAction
  | EditLineItemAction
  | DeleteLineItemAction;
