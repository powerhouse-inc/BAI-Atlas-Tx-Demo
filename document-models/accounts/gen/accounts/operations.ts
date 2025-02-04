import { SignalDispatch } from "document-model/document";
import {
  CreateAccountAction,
  UpdateAccountAction,
  DeleteAccountAction,
} from "./actions";
import { AccountsState } from "../types";

export interface AccountsAccountsOperations {
  createAccountOperation: (
    state: AccountsState,
    action: CreateAccountAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateAccountOperation: (
    state: AccountsState,
    action: UpdateAccountAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteAccountOperation: (
    state: AccountsState,
    action: DeleteAccountAction,
    dispatch?: SignalDispatch,
  ) => void;
}
