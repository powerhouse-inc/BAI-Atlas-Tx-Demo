import type { DocumentModelState } from "document-model/document-model";

export const documentModel: DocumentModelState = {
  id: "powerhouse/integration-settings",
  name: "IntegrationSettings",
  extension: ".phdm",
  description: "Model containing fields for integration settings",
  author: {
    name: "Liberuum",
    website: "https://powerhouse.inc",
  },
  specifications: [
    {
      version: 1,
      changeLog: [],
      state: {
        global: {
          schema:
            "type IntegrationSettingsState {\n  requestFinance: RequestFinance,\n  gnosisSafe: GnosisSafe\n}\n\ntype RequestFinance {\n  accountEmail: EmailAddress\n  appId: String\n  appSecret: String\n}\n\ntype GnosisSafe {\n  wallets: [Wallet]\n}\n\ntype Wallet {\n  name: String\n  address: String\n  privateKey: String\n}",
          initialValue:
            '"{\\n  \\"requestFinance\\": {\\n    \\"accountEmail\\": \\"\\",\\n    \\"appId\\": \\"\\",\\n    \\"appSecret\\": \\"\\"\\n  },\\n  \\"gnosisSafe\\": {\\n    \\"wallets\\": []\\n  }\\n}"',
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
          id: "t2IEjB2kZRQPiiGgEY+J3dqQCWQ=",
          name: "settings",
          description: "",
          operations: [
            {
              id: "73NxakzeWXR9w+77lD79XP++0iM=",
              name: "UPDATE_REQUEST_FINANCE",
              description: "",
              schema:
                "input UpdateRequestFinanceInput {\n  accountEmail: EmailAddress\n  appId: String\n  appSecret: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "7d82x7A16/Z60m0z8uyS51OxiAg=",
              name: "UPDATE_GNOSIS_SAFE",
              description: "",
              schema:
                "input UpdateGnosisSafeInput {\n  name: String\n  address: String\n  privateKey: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "lYaKpXnwMtQ1hHCUmcg+kGUaSAw=",
              name: "DELETE_GNOSIS_WALLET",
              description: "",
              schema: "input DeleteGnosisWalletInput {\n  address: String\n}",
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
