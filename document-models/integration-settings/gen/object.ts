import {
  BaseDocument,
  ExtendedState,
  PartialState,
  applyMixins,
  SignalDispatch,
} from "document-model/document";
import {
  IntegrationSettingsState,
  IntegrationSettingsLocalState,
} from "./types";
import { IntegrationSettingsAction } from "./actions";
import { reducer } from "./reducer";
import utils from "./utils";
import IntegrationSettings_Settings from "./settings/object";

export * from "./settings/object";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface IntegrationSettings extends IntegrationSettings_Settings {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class IntegrationSettings extends BaseDocument<
  IntegrationSettingsState,
  IntegrationSettingsAction,
  IntegrationSettingsLocalState
> {
  static fileExtension = ".phdm";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<IntegrationSettingsState>,
        PartialState<IntegrationSettingsLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, IntegrationSettings.fileExtension, name);
  }

  public loadFromFile(path: string) {
    return super.loadFromFile(path);
  }

  static async fromFile(path: string) {
    const document = new this();
    await document.loadFromFile(path);
    return document;
  }
}

applyMixins(IntegrationSettings, [IntegrationSettings_Settings]);

export { IntegrationSettings };
