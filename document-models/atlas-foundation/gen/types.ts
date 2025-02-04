import type { Document, ExtendedState } from "document-model/document";
import type { AtlasFoundationState } from "./schema/types";
import type { AtlasFoundationAction } from "./actions";

export { z } from "./schema";
export type * from "./schema/types";
type AtlasFoundationLocalState = Record<PropertyKey, never>;
export type ExtendedAtlasFoundationState = ExtendedState<
  AtlasFoundationState,
  AtlasFoundationLocalState
>;
export type AtlasFoundationDocument = Document<
  AtlasFoundationState,
  AtlasFoundationAction,
  AtlasFoundationLocalState
>;
export {
  AtlasFoundationState,
  AtlasFoundationLocalState,
  AtlasFoundationAction,
};
