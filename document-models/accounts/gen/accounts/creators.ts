import { utils } from "document-model/document";
import {
  z,
  CreateAccountInput,
  UpdateAccountInput,
  DeleteAccountInput,
} from "../types";
import {
  CreateAccountAction,
  UpdateAccountAction,
  DeleteAccountAction,
} from "./actions";

const { createAction } = utils;

export const createAccount = (input: CreateAccountInput) =>
  createAction<CreateAccountAction>(
    "CREATE_ACCOUNT",
    { ...input },
    undefined,
    z.CreateAccountInputSchema,
    "global",
  );

export const updateAccount = (input: UpdateAccountInput) =>
  createAction<UpdateAccountAction>(
    "UPDATE_ACCOUNT",
    { ...input },
    undefined,
    z.UpdateAccountInputSchema,
    "global",
  );

export const deleteAccount = (input: DeleteAccountInput) =>
  createAction<DeleteAccountAction>(
    "DELETE_ACCOUNT",
    { ...input },
    undefined,
    z.DeleteAccountInputSchema,
    "global",
  );
