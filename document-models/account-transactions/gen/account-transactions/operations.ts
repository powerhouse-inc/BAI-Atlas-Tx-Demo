import { SignalDispatch } from "document-model/document";
import {
  CreateTransactionAction,
  UpdateTransactionAction,
  DeleteTransactionAction,
  UpdateTransactionBudgetAction,
} from "./actions";
import { AccountTransactionsState } from "../types";

export interface AccountTransactionsAccountTransactionsOperations {
  createTransactionOperation: (
    state: AccountTransactionsState,
    action: CreateTransactionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTransactionOperation: (
    state: AccountTransactionsState,
    action: UpdateTransactionAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteTransactionOperation: (
    state: AccountTransactionsState,
    action: DeleteTransactionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTransactionBudgetOperation: (
    state: AccountTransactionsState,
    action: UpdateTransactionBudgetAction,
    dispatch?: SignalDispatch,
  ) => void;
}
