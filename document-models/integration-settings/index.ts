/**
 * This is a scaffold file meant for customization.
 * Delete the file and run the code generator again to have it reset
 */

import { actions as BaseActions, DocumentModel } from "document-model/document";
import {
  actions as IntegrationSettingsActions,
  IntegrationSettings,
} from "./gen";
import { reducer } from "./gen/reducer";
import { documentModel } from "./gen/document-model";
import genUtils from "./gen/utils";
import * as customUtils from "./src/utils";
import {
  IntegrationSettingsState,
  IntegrationSettingsAction,
  IntegrationSettingsLocalState,
} from "./gen/types";

const Document = IntegrationSettings;
const utils = { ...genUtils, ...customUtils };
const actions = { ...BaseActions, ...IntegrationSettingsActions };

export const module: DocumentModel<
  IntegrationSettingsState,
  IntegrationSettingsAction,
  IntegrationSettingsLocalState
> = {
  Document,
  reducer,
  actions,
  utils,
  documentModel,
};

export {
  IntegrationSettings,
  Document,
  reducer,
  actions,
  utils,
  documentModel,
};

export * from "./gen/types";
export * from "./src/utils";
