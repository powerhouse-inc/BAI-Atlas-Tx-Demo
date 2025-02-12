import type { DocumentModelState } from "document-model/document-model";

export const documentModel: DocumentModelState = {
  id: "Invoice",
  name: "Invoice",
  extension: ".test.ph",
  description: "Contributor invoices",
  author: {
    name: "zeroknowledgetruth",
    website: "",
  },
  specifications: [
    {
      version: 1,
      changeLog: [],
      state: {
        global: {
          schema:
            "type InvoiceState {\n  invoiceNo: String!\n  dateIssued: String!\n  dateDue: String!\n  dateDelivered: String\n  status: Status!\n  refs: [Ref!]!\n  issuer: LegalEntity!\n  payer: LegalEntity!\n  currency: String!\n  lineItems: [InvoiceLineItem!]!\n  totalPriceTaxExcl: Float!\n  totalPriceTaxIncl: Float!\n}\n\ntype Ref {\n  id: OID!\n  value: String!\n}\n\ntype Token {\n  evmAddress: String\n  symbol: String\n  chainName: String\n  chainId: String\n  rpc: String\n}\n\ntype LegalEntity {\n  id: LegalEntityId\n  name: String\n  address: Address\n  contactInfo: ContactInfo\n  country: String\n  paymentRouting: PaymentRouting\n}\n\ntype Address {\n  streetAddress: String\n  extendedAddress: String\n  city: String\n  postalCode: String\n  country: String\n  stateProvince: String\n}\n\ntype ContactInfo {\n  tel: String\n  email: String\n}\n\ntype PaymentRouting {\n  bank: Bank\n  wallet: Wallet\n}\n\ntype Bank {\n  name: String!\n  address: Address!\n  ABA: String\n  BIC: String\n  SWIFT: String\n  accountNum: String!\n  accountType: AccountType\n  beneficiary: String\n  intermediaryBank: IntermediaryBank\n  memo: String\n}\n\ntype IntermediaryBank {\n  name: String!\n  address: Address!\n  ABA: String\n  BIC: String\n  SWIFT: String\n  accountNum: String!\n  accountType: AccountType\n  beneficiary: String\n  memo: String\n}\n\ntype Wallet {\n  rpc: String\n  chainName: String\n  chainId: String\n  address: String\n}\n\ntype InvoiceLineItem {\n  id: OID!\n  description: String!\n  taxPercent: Float!\n  quantity: Float!\n  currency: String!\n  unitPriceTaxExcl: Float!\n  unitPriceTaxIncl: Float!\n  totalPriceTaxExcl: Float!\n  totalPriceTaxIncl: Float!\n}\n\nunion LegalEntityId = LegalEntityTaxId | LegalEntityCorporateRegistrationId\n\ntype LegalEntityTaxId {\n  taxId: String!\n}\n\ntype LegalEntityCorporateRegistrationId {\n  corpRegId: String!\n}\n\nenum Status {\n  DRAFT\n  ISSUED\n  ACCEPTED\n  REJECTED\n  PAID\n}\n\nenum AccountType {\n  CHECKING\n  SAVINGS\n  TRUST\n  WALLET\n}",
          initialValue:
            '"{\\n  \\"invoiceNo\\": \\"\\",\\n  \\"dateIssued\\": \\"\\",\\n  \\"dateDue\\": \\"\\",\\n  \\"dateDelivered\\": \\"\\",\\n  \\"status\\": \\"DRAFT\\",\\n  \\"refs\\": [],\\n  \\"issuer\\": {\\n    \\"id\\": null,\\n    \\"name\\": \\"\\",\\n    \\"address\\": {\\n      \\"streetAddress\\": \\"\\",\\n      \\"extendedAddress\\": \\"\\",\\n      \\"city\\": \\"\\",\\n      \\"postalCode\\": \\"\\",\\n      \\"country\\": \\"\\",\\n      \\"stateProvince\\": \\"\\"\\n    },\\n    \\"contactInfo\\": {\\n      \\"tel\\": \\"\\",\\n      \\"email\\": \\"\\"\\n    },\\n    \\"country\\": \\"\\",\\n    \\"paymentRouting\\": {\\n      \\"bank\\": {\\n        \\"name\\": \\"\\",\\n        \\"address\\": {\\n          \\"streetAddress\\": \\"\\",\\n          \\"extendedAddress\\": \\"\\",\\n          \\"city\\": \\"\\",\\n          \\"postalCode\\": \\"\\",\\n          \\"country\\": \\"\\",\\n          \\"stateProvince\\": \\"\\"\\n        },\\n        \\"ABA\\": \\"\\",\\n        \\"BIC\\": \\"\\",\\n        \\"SWIFT\\": \\"\\",\\n        \\"accountNum\\": \\"\\",\\n        \\"accountType\\": \\"CHECKING\\",\\n        \\"beneficiary\\": \\"\\",\\n        \\"intermediaryBank\\": {\\n          \\"name\\": \\"\\",\\n          \\"address\\": {\\n            \\"streetAddress\\": \\"\\",\\n            \\"extendedAddress\\": \\"\\",\\n            \\"city\\": \\"\\",\\n            \\"postalCode\\": \\"\\",\\n            \\"country\\": \\"\\",\\n            \\"stateProvince\\": \\"\\"\\n          },\\n          \\"ABA\\": \\"\\",\\n          \\"BIC\\": \\"\\",\\n          \\"SWIFT\\": \\"\\",\\n          \\"accountNum\\": \\"\\",\\n          \\"accountType\\": \\"CHECKING\\",\\n          \\"beneficiary\\": \\"\\",\\n          \\"memo\\": \\"\\"\\n        },\\n        \\"memo\\": \\"\\"\\n      },\\n      \\"wallet\\": {\\n        \\"rpc\\": \\"\\",\\n        \\"chainName\\": \\"\\",\\n        \\"chainId\\": \\"\\",\\n        \\"address\\": \\"\\"\\n      }\\n    }\\n  },\\n  \\"payer\\": {\\n    \\"id\\": null,\\n    \\"name\\": \\"\\",\\n    \\"address\\": {\\n      \\"streetAddress\\": \\"\\",\\n      \\"extendedAddress\\": \\"\\",\\n      \\"city\\": \\"\\",\\n      \\"postalCode\\": \\"\\",\\n      \\"country\\": \\"\\",\\n      \\"stateProvince\\": \\"\\"\\n    },\\n    \\"contactInfo\\": {\\n      \\"tel\\": \\"\\",\\n      \\"email\\": \\"\\"\\n    },\\n    \\"country\\": \\"\\",\\n    \\"paymentRouting\\": {\\n      \\"bank\\": {\\n        \\"name\\": \\"\\",\\n        \\"address\\": {\\n          \\"streetAddress\\": \\"\\",\\n          \\"extendedAddress\\": \\"\\",\\n          \\"city\\": \\"\\",\\n          \\"postalCode\\": \\"\\",\\n          \\"country\\": \\"\\",\\n          \\"stateProvince\\": \\"\\"\\n        },\\n        \\"ABA\\": \\"\\",\\n        \\"BIC\\": \\"\\",\\n        \\"SWIFT\\": \\"\\",\\n        \\"accountNum\\": \\"\\",\\n        \\"accountType\\": \\"CHECKING\\",\\n        \\"beneficiary\\": \\"\\",\\n        \\"intermediaryBank\\": {\\n          \\"name\\": \\"\\",\\n          \\"address\\": {\\n            \\"streetAddress\\": \\"\\",\\n            \\"extendedAddress\\": \\"\\",\\n            \\"city\\": \\"\\",\\n            \\"postalCode\\": \\"\\",\\n            \\"country\\": \\"\\",\\n            \\"stateProvince\\": \\"\\"\\n          },\\n          \\"ABA\\": \\"\\",\\n          \\"BIC\\": \\"\\",\\n          \\"SWIFT\\": \\"\\",\\n          \\"accountNum\\": \\"\\",\\n          \\"accountType\\": \\"CHECKING\\",\\n          \\"beneficiary\\": \\"\\",\\n          \\"memo\\": \\"\\"\\n        },\\n        \\"memo\\": \\"\\"\\n      },\\n      \\"wallet\\": {\\n        \\"rpc\\": \\"\\",\\n        \\"chainName\\": \\"\\",\\n        \\"chainId\\": \\"\\",\\n        \\"address\\": \\"\\"\\n      }\\n    }\\n  },\\n  \\"currency\\": \\"\\",\\n  \\"lineItems\\": [],\\n  \\"totalPriceTaxExcl\\": 0,\\n  \\"totalPriceTaxIncl\\": 0\\n}"',
          examples: [],
        },
        local: {
          schema: "",
          initialValue: '""',
          examples: [],
        },
      },
      modules: [
        {
          id: "5NdopzvYmbe0hADxicG1hCeHNwI=",
          name: "general",
          description: "",
          operations: [
            {
              id: "GC8OxKK3HNYj/rSZo8+/gddUHV8=",
              name: "EDIT_INVOICE",
              description: "",
              schema:
                "input EditInvoiceInput {\n    invoiceNo: String\n    dateIssued: String\n    dateDue: String\n    dateDelivered: String\n    currency: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "wnsDuquNjYlNgumDlvwvcete0fM=",
              name: "EDIT_STATUS",
              description: "",
              schema: "input EditStatusInput {\n    status: Status!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "8z5zo6le4Zqovc4G7R4y2Rmb944=",
              name: "ADD_REF",
              description: "",
              schema:
                "input AddRefInput {\n    id: OID!\n    value: String!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "fWXv/g40c4PW4fInQacz5kM4B2I=",
              name: "EDIT_REF",
              description: "",
              schema:
                "input EditRefInput {\n    id: OID!\n    value: String!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "jUtMw6Rjd9Yv3LSnjUVs6fSPo0k=",
              name: "DELETE_REF",
              description: "",
              schema: "input DeleteRefInput {\n    id: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "sSVjeGG79S3+LIZkVmxI3DtvO40=",
          name: "parties",
          description: "",
          operations: [
            {
              id: "bPqUAhZLfBJkgVs39WFq9GUYAVs=",
              name: "EDIT_ISSUER",
              description: "",
              schema:
                "input EditIssuerInput {\n    id: String\n    name: String\n    streetAddress: String\n    extendedAddress: String\n    city: String\n    postalCode: String\n    country: String\n    stateProvince: String\n    tel: String\n    email: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "g08wFEq0ooqcAwvLcxDDgyyH2j0=",
              name: "EDIT_ISSUER_BANK",
              description: "",
              schema:
                "input EditIssuerBankInput {\n    name: String\n    streetAddress: String\n    extendedAddress: String\n    city: String\n    postalCode: String\n    country: String\n    stateProvince: String\n    ABA: String\n    BIC: String\n    SWIFT: String\n    accountNum: String\n    accountType: AccountType\n    beneficiary: String\n    memo: String\n    # intermediaryBank\n    nameIntermediary: String\n    streetAddressIntermediary: String\n    extendedAddressIntermediary: String\n    cityIntermediary: String\n    postalCodeIntermediary: String\n    countryIntermediary: String\n    stateProvinceIntermediary: String\n    ABAIntermediary: String\n    BICIntermediary: String\n    SWIFTIntermediary: String\n    accountNumIntermediary: String\n    accountTypeIntermediary: AccountType\n    beneficiaryIntermediary: String\n    memoIntermediary: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "saWZnYBHXkxoh8lbAdCNlfr5Hns=",
              name: "EDIT_ISSUER_WALLET",
              description: "",
              schema:
                "input EditIssuerWalletInput {\n    rpc: String\n    chainName: String\n    chainId: String\n    address: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "z59UfAYmzMEMtIGxZKKlC5J6GpU=",
              name: "EDIT_PAYER",
              description: "",
              schema:
                "input EditPayerInput {\n    id: String\n    name: String\n    streetAddress: String\n    extendedAddress: String\n    city: String\n    postalCode: String\n    country: String\n    stateProvince: String\n    tel: String\n    email: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "QFPrzmTmlhHo/+NahqpSAcDxTKA=",
              name: "EDIT_PAYER_BANK",
              description: "",
              schema:
                "input EditPayerBankInput {\n    name: String\n    streetAddress: String\n    extendedAddress: String\n    city: String\n    postalCode: String\n    country: String\n    stateProvince: String\n    ABA: String\n    BIC: String\n    SWIFT: String\n    accountNum: String\n    accountType: AccountType\n    beneficiary: String\n    memo: String\n    # intermediaryBank\n    nameIntermediary: String\n    streetAddressIntermediary: String\n    extendedAddressIntermediary: String\n    cityIntermediary: String\n    postalCodeIntermediary: String\n    countryIntermediary: String\n    stateProvinceIntermediary: String\n    ABAIntermediary: String\n    BICIntermediary: String\n    SWIFTIntermediary: String\n    accountNumIntermediary: String\n    accountTypeIntermediary: AccountType\n    beneficiaryIntermediary: String\n    memoIntermediary: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "H0UeZpA0hpFymYIfxJVQ8+B9CKM=",
              name: "EDIT_PAYER_WALLET",
              description: "",
              schema:
                "input EditPayerWalletInput {\n  rpc: String\n  chainName: String\n  chainId: String\n  address: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "iJ9MP6P8+oO9Xb2fu3zTrhzBivk=",
          name: "items",
          description: "",
          operations: [
            {
              id: "zn8F5dtapLDwAPNIu2mELu6cQtw=",
              name: "ADD_LINE_ITEM",
              description: "",
              schema:
                "input AddLineItemInput {\n    id: OID!\n    description: String!\n    taxPercent: Float!\n    quantity: Float!\n    currency: String! # Default can be USD\n    unitPriceTaxExcl: Float!\n    unitPriceTaxIncl: Float!\n    totalPriceTaxExcl: Float!\n    totalPriceTaxIncl: Float!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "fm/7utdlk11MQVZlkSVUCJyq4AE=",
              name: "EDIT_LINE_ITEM",
              description: "",
              schema:
                "input EditLineItemInput {\n    id: OID!\n    description: String\n    taxPercent: Float\n    quantity: Float\n    currency: String\n    unitPriceTaxExcl: Float\n    unitPriceTaxIncl: Float\n    totalPriceTaxExcl: Float\n    totalPriceTaxIncl: Float\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "rhe6xbPJ6HqMdRCyVq5Hc53mI44=",
              name: "DELETE_LINE_ITEM",
              description: "",
              schema: "input DeleteLineItemInput {\n  id: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
    },
  ],
};
