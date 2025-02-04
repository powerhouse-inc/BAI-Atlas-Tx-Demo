import type { Document, ExtendedState } from "document-model/document";
import type { AtlasScopeState } from "./schema/types";
import type { AtlasScopeAction } from "./actions";

export { z } from "./schema";
export type * from "./schema/types";
type AtlasScopeLocalState = Record<PropertyKey, never>;
export type ExtendedAtlasScopeState = ExtendedState<
  AtlasScopeState,
  AtlasScopeLocalState
>;
export type AtlasScopeDocument = Document<
  AtlasScopeState,
  AtlasScopeAction,
  AtlasScopeLocalState
>;
export { AtlasScopeState, AtlasScopeLocalState, AtlasScopeAction };
