import type { Document, ExtendedState } from "document-model/document";
import type { AccountTransactionsState } from "./schema/types";
import type { AccountTransactionsAction } from "./actions";

export { z } from "./schema";
export type * from "./schema/types";
type AccountTransactionsLocalState = Record<PropertyKey, never>;
export type ExtendedAccountTransactionsState = ExtendedState<
  AccountTransactionsState,
  AccountTransactionsLocalState
>;
export type AccountTransactionsDocument = Document<
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState
>;
export {
  AccountTransactionsState,
  AccountTransactionsLocalState,
  AccountTransactionsAction,
};
