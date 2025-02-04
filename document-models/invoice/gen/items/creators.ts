import { utils } from "document-model/document";
import {
  z,
  AddLineItemInput,
  EditLineItemInput,
  DeleteLineItemInput,
} from "../types";
import {
  AddLineItemAction,
  EditLineItemAction,
  DeleteLineItemAction,
} from "./actions";

const { createAction } = utils;

export const addLineItem = (input: AddLineItemInput) =>
  createAction<AddLineItemAction>(
    "ADD_LINE_ITEM",
    { ...input },
    undefined,
    z.AddLineItemInputSchema,
    "global",
  );

export const editLineItem = (input: EditLineItemInput) =>
  createAction<EditLineItemAction>(
    "EDIT_LINE_ITEM",
    { ...input },
    undefined,
    z.EditLineItemInputSchema,
    "global",
  );

export const deleteLineItem = (input: DeleteLineItemInput) =>
  createAction<DeleteLineItemAction>(
    "DELETE_LINE_ITEM",
    { ...input },
    undefined,
    z.DeleteLineItemInputSchema,
    "global",
  );
