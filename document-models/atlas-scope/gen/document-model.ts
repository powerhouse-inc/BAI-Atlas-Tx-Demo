import type { DocumentModelState } from "document-model/document-model";

export const documentModel: DocumentModelState = {
  id: "sky/atlas-scope",
  name: "AtlasScope",
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
            "type AtlasScopeState {\n  name: String\n  docNo: String # e.g, A.1\n  content: String # change to markdown later (includes links, tables...)\n  masterStatus: Status # Aggregation: MasterStatus can exist independently of Scope\n  globalTags: [GlobalTag!]!\n\toriginalContextData: [PHID!]!\n\tprovenance: URL # p0Hub backlink\n\tnotionId: String # verify if this can be changed to UUID type\n}\n\n\nenum Status {\n  PLACEHOLDER\n  PROVISIONAL # enables ecosystem participants to interact with the material in a practical context, resulting in valuable feedback or other data concerning the Document's appropriateness.\n  APPROVED # material instance can be integrated into the Atlas\n  DEFERRED\n  ARCHIVED\n}\n\nenum GlobalTag {\n    RECURSIVE_IMPROVEMENT,\n    SCOPE_ADVISOR,\n    DAO_TOOLKIT,\n    PURPOSE_SYSTEM,\n    ML__LOW_PRIORITY,\n    EXTERNAL_REFERENCE,\n    ML__DEFER,\n    SUBDAO_INCUBATION,\n    V1__MIP,\n    ML__HIGH_PRIORITY,\n    ECOSYSTEM_INTELLIGENCE,\n    LEGACY_TERM__USE_APPROVED,\n    CAIS,\n    INTERNAL_REFERENCE,\n    FACILITATORDAO,\n    ML___MED_PRIORITY,\n    AVC,\n    P0_HUB_ENTRY_NEEDED,\n    ANON_WORKFORCE,\n    NEWCHAIN,\n    ML__SUPPORT_DOCS_NEEDED,\n    SUBDAO_REWARDS,\n    TWO_STAGE_BRIDGE,\n}\n",
          initialValue:
            '"{\\n  \\"name\\": \\"\\",\\n  \\"docNo\\": \\"\\",\\n  \\"content\\": \\"\\",\\n  \\"masterStatus\\": [],\\n  \\"globalTags\\": [],\\n  \\"originalContextData\\": [],\\n  \\"provenance\\": \\"\\",\\n  \\"notionId\\": \\"\\"\\n}"',
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
          id: "2/eTg/KwCW6D1XeR6YY3A4SX/9g=",
          name: "scope",
          description: "",
          operations: [
            {
              id: "AlXgggfgadzPSthUlXryHzVT2QU=",
              name: "UPDATE_SCOPE",
              description:
                "Updates an existing Scope in the ScopeState. Only the fields provided in the input will be updated; all other fields remain unchanged. ",
              schema:
                "input UpdateScopeInput {\n  masterStatus: Status\n  globalTags: [GlobalTag!]\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "P+i2e0rrlMbANrNNYIGcLZDpwWM=",
              name: "POPULATE_SCOPE",
              description: "Populates a Scope in the with live data. ",
              schema:
                "input PopulateScopeInput {\n  name: String\n  docNo: String # e.g, A.1\n  content: String # change to markdown later (includes links, tables...)\n  masterStatus: Status\n  globalTags: [GlobalTag!]\n\toriginalContextData: [PHID!]\n\tprovenance: URL # p0Hub backlink\n\tnotionId: String # verify if this can be changed to UUID type\n}",
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
