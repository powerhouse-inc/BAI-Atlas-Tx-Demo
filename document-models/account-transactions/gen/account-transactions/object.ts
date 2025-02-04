import { BaseDocument } from "document-model/document";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  DeleteTransactionInput,
  UpdateTransactionBudgetInput,
  AccountTransactionsState,
  AccountTransactionsLocalState,
} from "../types";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  updateTransactionBudget,
} from "./creators";
import { AccountTransactionsAction } from "../actions";

export default class AccountTransactions_AccountTransactions extends BaseDocument<
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState
> {
  public createTransaction(input: CreateTransactionInput) {
    return this.dispatch(createTransaction(input));
  }

  public updateTransaction(input: UpdateTransactionInput) {
    return this.dispatch(updateTransaction(input));
  }

  public deleteTransaction(input: DeleteTransactionInput) {
    return this.dispatch(deleteTransaction(input));
  }

  public updateTransactionBudget(input: UpdateTransactionBudgetInput) {
    return this.dispatch(updateTransactionBudget(input));
  }
}
