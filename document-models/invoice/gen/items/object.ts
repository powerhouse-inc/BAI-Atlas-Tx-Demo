import { BaseDocument } from "document-model/document";
import {
  AddLineItemInput,
  EditLineItemInput,
  DeleteLineItemInput,
  InvoiceState,
  InvoiceLocalState,
} from "../types";
import { addLineItem, editLineItem, deleteLineItem } from "./creators";
import { InvoiceAction } from "../actions";

export default class Invoice_Items extends BaseDocument<
  InvoiceState,
  InvoiceAction,
  InvoiceLocalState
> {
  public addLineItem(input: AddLineItemInput) {
    return this.dispatch(addLineItem(input));
  }

  public editLineItem(input: EditLineItemInput) {
    return this.dispatch(editLineItem(input));
  }

  public deleteLineItem(input: DeleteLineItemInput) {
    return this.dispatch(deleteLineItem(input));
  }
}
