import Editor from "./editor";
import { createDocumentStory } from "document-model-libs/utils";
import { baseReducer, utils } from "document-model/document";

const { meta, CreateDocumentStory: IntegrationSettings } = createDocumentStory(
  Editor,
  (...args) => baseReducer(...args, (document) => document),
  utils.createExtendedState(),
);
export { IntegrationSettings };

export default { ...meta, title: "Integration Settings" };
