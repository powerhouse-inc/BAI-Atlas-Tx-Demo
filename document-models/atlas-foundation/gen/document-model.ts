import type { DocumentModelState } from "document-model/document-model";

export const documentModel: DocumentModelState = {
  id: "sky/atlas-foundation",
  name: "AtlasFoundation",
  extension: "",
  description: "",
  author: {
    name: "",
    website: "",
  },
  specifications: [
    {
      version: 1,
      changeLog: [],
      state: {
        global: {
          schema:
            "type AtlasFoundationState {\n  name: String\n  docNo: String\n  parent: PHID!\n  atlasType: FAtlasType! \n  content: String\n  masterStatus: FStatus!\n  globalTags: [FGlobalTag!]!\n  references: [PHID!]!\n  originalContextData: [PHID!]!\n  provenance: URL\n  notionId: String\n}\n\nenum FAtlasType {\nARTICLE\nSECTION\nCORE\nACTIVE_DATA_CONTROLLER\n}\n\nenum FStatus {\n  PLACEHOLDER\n  PROVISIONAL\n  APPROVED\n  DEFERRED\n  ARCHIVED\n}\n\nenum FGlobalTag {\n  SCOPE_ADVISOR_\n  AVC_\n  CAIS_\n  ML_LOW_PRIORITY_\n  EXTERNAL_REFERENCE_\n  DAO_TOOLKIT_\n  ML_DEFER_\n  PURPOSE_SYSTEM_\n  NEWCHAIN_\n  ML_SUPPORT_DOCS_NEEDED_\n  TWO_STAGE_BRIDGE_\n  ECOSYSTEM_INTELLIGENCE_\n  RECURSIVE_IMPROVEMENT_\n  LEGACY_TERM_USE_APPROVED_\n}",
          initialValue:
            '"{\\n  \\"name\\": \\"\\",\\n  \\"docNo\\": \\"\\",\\n  \\"parent\\": \\"\\",\\n  \\"atlasType\\": \\"ARTICLE\\",\\n  \\"content\\": \\"\\",\\n  \\"masterStatus\\": \\"PLACEHOLDER\\",\\n  \\"globalTags\\": [],\\n  \\"references\\": [],\\n  \\"originalContextData\\": [],\\n  \\"provenance\\": \\"\\",\\n  \\"notionId\\": \\"\\"\\n}"',
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
          id: "THXKMH+rMTFVYACP1MCOK1iqnA4=",
          name: "article",
          description: "",
          operations: [
            {
              id: "z9UQKN1s753NPXQTW3m3GhhxtHQ=",
              name: "UPDATE_FOUNDATION",
              description: "Updates an existing Foundational document type. ",
              schema:
                "input UpdateFoundationInput {\n  name: String\n  atlasType: FAtlasType!\n  content: String\n  masterStatus: FStatus\n  globalTags: [FGlobalTag!]\n  references: [PHID!]\n}\n\n\nenum FAtlasType {\nARTICLE\nSECTION\nCORE\nACTIVE_DATA_CONTROLLER\n}\n\nenum FStatus {\n  PLACEHOLDER\n  PROVISIONAL\n  APPROVED\n  DEFERRED\n  ARCHIVED\n}\n\nenum FGlobalTag {\n  SCOPE_ADVISOR_\n  AVC_\n  CAIS_\n  ML_LOW_PRIORITY_\n  EXTERNAL_REFERENCE_\n  DAO_TOOLKIT_\n  ML_DEFER_\n  PURPOSE_SYSTEM_\n  NEWCHAIN_\n  ML_SUPPORT_DOCS_NEEDED_\n  TWO_STAGE_BRIDGE_\n  ECOSYSTEM_INTELLIGENCE_\n  RECURSIVE_IMPROVEMENT_\n  LEGACY_TERM_USE_APPROVED_\n}",
              template: "",
              reducer: "",
              errors: [
                {
                  id: "nnNk3sgLAyqAZcrc4VIGAd8y3sY=",
                  name: "ArticleNotFoundException",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "4MiYrRD/SJrBj6mw8iktKFg390A=",
                  name: "InvalidMasterStatusException",
                  code: "",
                  description: "",
                  template: "",
                },
                {
                  id: "TM6CL35N8+BcERkXOQLYZL4l4qE=",
                  name: "InvalidAnnotationReferencesException",
                  code: "",
                  description: "",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "50Ze1oyDaDh70D9X9/Db/zRcmJ8=",
              name: "POPULATE_FOUNDATION",
              description:
                "Populates a Foundational document type with live data. ",
              schema:
                "input PopulateFoundationInput {\n  name: String\n  docNo: String\n  parent: PHID!\n  atlasType: FAtlasType! \n  content: String\n  masterStatus: FStatus!\n  globalTags: [FGlobalTag!]\n  references: [PHID!]\n  originalContextData: [PHID!]\n  provenance: URL\n  notionId: String\n}\n\nenum FAtlasType {\nARTICLE\nSECTION\nCORE\nACTIVE_DATA_CONTROLLER\n}\n\n\nenum FStatus {\n  PLACEHOLDER\n  PROVISIONAL\n  APPROVED\n  DEFERRED\n  ARCHIVED\n}\n\nenum FGlobalTag {\n  SCOPE_ADVISOR_\n  AVC_\n  CAIS_\n  ML_LOW_PRIORITY_\n  EXTERNAL_REFERENCE_\n  DAO_TOOLKIT_\n  ML_DEFER_\n  PURPOSE_SYSTEM_\n  NEWCHAIN_\n  ML_SUPPORT_DOCS_NEEDED_\n  TWO_STAGE_BRIDGE_\n  ECOSYSTEM_INTELLIGENCE_\n  RECURSIVE_IMPROVEMENT_\n  LEGACY_TERM_USE_APPROVED_\n}",
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
