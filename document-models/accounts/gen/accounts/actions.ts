import { Action } from "document-model/document";
import {
  CreateAccountInput,
  UpdateAccountInput,
  DeleteAccountInput,
} from "../types";

export type CreateAccountAction = Action<
  "CREATE_ACCOUNT",
  CreateAccountInput,
  "global"
>;
export type UpdateAccountAction = Action<
  "UPDATE_ACCOUNT",
  UpdateAccountInput,
  "global"
>;
export type DeleteAccountAction = Action<
  "DELETE_ACCOUNT",
  DeleteAccountInput,
  "global"
>;

export type AccountsAccountsAction =
  | CreateAccountAction
  | UpdateAccountAction
  | DeleteAccountAction;
