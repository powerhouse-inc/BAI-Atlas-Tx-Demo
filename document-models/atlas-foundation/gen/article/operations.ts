import { SignalDispatch } from "document-model/document";
import { UpdateFoundationAction, PopulateFoundationAction } from "./actions";
import { AtlasFoundationState } from "../types";

export interface AtlasFoundationArticleOperations {
  updateFoundationOperation: (
    state: AtlasFoundationState,
    action: UpdateFoundationAction,
    dispatch?: SignalDispatch,
  ) => void;
  populateFoundationOperation: (
    state: AtlasFoundationState,
    action: PopulateFoundationAction,
    dispatch?: SignalDispatch,
  ) => void;
}
