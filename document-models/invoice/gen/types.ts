import type { Document, ExtendedState } from "document-model/document";
import type { InvoiceState } from "./schema/types";
import type { InvoiceAction } from "./actions";

export { z } from "./schema";
export type * from "./schema/types";
type InvoiceLocalState = Record<PropertyKey, never>;
export type ExtendedInvoiceState = ExtendedState<
  InvoiceState,
  InvoiceLocalState
>;
export type InvoiceDocument = Document<
  InvoiceState,
  InvoiceAction,
  InvoiceLocalState
>;
export { InvoiceState, InvoiceLocalState, InvoiceAction };
