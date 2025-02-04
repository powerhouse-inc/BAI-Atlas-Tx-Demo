import { Action } from "document-model/document";
import { UpdateScopeInput, PopulateScopeInput } from "../types";

export type UpdateScopeAction = Action<
  "UPDATE_SCOPE",
  UpdateScopeInput,
  "global"
>;
export type PopulateScopeAction = Action<
  "POPULATE_SCOPE",
  PopulateScopeInput,
  "global"
>;

export type AtlasScopeScopeAction = UpdateScopeAction | PopulateScopeAction;
