import { InvoiceGeneralAction } from "./general/actions";
import { InvoicePartiesAction } from "./parties/actions";
import { InvoiceItemsAction } from "./items/actions";

export * from "./general/actions";
export * from "./parties/actions";
export * from "./items/actions";

export type InvoiceAction =
  | InvoiceGeneralAction
  | InvoicePartiesAction
  | InvoiceItemsAction;
