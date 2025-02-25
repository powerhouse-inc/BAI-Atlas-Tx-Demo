import { SignalDispatch } from "document-model/document";
import { UpdateScopeAction, PopulateScopeAction } from "./actions";
import { AtlasScopeState } from "../types";

export interface AtlasScopeScopeOperations {
  updateScopeOperation: (
    state: AtlasScopeState,
    action: UpdateScopeAction,
    dispatch?: SignalDispatch,
  ) => void;
  populateScopeOperation: (
    state: AtlasScopeState,
    action: PopulateScopeAction,
    dispatch?: SignalDispatch,
  ) => void;
}
