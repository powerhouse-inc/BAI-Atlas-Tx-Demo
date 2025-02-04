import { utils } from "document-model/document";
import {
  z,
  EditIssuerInput,
  EditIssuerBankInput,
  EditIssuerWalletInput,
  EditPayerInput,
  EditPayerBankInput,
  EditPayerWalletInput,
} from "../types";
import {
  EditIssuerAction,
  EditIssuerBankAction,
  EditIssuerWalletAction,
  EditPayerAction,
  EditPayerBankAction,
  EditPayerWalletAction,
} from "./actions";

const { createAction } = utils;

export const editIssuer = (input: EditIssuerInput) =>
  createAction<EditIssuerAction>(
    "EDIT_ISSUER",
    { ...input },
    undefined,
    z.EditIssuerInputSchema,
    "global",
  );

export const editIssuerBank = (input: EditIssuerBankInput) =>
  createAction<EditIssuerBankAction>(
    "EDIT_ISSUER_BANK",
    { ...input },
    undefined,
    z.EditIssuerBankInputSchema,
    "global",
  );

export const editIssuerWallet = (input: EditIssuerWalletInput) =>
  createAction<EditIssuerWalletAction>(
    "EDIT_ISSUER_WALLET",
    { ...input },
    undefined,
    z.EditIssuerWalletInputSchema,
    "global",
  );

export const editPayer = (input: EditPayerInput) =>
  createAction<EditPayerAction>(
    "EDIT_PAYER",
    { ...input },
    undefined,
    z.EditPayerInputSchema,
    "global",
  );

export const editPayerBank = (input: EditPayerBankInput) =>
  createAction<EditPayerBankAction>(
    "EDIT_PAYER_BANK",
    { ...input },
    undefined,
    z.EditPayerBankInputSchema,
    "global",
  );

export const editPayerWallet = (input: EditPayerWalletInput) =>
  createAction<EditPayerWalletAction>(
    "EDIT_PAYER_WALLET",
    { ...input },
    undefined,
    z.EditPayerWalletInputSchema,
    "global",
  );
