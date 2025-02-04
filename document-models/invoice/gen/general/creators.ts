import { utils } from "document-model/document";
import {
  z,
  EditInvoiceInput,
  EditStatusInput,
  AddRefInput,
  EditRefInput,
  DeleteRefInput,
} from "../types";
import {
  EditInvoiceAction,
  EditStatusAction,
  AddRefAction,
  EditRefAction,
  DeleteRefAction,
} from "./actions";

const { createAction } = utils;

export const editInvoice = (input: EditInvoiceInput) =>
  createAction<EditInvoiceAction>(
    "EDIT_INVOICE",
    { ...input },
    undefined,
    z.EditInvoiceInputSchema,
    "global",
  );

export const editStatus = (input: EditStatusInput) =>
  createAction<EditStatusAction>(
    "EDIT_STATUS",
    { ...input },
    undefined,
    z.EditStatusInputSchema,
    "global",
  );

export const addRef = (input: AddRefInput) =>
  createAction<AddRefAction>(
    "ADD_REF",
    { ...input },
    undefined,
    z.AddRefInputSchema,
    "global",
  );

export const editRef = (input: EditRefInput) =>
  createAction<EditRefAction>(
    "EDIT_REF",
    { ...input },
    undefined,
    z.EditRefInputSchema,
    "global",
  );

export const deleteRef = (input: DeleteRefInput) =>
  createAction<DeleteRefAction>(
    "DELETE_REF",
    { ...input },
    undefined,
    z.DeleteRefInputSchema,
    "global",
  );
