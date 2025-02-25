import { utils } from "document-model/document";
import {
  z,
  UpdateRequestFinanceInput,
  UpdateGnosisSafeInput,
  DeleteGnosisWalletInput,
} from "../types";
import {
  UpdateRequestFinanceAction,
  UpdateGnosisSafeAction,
  DeleteGnosisWalletAction,
} from "./actions";

const { createAction } = utils;

export const updateRequestFinance = (input: UpdateRequestFinanceInput) =>
  createAction<UpdateRequestFinanceAction>(
    "UPDATE_REQUEST_FINANCE",
    { ...input },
    undefined,
    z.UpdateRequestFinanceInputSchema,
    "global",
  );

export const updateGnosisSafe = (input: UpdateGnosisSafeInput) =>
  createAction<UpdateGnosisSafeAction>(
    "UPDATE_GNOSIS_SAFE",
    { ...input },
    undefined,
    z.UpdateGnosisSafeInputSchema,
    "global",
  );

export const deleteGnosisWallet = (input: DeleteGnosisWalletInput) =>
  createAction<DeleteGnosisWalletAction>(
    "DELETE_GNOSIS_WALLET",
    { ...input },
    undefined,
    z.DeleteGnosisWalletInputSchema,
    "global",
  );
