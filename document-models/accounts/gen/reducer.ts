import { ImmutableStateReducer, utils } from "document-model/document";
import { AccountsState, AccountsLocalState, z } from "./types";
import { AccountsAction } from "./actions";

import { reducer as AccountsReducer } from "../src/reducers/accounts";

const stateReducer: ImmutableStateReducer<
  AccountsState,
  AccountsAction,
  AccountsLocalState
> = (state, action, dispatch) => {
  if (utils.isBaseAction(action)) {
    return state;
  }

  switch (action.type) {
    case "CREATE_ACCOUNT":
      z.CreateAccountInputSchema().parse(action.input);
      AccountsReducer.createAccountOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "UPDATE_ACCOUNT":
      z.UpdateAccountInputSchema().parse(action.input);
      AccountsReducer.updateAccountOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "DELETE_ACCOUNT":
      z.DeleteAccountInputSchema().parse(action.input);
      AccountsReducer.deleteAccountOperation(
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
  AccountsState,
  AccountsAction,
  AccountsLocalState
>(stateReducer);
