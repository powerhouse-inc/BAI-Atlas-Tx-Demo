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

export type AtlasScopeState = {
  content: Maybe<Scalars["String"]["output"]>;
  docNo: Maybe<Scalars["String"]["output"]>;
  globalTags: Array<GlobalTag | `${GlobalTag}`>;
  masterStatus: Maybe<Status | `${Status}`>;
  name: Maybe<Scalars["String"]["output"]>;
  notionId: Maybe<Scalars["String"]["output"]>;
  originalContextData: Array<Scalars["PHID"]["output"]>;
  provenance: Maybe<Scalars["URL"]["output"]>;
};

export type GlobalTag =
  | "ANON_WORKFORCE"
  | "AVC"
  | "CAIS"
  | "DAO_TOOLKIT"
  | "ECOSYSTEM_INTELLIGENCE"
  | "EXTERNAL_REFERENCE"
  | "FACILITATORDAO"
  | "INTERNAL_REFERENCE"
  | "LEGACY_TERM__USE_APPROVED"
  | "ML__DEFER"
  | "ML__HIGH_PRIORITY"
  | "ML__LOW_PRIORITY"
  | "ML__SUPPORT_DOCS_NEEDED"
  | "ML___MED_PRIORITY"
  | "NEWCHAIN"
  | "P0_HUB_ENTRY_NEEDED"
  | "PURPOSE_SYSTEM"
  | "RECURSIVE_IMPROVEMENT"
  | "SCOPE_ADVISOR"
  | "SUBDAO_INCUBATION"
  | "SUBDAO_REWARDS"
  | "TWO_STAGE_BRIDGE"
  | "V1__MIP";

export type PopulateScopeInput = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  docNo?: InputMaybe<Scalars["String"]["input"]>;
  globalTags?: InputMaybe<Array<GlobalTag | `${GlobalTag}`>>;
  masterStatus?: InputMaybe<Status | `${Status}`>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  notionId?: InputMaybe<Scalars["String"]["input"]>;
  originalContextData?: InputMaybe<Array<Scalars["PHID"]["input"]>>;
  provenance?: InputMaybe<Scalars["URL"]["input"]>;
};

export type Status =
  | "APPROVED"
  | "ARCHIVED"
  | "DEFERRED"
  | "PLACEHOLDER"
  | "PROVISIONAL";

export type UpdateScopeInput = {
  globalTags?: InputMaybe<Array<GlobalTag | `${GlobalTag}`>>;
  masterStatus?: InputMaybe<Status | `${Status}`>;
};
