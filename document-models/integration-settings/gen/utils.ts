import { DocumentModelUtils, utils as base } from "document-model/document";
import {
  IntegrationSettingsAction,
  IntegrationSettingsState,
  IntegrationSettingsLocalState,
} from "./types";
import { reducer } from "./reducer";

export const initialGlobalState: IntegrationSettingsState = {
  requestFinance: {
    accountEmail: "",
    appId: "",
    appSecret: "",
  },
  gnosisSafe: {
    wallets: [],
  },
};
export const initialLocalState: IntegrationSettingsLocalState = {};

const utils: DocumentModelUtils<
  IntegrationSettingsState,
  IntegrationSettingsAction,
  IntegrationSettingsLocalState
> = {
  fileExtension: ".phdm",
  createState(state) {
    return {
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createExtendedState(extendedState) {
    return base.createExtendedState(
      { ...extendedState, documentType: "powerhouse/integration-settings" },
      utils.createState,
    );
  },
  createDocument(state) {
    return base.createDocument(
      utils.createExtendedState(state),
      utils.createState,
    );
  },
  saveToFile(document, path, name) {
    return base.saveToFile(document, path, ".phdm", name);
  },
  saveToFileHandle(document, input) {
    return base.saveToFileHandle(document, input);
  },
  loadFromFile(path) {
    return base.loadFromFile(path, reducer);
  },
  loadFromInput(input) {
    return base.loadFromInput(input, reducer);
  },
};

export default utils;
