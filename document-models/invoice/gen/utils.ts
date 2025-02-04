import { DocumentModelUtils, utils as base } from "document-model/document";
import { InvoiceAction, InvoiceState, InvoiceLocalState } from "./types";
import { reducer } from "./reducer";

export const initialGlobalState: InvoiceState = {
  invoiceNo: "",
  dateIssued: "",
  dateDue: "",
  dateDelivered: "",
  status: "DRAFT",
  refs: [],
  issuer: {
    id: null,
    name: "",
    address: {
      streetAddress: "",
      extendedAddress: "",
      city: "",
      postalCode: "",
      country: "",
      stateProvince: "",
    },
    contactInfo: {
      tel: "",
      email: "",
    },
    country: "",
    paymentRouting: {
      bank: {
        name: "",
        address: {
          streetAddress: "",
          extendedAddress: "",
          city: "",
          postalCode: "",
          country: "",
          stateProvince: "",
        },
        ABA: "",
        BIC: "",
        SWIFT: "",
        accountNum: "",
        accountType: "CHECKING",
        beneficiary: "",
        intermediaryBank: {
          name: "",
          address: {
            streetAddress: "",
            extendedAddress: "",
            city: "",
            postalCode: "",
            country: "",
            stateProvince: "",
          },
          ABA: "",
          BIC: "",
          SWIFT: "",
          accountNum: "",
          accountType: "CHECKING",
          beneficiary: "",
          memo: "",
        },
        memo: "",
      },
      wallet: {
        rpc: "",
        chainName: "",
        chainId: "",
        address: "",
      },
    },
  },
  payer: {
    id: null,
    name: "",
    address: {
      streetAddress: "",
      extendedAddress: "",
      city: "",
      postalCode: "",
      country: "",
      stateProvince: "",
    },
    contactInfo: {
      tel: "",
      email: "",
    },
    country: "",
    paymentRouting: {
      bank: {
        name: "",
        address: {
          streetAddress: "",
          extendedAddress: "",
          city: "",
          postalCode: "",
          country: "",
          stateProvince: "",
        },
        ABA: "",
        BIC: "",
        SWIFT: "",
        accountNum: "",
        accountType: "CHECKING",
        beneficiary: "",
        intermediaryBank: {
          name: "",
          address: {
            streetAddress: "",
            extendedAddress: "",
            city: "",
            postalCode: "",
            country: "",
            stateProvince: "",
          },
          ABA: "",
          BIC: "",
          SWIFT: "",
          accountNum: "",
          accountType: "CHECKING",
          beneficiary: "",
          memo: "",
        },
        memo: "",
      },
      wallet: {
        rpc: "",
        chainName: "",
        chainId: "",
        address: "",
      },
    },
  },
  currency: "",
  lineItems: [],
  totalPriceTaxExcl: 0,
  totalPriceTaxIncl: 0,
};
export const initialLocalState: InvoiceLocalState = {};

const utils: DocumentModelUtils<
  InvoiceState,
  InvoiceAction,
  InvoiceLocalState
> = {
  fileExtension: ".test.ph",
  createState(state) {
    return {
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createExtendedState(extendedState) {
    return base.createExtendedState(
      { ...extendedState, documentType: "Invoice" },
      utils.createState,
    );
  },
  createDocument(state) {
    return base.createDocument(
      utils.createExtendedState(state),
      utils.createState,
    );
  },
  saveToFile(document, path, name) {
    return base.saveToFile(document, path, ".test.ph", name);
  },
  saveToFileHandle(document, input) {
    return base.saveToFileHandle(document, input);
  },
  loadFromFile(path) {
    return base.loadFromFile(path, reducer);
  },
  loadFromInput(input) {
    return base.loadFromInput(input, reducer);
  },
};

export default utils;
