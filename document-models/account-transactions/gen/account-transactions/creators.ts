import { utils } from "document-model/document";
import {
  z,
  CreateTransactionInput,
  UpdateTransactionInput,
  DeleteTransactionInput,
  UpdateTransactionBudgetInput,
} from "../types";
import {
  CreateTransactionAction,
  UpdateTransactionAction,
  DeleteTransactionAction,
  UpdateTransactionBudgetAction,
} from "./actions";

const { createAction } = utils;

export const createTransaction = (input: CreateTransactionInput) =>
  createAction<CreateTransactionAction>(
    "CREATE_TRANSACTION",
    { ...input },
    undefined,
    z.CreateTransactionInputSchema,
    "global",
  );

export const updateTransaction = (input: UpdateTransactionInput) =>
  createAction<UpdateTransactionAction>(
    "UPDATE_TRANSACTION",
    { ...input },
    undefined,
    z.UpdateTransactionInputSchema,
    "global",
  );

export const deleteTransaction = (input: DeleteTransactionInput) =>
  createAction<DeleteTransactionAction>(
    "DELETE_TRANSACTION",
    { ...input },
    undefined,
    z.DeleteTransactionInputSchema,
    "global",
  );

export const updateTransactionBudget = (input: UpdateTransactionBudgetInput) =>
  createAction<UpdateTransactionBudgetAction>(
    "UPDATE_TRANSACTION_BUDGET",
    { ...input },
    undefined,
    z.UpdateTransactionBudgetInputSchema,
    "global",
  );
