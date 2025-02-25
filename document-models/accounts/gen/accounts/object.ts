import { BaseDocument } from "document-model/document";
import {
  CreateAccountInput,
  UpdateAccountInput,
  DeleteAccountInput,
  AccountsState,
  AccountsLocalState,
} from "../types";
import { createAccount, updateAccount, deleteAccount } from "./creators";
import { AccountsAction } from "../actions";

export default class Accounts_Accounts extends BaseDocument<
  AccountsState,
  AccountsAction,
  AccountsLocalState
> {
  public createAccount(input: CreateAccountInput) {
    return this.dispatch(createAccount(input));
  }

  public updateAccount(input: UpdateAccountInput) {
    return this.dispatch(updateAccount(input));
  }

  public deleteAccount(input: DeleteAccountInput) {
    return this.dispatch(deleteAccount(input));
  }
}
