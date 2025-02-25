import { BaseDocument } from "document-model/document";
import {
  UpdateScopeInput,
  PopulateScopeInput,
  AtlasScopeState,
  AtlasScopeLocalState,
} from "../types";
import { updateScope, populateScope } from "./creators";
import { AtlasScopeAction } from "../actions";

export default class AtlasScope_Scope extends BaseDocument<
  AtlasScopeState,
  AtlasScopeAction,
  AtlasScopeLocalState
> {
  public updateScope(input: UpdateScopeInput) {
    return this.dispatch(updateScope(input));
  }

  public populateScope(input: PopulateScopeInput) {
    return this.dispatch(populateScope(input));
  }
}
