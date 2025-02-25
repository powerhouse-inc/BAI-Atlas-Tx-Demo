import { z } from "zod";
import {
  AccountTransactionsState,
  BankTransactionDetails,
  BankTransactionDetailsInput,
  Budget,
  CreateTransactionInput,
  CryptoTransactionDetails,
  CryptoTransactionDetailsInput,
  DeleteTransactionInput,
  TransactionDetailsInput,
  TransactionEntry,
  UpdateTransactionBudgetInput,
  UpdateTransactionInput,
} from "./types";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export function AccountTransactionsStateSchema(): z.ZodObject<
  Properties<AccountTransactionsState>
> {
  return z.object({
    __typename: z.literal("AccountTransactionsState").optional(),
    budgets: z.array(BudgetSchema()),
    transactions: z.array(TransactionEntrySchema()),
  });
}

export function BankTransactionDetailsSchema(): z.ZodObject<
  Properties<BankTransactionDetails>
> {
  return z.object({
    __typename: z.literal("BankTransactionDetails").optional(),
    currency: z.string(),
    referenceNumber: z.string().nullable(),
    transactionId: z.string().nullable(),
  });
}

export function BankTransactionDetailsInputSchema(): z.ZodObject<
  Properties<BankTransactionDetailsInput>
> {
  return z.object({
    currency: z.string(),
    referenceNumber: z.string().nullish(),
    transactionId: z.string().nullish(),
  });
}

export function BudgetSchema(): z.ZodObject<Properties<Budget>> {
  return z.object({
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function CreateTransactionInputSchema(): z.ZodObject<
  Properties<CreateTransactionInput>
> {
  return z.object({
    amount: z.number(),
    budget: z.string().nullish(),
    datetime: z.string().datetime(),
    details: z.lazy(() => TransactionDetailsInputSchema()),
    fromAccount: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
    toAccount: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
  });
}

export function CryptoTransactionDetailsSchema(): z.ZodObject<
  Properties<CryptoTransactionDetails>
> {
  return z.object({
    __typename: z.literal("CryptoTransactionDetails").optional(),
    blockNumber: z.number().nullable(),
    token: z.string(),
    txHash: z.string(),
  });
}

export function CryptoTransactionDetailsInputSchema(): z.ZodObject<
  Properties<CryptoTransactionDetailsInput>
> {
  return z.object({
    blockNumber: z.number().nullish(),
    token: z.string(),
    txHash: z.string(),
  });
}

export function DeleteTransactionInputSchema(): z.ZodObject<
  Properties<DeleteTransactionInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function TransactionDetailsSchema() {
  return z.union([
    BankTransactionDetailsSchema(),
    CryptoTransactionDetailsSchema(),
  ]);
}

export function TransactionDetailsInputSchema(): z.ZodObject<
  Properties<TransactionDetailsInput>
> {
  return z.object({
    bank: z.lazy(() => BankTransactionDetailsInputSchema().nullish()),
    crypto: z.lazy(() => CryptoTransactionDetailsInputSchema().nullish()),
  });
}

export function TransactionEntrySchema(): z.ZodObject<
  Properties<TransactionEntry>
> {
  return z.object({
    __typename: z.literal("TransactionEntry").optional(),
    amount: z.number(),
    budget: z.string().nullable(),
    datetime: z.string().datetime(),
    details: TransactionDetailsSchema(),
    fromAccount: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullable(),
    id: z.string(),
    toAccount: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullable(),
  });
}

export function UpdateTransactionBudgetInputSchema(): z.ZodObject<
  Properties<UpdateTransactionBudgetInput>
> {
  return z.object({
    budgetId: z.string(),
    txId: z.string(),
  });
}

export function UpdateTransactionInputSchema(): z.ZodObject<
  Properties<UpdateTransactionInput>
> {
  return z.object({
    amount: z.number().nullish(),
    budget: z.string().nullish(),
    datetime: z.string().datetime().nullish(),
    details: z.lazy(() => TransactionDetailsInputSchema().nullish()),
    fromAccount: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
    toAccount: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
  });
}
