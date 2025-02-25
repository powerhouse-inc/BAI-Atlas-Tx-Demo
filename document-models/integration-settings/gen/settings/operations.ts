import { SignalDispatch } from "document-model/document";
import {
  UpdateRequestFinanceAction,
  UpdateGnosisSafeAction,
  DeleteGnosisWalletAction,
} from "./actions";
import { IntegrationSettingsState } from "../types";

export interface IntegrationSettingsSettingsOperations {
  updateRequestFinanceOperation: (
    state: IntegrationSettingsState,
    action: UpdateRequestFinanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateGnosisSafeOperation: (
    state: IntegrationSettingsState,
    action: UpdateGnosisSafeAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteGnosisWalletOperation: (
    state: IntegrationSettingsState,
    action: DeleteGnosisWalletAction,
    dispatch?: SignalDispatch,
  ) => void;
}
