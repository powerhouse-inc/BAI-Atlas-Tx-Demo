export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
};

export type AccountTransactionsState = {
  budgets: Array<Budget>;
  transactions: Array<TransactionEntry>;
};

export type BankTransactionDetails = {
  currency: Scalars["Currency"]["output"];
  referenceNumber: Maybe<Scalars["String"]["output"]>;
  transactionId: Maybe<Scalars["String"]["output"]>;
};

export type BankTransactionDetailsInput = {
  currency: Scalars["Currency"]["input"];
  referenceNumber?: InputMaybe<Scalars["String"]["input"]>;
  transactionId?: InputMaybe<Scalars["String"]["input"]>;
};

export type Budget = {
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["OLabel"]["input"]>;
};

export type CreateTransactionInput = {
  amount: Scalars["Amount_Money"]["input"];
  budget?: InputMaybe<Scalars["OID"]["input"]>;
  datetime: Scalars["DateTime"]["input"];
  details: TransactionDetailsInput;
  fromAccount?: InputMaybe<Scalars["EthereumAddress"]["input"]>;
  toAccount?: InputMaybe<Scalars["EthereumAddress"]["input"]>;
};

export type CryptoTransactionDetails = {
  blockNumber: Maybe<Scalars["Int"]["output"]>;
  token: Scalars["Currency"]["output"];
  txHash: Scalars["String"]["output"];
};

export type CryptoTransactionDetailsInput = {
  blockNumber?: InputMaybe<Scalars["Int"]["input"]>;
  token: Scalars["Currency"]["input"];
  txHash: Scalars["String"]["input"];
};

export type DeleteTransactionInput = {
  id: Scalars["ID"]["input"];
};

export type TransactionDetails =
  | BankTransactionDetails
  | CryptoTransactionDetails;

export type TransactionDetailsInput = {
  bank?: InputMaybe<BankTransactionDetailsInput>;
  crypto?: InputMaybe<CryptoTransactionDetailsInput>;
};

export type TransactionEntry = {
  amount: Scalars["Amount_Money"]["output"];
  budget: Maybe<Scalars["OID"]["output"]>;
  datetime: Scalars["DateTime"]["output"];
  details: TransactionDetails;
  fromAccount: Maybe<Scalars["EthereumAddress"]["output"]>;
  id: Scalars["ID"]["output"];
  toAccount: Maybe<Scalars["EthereumAddress"]["output"]>;
};

export type UpdateTransactionBudgetInput = {
  budgetId: Scalars["OID"]["input"];
  txId: Scalars["ID"]["input"];
};

export type UpdateTransactionInput = {
  amount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  budget?: InputMaybe<Scalars["OID"]["input"]>;
  datetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  details?: InputMaybe<TransactionDetailsInput>;
  fromAccount?: InputMaybe<Scalars["EthereumAddress"]["input"]>;
  toAccount?: InputMaybe<Scalars["EthereumAddress"]["input"]>;
};
