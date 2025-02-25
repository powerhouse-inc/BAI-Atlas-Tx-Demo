import type { Document, ExtendedState } from "document-model/document";
import type { IntegrationSettingsState } from "./schema/types";
import type { IntegrationSettingsAction } from "./actions";

export { z } from "./schema";
export type * from "./schema/types";
type IntegrationSettingsLocalState = Record<PropertyKey, never>;
export type ExtendedIntegrationSettingsState = ExtendedState<
  IntegrationSettingsState,
  IntegrationSettingsLocalState
>;
export type IntegrationSettingsDocument = Document<
  IntegrationSettingsState,
  IntegrationSettingsAction,
  IntegrationSettingsLocalState
>;
export {
  IntegrationSettingsState,
  IntegrationSettingsLocalState,
  IntegrationSettingsAction,
};
