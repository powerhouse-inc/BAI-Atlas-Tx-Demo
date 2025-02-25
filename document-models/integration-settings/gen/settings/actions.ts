import { Action } from "document-model/document";
import {
  UpdateRequestFinanceInput,
  UpdateGnosisSafeInput,
  DeleteGnosisWalletInput,
} from "../types";

export type UpdateRequestFinanceAction = Action<
  "UPDATE_REQUEST_FINANCE",
  UpdateRequestFinanceInput,
  "global"
>;
export type UpdateGnosisSafeAction = Action<
  "UPDATE_GNOSIS_SAFE",
  UpdateGnosisSafeInput,
  "global"
>;
export type DeleteGnosisWalletAction = Action<
  "DELETE_GNOSIS_WALLET",
  DeleteGnosisWalletInput,
  "global"
>;

export type IntegrationSettingsSettingsAction =
  | UpdateRequestFinanceAction
  | UpdateGnosisSafeAction
  | DeleteGnosisWalletAction;
