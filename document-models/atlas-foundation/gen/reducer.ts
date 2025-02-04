import { ImmutableStateReducer, utils } from "document-model/document";
import { AtlasFoundationState, AtlasFoundationLocalState, z } from "./types";
import { AtlasFoundationAction } from "./actions";

import { reducer as ArticleReducer } from "../src/reducers/article";

const stateReducer: ImmutableStateReducer<
  AtlasFoundationState,
  AtlasFoundationAction,
  AtlasFoundationLocalState
> = (state, action, dispatch) => {
  if (utils.isBaseAction(action)) {
    return state;
  }

  switch (action.type) {
    case "UPDATE_FOUNDATION":
      z.UpdateFoundationInputSchema().parse(action.input);
      ArticleReducer.updateFoundationOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "POPULATE_FOUNDATION":
      z.PopulateFoundationInputSchema().parse(action.input);
      ArticleReducer.populateFoundationOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = utils.createReducer<
  AtlasFoundationState,
  AtlasFoundationAction,
  AtlasFoundationLocalState
>(stateReducer);
