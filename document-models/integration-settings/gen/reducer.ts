import { ImmutableStateReducer, utils } from "document-model/document";
import {
  IntegrationSettingsState,
  IntegrationSettingsLocalState,
  z,
} from "./types";
import { IntegrationSettingsAction } from "./actions";

import { reducer as SettingsReducer } from "../src/reducers/settings";

const stateReducer: ImmutableStateReducer<
  IntegrationSettingsState,
  IntegrationSettingsAction,
  IntegrationSettingsLocalState
> = (state, action, dispatch) => {
  if (utils.isBaseAction(action)) {
    return state;
  }

  switch (action.type) {
    case "UPDATE_REQUEST_FINANCE":
      z.UpdateRequestFinanceInputSchema().parse(action.input);
      SettingsReducer.updateRequestFinanceOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "UPDATE_GNOSIS_SAFE":
      z.UpdateGnosisSafeInputSchema().parse(action.input);
      SettingsReducer.updateGnosisSafeOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "DELETE_GNOSIS_WALLET":
      z.DeleteGnosisWalletInputSchema().parse(action.input);
      SettingsReducer.deleteGnosisWalletOperation(
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
  IntegrationSettingsState,
  IntegrationSettingsAction,
  IntegrationSettingsLocalState
>(stateReducer);
