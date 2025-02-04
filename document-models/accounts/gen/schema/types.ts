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

export type AccountEntry = {
  account: Maybe<Scalars["EthereumAddress"]["output"]>;
  budgetPath: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  name: Maybe<Scalars["OLabel"]["output"]>;
  type: Maybe<AccountType | `${AccountType}`>;
};

export type AccountType =
  | "Auditor"
  | "Operational"
  | "Payment"
  | "Processor"
  | "Protocol";

export type AccountsState = {
  accounts: Array<AccountEntry>;
};

export type CreateAccountInput = {
  account: Scalars["EthereumAddress"]["input"];
  budgetPath?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["OLabel"]["input"]>;
  type: AccountType | `${AccountType}`;
};

export type DeleteAccountInput = {
  id: Scalars["ID"]["input"];
};

export type UpdateAccountInput = {
  account?: InputMaybe<Scalars["EthereumAddress"]["input"]>;
  budgetPath?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["OLabel"]["input"]>;
  type?: InputMaybe<AccountType | `${AccountType}`>;
};
