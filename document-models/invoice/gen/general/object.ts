import { BaseDocument } from "document-model/document";
import {
  EditInvoiceInput,
  EditStatusInput,
  AddRefInput,
  EditRefInput,
  DeleteRefInput,
  InvoiceState,
  InvoiceLocalState,
} from "../types";
import {
  editInvoice,
  editStatus,
  addRef,
  editRef,
  deleteRef,
} from "./creators";
import { InvoiceAction } from "../actions";

export default class Invoice_General extends BaseDocument<
  InvoiceState,
  InvoiceAction,
  InvoiceLocalState
> {
  public editInvoice(input: EditInvoiceInput) {
    return this.dispatch(editInvoice(input));
  }

  public editStatus(input: EditStatusInput) {
    return this.dispatch(editStatus(input));
  }

  public addRef(input: AddRefInput) {
    return this.dispatch(addRef(input));
  }

  public editRef(input: EditRefInput) {
    return this.dispatch(editRef(input));
  }

  public deleteRef(input: DeleteRefInput) {
    return this.dispatch(deleteRef(input));
  }
}
