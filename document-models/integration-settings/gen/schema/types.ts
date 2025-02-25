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

export type DeleteGnosisWalletInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
};

export type GnosisSafe = {
  wallets: Maybe<Array<Maybe<Wallet>>>;
};

export type IntegrationSettingsState = {
  gnosisSafe: Maybe<GnosisSafe>;
  requestFinance: Maybe<RequestFinance>;
};

export type RequestFinance = {
  accountEmail: Maybe<Scalars["EmailAddress"]["output"]>;
  appId: Maybe<Scalars["String"]["output"]>;
  appSecret: Maybe<Scalars["String"]["output"]>;
};

export type UpdateGnosisSafeInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  privateKey?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateRequestFinanceInput = {
  accountEmail?: InputMaybe<Scalars["EmailAddress"]["input"]>;
  appId?: InputMaybe<Scalars["String"]["input"]>;
  appSecret?: InputMaybe<Scalars["String"]["input"]>;
};

export type Wallet = {
  address: Maybe<Scalars["String"]["output"]>;
  name: Maybe<Scalars["String"]["output"]>;
  privateKey: Maybe<Scalars["String"]["output"]>;
};
