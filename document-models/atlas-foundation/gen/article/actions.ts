import { Action } from "document-model/document";
import { UpdateFoundationInput, PopulateFoundationInput } from "../types";

export type UpdateFoundationAction = Action<
  "UPDATE_FOUNDATION",
  UpdateFoundationInput,
  "global"
>;
export type PopulateFoundationAction = Action<
  "POPULATE_FOUNDATION",
  PopulateFoundationInput,
  "global"
>;

export type AtlasFoundationArticleAction =
  | UpdateFoundationAction
  | PopulateFoundationAction;
