import { DocumentModelUtils, utils as base } from "document-model/document";
import {
  AccountTransactionsAction,
  AccountTransactionsState,
  AccountTransactionsLocalState,
} from "./types";
import { reducer } from "./reducer";

export const initialGlobalState: AccountTransactionsState = {
  transactions: [],
};
export const initialLocalState: AccountTransactionsLocalState = {};

const utils: DocumentModelUtils<
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState
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
      { ...extendedState, documentType: "powerhouse/account-transactions" },
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
