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

export type AtlasFoundationState = {
  atlasType: FAtlasType | `${FAtlasType}`;
  content: Maybe<Scalars["String"]["output"]>;
  docNo: Maybe<Scalars["String"]["output"]>;
  globalTags: Array<FGlobalTag | `${FGlobalTag}`>;
  masterStatus: FStatus | `${FStatus}`;
  name: Maybe<Scalars["String"]["output"]>;
  notionId: Maybe<Scalars["String"]["output"]>;
  originalContextData: Array<Scalars["PHID"]["output"]>;
  parent: Scalars["PHID"]["output"];
  provenance: Maybe<Scalars["URL"]["output"]>;
  references: Array<Scalars["PHID"]["output"]>;
};

export type FAtlasType =
  | "ACTIVE_DATA_CONTROLLER"
  | "ARTICLE"
  | "CORE"
  | "SECTION";

export type FGlobalTag =
  | "AVC"
  | "AVC_"
  | "CAIS"
  | "CAIS_"
  | "DAO_TOOLKIT"
  | "DAO_TOOLKIT_"
  | "ECOSYSTEM_INTELLIGENCE"
  | "ECOSYSTEM_INTELLIGENCE_"
  | "EXTERNAL_REFERENCE"
  | "EXTERNAL_REFERENCE_"
  | "LEGACY_TERM_USE_APPROVED"
  | "LEGACY_TERM_USE_APPROVED_"
  | "ML_DEFER"
  | "ML_DEFER_"
  | "ML_LOW_PRIORITY"
  | "ML_LOW_PRIORITY_"
  | "ML_SUPPORT_DOCS_NEEDED"
  | "ML_SUPPORT_DOCS_NEEDED_"
  | "NEWCHAIN"
  | "NEWCHAIN_"
  | "PURPOSE_SYSTEM"
  | "PURPOSE_SYSTEM_"
  | "RECURSIVE_IMPROVEMENT"
  | "RECURSIVE_IMPROVEMENT_"
  | "SCOPE_ADVISOR"
  | "SCOPE_ADVISOR_"
  | "TWO_STAGE_BRIDGE"
  | "TWO_STAGE_BRIDGE_";

export type FStatus =
  | "APPROVED"
  | "ARCHIVED"
  | "DEFERRED"
  | "PLACEHOLDER"
  | "PROVISIONAL";

export type PopulateFoundationInput = {
  atlasType: FAtlasType | `${FAtlasType}`;
  content?: InputMaybe<Scalars["String"]["input"]>;
  docNo?: InputMaybe<Scalars["String"]["input"]>;
  globalTags?: InputMaybe<Array<FGlobalTag | `${FGlobalTag}`>>;
  masterStatus: FStatus | `${FStatus}`;
  name?: InputMaybe<Scalars["String"]["input"]>;
  notionId?: InputMaybe<Scalars["String"]["input"]>;
  originalContextData?: InputMaybe<Array<Scalars["PHID"]["input"]>>;
  parent: Scalars["PHID"]["input"];
  provenance?: InputMaybe<Scalars["URL"]["input"]>;
  references?: InputMaybe<Array<Scalars["PHID"]["input"]>>;
};

export type UpdateFoundationInput = {
  atlasType: FAtlasType | `${FAtlasType}`;
  content?: InputMaybe<Scalars["String"]["input"]>;
  globalTags?: InputMaybe<Array<FGlobalTag | `${FGlobalTag}`>>;
  masterStatus?: InputMaybe<FStatus | `${FStatus}`>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  references?: InputMaybe<Array<Scalars["PHID"]["input"]>>;
};
