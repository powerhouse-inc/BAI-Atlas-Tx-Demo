import { ImmutableStateReducer, utils } from "document-model/document";
import { AtlasScopeState, AtlasScopeLocalState, z } from "./types";
import { AtlasScopeAction } from "./actions";

import { reducer as ScopeReducer } from "../src/reducers/scope";

const stateReducer: ImmutableStateReducer<
  AtlasScopeState,
  AtlasScopeAction,
  AtlasScopeLocalState
> = (state, action, dispatch) => {
  if (utils.isBaseAction(action)) {
    return state;
  }

  switch (action.type) {
    case "UPDATE_SCOPE":
      z.UpdateScopeInputSchema().parse(action.input);
      ScopeReducer.updateScopeOperation(state[action.scope], action, dispatch);
      break;

    case "POPULATE_SCOPE":
      z.PopulateScopeInputSchema().parse(action.input);
      ScopeReducer.populateScopeOperation(
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
  AtlasScopeState,
  AtlasScopeAction,
  AtlasScopeLocalState
>(stateReducer);
