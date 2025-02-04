import { BaseDocument } from "document-model/document";
import {
  EditIssuerInput,
  EditIssuerBankInput,
  EditIssuerWalletInput,
  EditPayerInput,
  EditPayerBankInput,
  EditPayerWalletInput,
  InvoiceState,
  InvoiceLocalState,
} from "../types";
import {
  editIssuer,
  editIssuerBank,
  editIssuerWallet,
  editPayer,
  editPayerBank,
  editPayerWallet,
} from "./creators";
import { InvoiceAction } from "../actions";

export default class Invoice_Parties extends BaseDocument<
  InvoiceState,
  InvoiceAction,
  InvoiceLocalState
> {
  public editIssuer(input: EditIssuerInput) {
    return this.dispatch(editIssuer(input));
  }

  public editIssuerBank(input: EditIssuerBankInput) {
    return this.dispatch(editIssuerBank(input));
  }

  public editIssuerWallet(input: EditIssuerWalletInput) {
    return this.dispatch(editIssuerWallet(input));
  }

  public editPayer(input: EditPayerInput) {
    return this.dispatch(editPayer(input));
  }

  public editPayerBank(input: EditPayerBankInput) {
    return this.dispatch(editPayerBank(input));
  }

  public editPayerWallet(input: EditPayerWalletInput) {
    return this.dispatch(editPayerWallet(input));
  }
}
