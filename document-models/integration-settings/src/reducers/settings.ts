/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { IntegrationSettingsSettingsOperations } from "../../gen/settings/operations";

export const reducer: IntegrationSettingsSettingsOperations = {
  updateRequestFinanceOperation(state, action, dispatch) {
    state.requestFinance.accountEmail = action.input.accountEmail || "";
    state.requestFinance.appId = action.input.appId || "";
    state.requestFinance.appSecret = action.input.appSecret || "";

  },
  updateGnosisSafeOperation(state, action, dispatch) {
    const wallet = state.gnosisSafe.wallets.find(
      (wallet: any) => wallet.address === action.input.address,
    );
    if (wallet) {
      wallet.name = action.input.name || "";
      wallet.address = action.input.address || "";
      wallet.privateKey = action.input.privateKey || "";
    } else {
      state.gnosisSafe?.wallets?.push({
        address: action.input.address,
        name: action.input.name || "",
        privateKey: action.input.privateKey || "",
      });
    }
  },
  deleteGnosisWalletOperation(state, action, dispatch) {
    const index = state.gnosisSafe?.wallets?.findIndex(
      (wallet: any) => wallet.address === action.input.address,
    );
    if (index !== undefined) {
      state.gnosisSafe?.wallets?.splice(index, 1);
    }
  },
};
