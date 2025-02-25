import { ImmutableStateReducer, utils } from "document-model/document";
import {
  AccountTransactionsState,
  AccountTransactionsLocalState,
  z,
} from "./types";
import { AccountTransactionsAction } from "./actions";

import { reducer as AccountTransactionsReducer } from "../src/reducers/account-transactions";

const stateReducer: ImmutableStateReducer<
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState
> = (state, action, dispatch) => {
  if (utils.isBaseAction(action)) {
    return state;
  }

  switch (action.type) {
    case "CREATE_TRANSACTION":
      z.CreateTransactionInputSchema().parse(action.input);
      AccountTransactionsReducer.createTransactionOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "UPDATE_TRANSACTION":
      z.UpdateTransactionInputSchema().parse(action.input);
      AccountTransactionsReducer.updateTransactionOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "DELETE_TRANSACTION":
      z.DeleteTransactionInputSchema().parse(action.input);
      AccountTransactionsReducer.deleteTransactionOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "UPDATE_TRANSACTION_BUDGET":
      z.UpdateTransactionBudgetInputSchema().parse(action.input);
      AccountTransactionsReducer.updateTransactionBudgetOperation(
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
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState
>(stateReducer);
