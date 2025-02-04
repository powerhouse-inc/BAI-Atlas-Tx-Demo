import { Action } from "document-model/document";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  DeleteTransactionInput,
  UpdateTransactionBudgetInput,
} from "../types";

export type CreateTransactionAction = Action<
  "CREATE_TRANSACTION",
  CreateTransactionInput,
  "global"
>;
export type UpdateTransactionAction = Action<
  "UPDATE_TRANSACTION",
  UpdateTransactionInput,
  "global"
>;
export type DeleteTransactionAction = Action<
  "DELETE_TRANSACTION",
  DeleteTransactionInput,
  "global"
>;
export type UpdateTransactionBudgetAction = Action<
  "UPDATE_TRANSACTION_BUDGET",
  UpdateTransactionBudgetInput,
  "global"
>;

export type AccountTransactionsAccountTransactionsAction =
  | CreateTransactionAction
  | UpdateTransactionAction
  | DeleteTransactionAction
  | UpdateTransactionBudgetAction;
