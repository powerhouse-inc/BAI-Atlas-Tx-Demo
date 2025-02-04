import { BaseDocument } from "document-model/document";
import {
  UpdateFoundationInput,
  PopulateFoundationInput,
  AtlasFoundationState,
  AtlasFoundationLocalState,
} from "../types";
import { updateFoundation, populateFoundation } from "./creators";
import { AtlasFoundationAction } from "../actions";

export default class AtlasFoundation_Article extends BaseDocument<
  AtlasFoundationState,
  AtlasFoundationAction,
  AtlasFoundationLocalState
> {
  public updateFoundation(input: UpdateFoundationInput) {
    return this.dispatch(updateFoundation(input));
  }

  public populateFoundation(input: PopulateFoundationInput) {
    return this.dispatch(populateFoundation(input));
  }
}
