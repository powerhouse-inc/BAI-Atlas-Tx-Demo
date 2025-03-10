import type { DocumentModelState } from "document-model/document-model";

export const documentModel: DocumentModelState = {
  id: "powerhouse/account-transactions",
  name: "AccountTransactions",
  extension: ".phdm",
  description:
    "The AccountTransactions model is designed to track and manage all transactions associated with various accounts. Each transaction entry records critical details such as the source and destination accounts, transaction amount, timestamp, and specific transaction details tailored to the type of transaction (e.g., cryptocurrency or bank-related).",
  author: {
    name: "Teep",
    website: "",
  },
  specifications: [
    {
      version: 1,
      changeLog: [],
      state: {
        global: {
          schema:
            "type AccountTransactionsState {\n  transactions: [TransactionEntry!]!\n  budgets: [Budget!]!\n}\n\ntype TransactionEntry {\n  id: ID!\n  fromAccount: EthereumAddress\n  toAccount: EthereumAddress\n  amount: Amount_Money!\n  datetime: DateTime!\n  details: TransactionDetails!\n  budget: OID\n}\n\nunion TransactionDetails = CryptoTransactionDetails | BankTransactionDetails\n\ntype CryptoTransactionDetails {\n  txHash: String!\n  token: Currency!\n  blockNumber: Int\n}\n\ntype BankTransactionDetails {\n  currency: Currency!\n  transactionId: String\n  referenceNumber: String\n}\n\ntype Budget {\n  id: OID!\n  name: OLabel\n}\n",
          initialValue: '"{\\n  \\"transactions\\": []\\n}"',
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
          id: "87XGHGmHfCwsHcJWzg8vfHUEF3k=",
          name: "account_transactions",
          description: "",
          operations: [
            {
              id: "Sogtf1zw5A7oeK5/bloa3DYaB+k=",
              name: "CREATE_TRANSACTION",
              description:
                "Adds a new transaction to the account transactions state.",
              schema:
                "input CreateTransactionInput {\n  fromAccount: EthereumAddress\n  toAccount: EthereumAddress\n  amount: Amount_Money!\n  datetime: DateTime!\n  details: TransactionDetailsInput!\n  budget: OID\n}\n\ninput TransactionDetailsInput {\n  crypto: CryptoTransactionDetailsInput\n  bank: BankTransactionDetailsInput\n}\n\ninput CryptoTransactionDetailsInput {\n  txHash: String!\n  token: Currency!\n  blockNumber: Int\n}\n\ninput BankTransactionDetailsInput {\n  currency: Currency!\n  transactionId: String\n  referenceNumber: String\n}\n\ninput Budget {\n  id: OID!\n  name: OLabel\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "kVD5pEzD+MwUp+AX3edMzGXo2F8=",
              name: "UPDATE_TRANSACTION",
              description:
                "Updates an existing transaction in the account transactions state.",
              schema:
                "input UpdateTransactionInput {\n  fromAccount: EthereumAddress\n  toAccount: EthereumAddress\n  amount: Amount_Money\n  datetime: DateTime\n  details: TransactionDetailsInput\n  budget: OID\n}\n\ninput TransactionDetailsInput {\n  crypto: CryptoTransactionDetailsInput\n  bank: BankTransactionDetailsInput\n}\n\ninput CryptoTransactionDetailsInput {\n  txHash: String\n  token: Currency\n  blockNumber: Int\n}\n\ninput BankTransactionDetailsInput {\n  currency: Currency\n  transactionId: String\n  referenceNumber: String\n}\n\ninput Budget {\n  id: OID!\n  name: OLabel\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "H6LY3kgfE5v2TjlY5Y/3gw04jKU=",
              name: "DELETE_TRANSACTION",
              description:
                "Deletes a transaction from the account transactions state by its ID.",
              schema: "input DeleteTransactionInput {\n  id: ID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "ooDUdEyVaH1nMemvuBUeg66juac=",
              name: "UPDATE_TRANSACTION_BUDGET",
              description:
                "Updates the budget associated with a specific transaction.",
              schema:
                "input UpdateTransactionBudgetInput {\n  txId: ID!,\n  budgetId: OID!\n}",
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
