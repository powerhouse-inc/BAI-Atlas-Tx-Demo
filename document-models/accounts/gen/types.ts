import type { Document, ExtendedState } from "document-model/document";
import type { AccountsState } from "./schema/types";
import type { AccountsAction } from "./actions";

export { z } from "./schema";
export type * from "./schema/types";
type AccountsLocalState = Record<PropertyKey, never>;
export type ExtendedAccountsState = ExtendedState<
  AccountsState,
  AccountsLocalState
>;
export type AccountsDocument = Document<
  AccountsState,
  AccountsAction,
  AccountsLocalState
>;
export { AccountsState, AccountsLocalState, AccountsAction };
