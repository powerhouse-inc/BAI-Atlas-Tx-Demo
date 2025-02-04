import { DocumentModelUtils, utils as base } from "document-model/document";
import {
  AtlasScopeAction,
  AtlasScopeState,
  AtlasScopeLocalState,
} from "./types";
import { reducer } from "./reducer";

export const initialGlobalState: AtlasScopeState = {
  name: "",
  docNo: "",
  content: "",
  masterStatus: [],
  globalTags: [],
  originalContextData: [],
  provenance: "",
  notionId: "",
};
export const initialLocalState: AtlasScopeLocalState = {};

const utils: DocumentModelUtils<
  AtlasScopeState,
  AtlasScopeAction,
  AtlasScopeLocalState
> = {
  fileExtension: "",
  createState(state) {
    return {
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createExtendedState(extendedState) {
    return base.createExtendedState(
      { ...extendedState, documentType: "sky/atlas-scope" },
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
    return base.saveToFile(document, path, "", name);
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
