import { Action } from "document-model/document";
import {
  EditIssuerInput,
  EditIssuerBankInput,
  EditIssuerWalletInput,
  EditPayerInput,
  EditPayerBankInput,
  EditPayerWalletInput,
} from "../types";

export type EditIssuerAction = Action<"EDIT_ISSUER", EditIssuerInput, "global">;
export type EditIssuerBankAction = Action<
  "EDIT_ISSUER_BANK",
  EditIssuerBankInput,
  "global"
>;
export type EditIssuerWalletAction = Action<
  "EDIT_ISSUER_WALLET",
  EditIssuerWalletInput,
  "global"
>;
export type EditPayerAction = Action<"EDIT_PAYER", EditPayerInput, "global">;
export type EditPayerBankAction = Action<
  "EDIT_PAYER_BANK",
  EditPayerBankInput,
  "global"
>;
export type EditPayerWalletAction = Action<
  "EDIT_PAYER_WALLET",
  EditPayerWalletInput,
  "global"
>;

export type InvoicePartiesAction =
  | EditIssuerAction
  | EditIssuerBankAction
  | EditIssuerWalletAction
  | EditPayerAction
  | EditPayerBankAction
  | EditPayerWalletAction;
