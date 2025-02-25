import { BaseDocument } from "document-model/document";
import {
  UpdateRequestFinanceInput,
  UpdateGnosisSafeInput,
  DeleteGnosisWalletInput,
  IntegrationSettingsState,
  IntegrationSettingsLocalState,
} from "../types";
import {
  updateRequestFinance,
  updateGnosisSafe,
  deleteGnosisWallet,
} from "./creators";
import { IntegrationSettingsAction } from "../actions";

export default class IntegrationSettings_Settings extends BaseDocument<
  IntegrationSettingsState,
  IntegrationSettingsAction,
  IntegrationSettingsLocalState
> {
  public updateRequestFinance(input: UpdateRequestFinanceInput) {
    return this.dispatch(updateRequestFinance(input));
  }

  public updateGnosisSafe(input: UpdateGnosisSafeInput) {
    return this.dispatch(updateGnosisSafe(input));
  }

  public deleteGnosisWallet(input: DeleteGnosisWalletInput) {
    return this.dispatch(deleteGnosisWallet(input));
  }
}
