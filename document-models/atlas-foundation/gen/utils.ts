import { DocumentModelUtils, utils as base } from "document-model/document";
import {
  AtlasFoundationAction,
  AtlasFoundationState,
  AtlasFoundationLocalState,
} from "./types";
import { reducer } from "./reducer";

export const initialGlobalState: AtlasFoundationState = {
  name: "",
  docNo: "",
  parent: "",
  atlasType: "ARTICLE",
  content: "",
  masterStatus: "PLACEHOLDER",
  globalTags: [],
  references: [],
  originalContextData: [],
  provenance: "",
  notionId: "",
};
export const initialLocalState: AtlasFoundationLocalState = {};

const utils: DocumentModelUtils<
  AtlasFoundationState,
  AtlasFoundationAction,
  AtlasFoundationLocalState
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
      { ...extendedState, documentType: "sky/atlas-foundation" },
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
