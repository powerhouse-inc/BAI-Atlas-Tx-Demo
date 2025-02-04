import {
  BaseDocument,
  ExtendedState,
  PartialState,
  applyMixins,
  SignalDispatch,
} from "document-model/document";
import { AtlasScopeState, AtlasScopeLocalState } from "./types";
import { AtlasScopeAction } from "./actions";
import { reducer } from "./reducer";
import utils from "./utils";
import AtlasScope_Scope from "./scope/object";

export * from "./scope/object";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AtlasScope extends AtlasScope_Scope {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AtlasScope extends BaseDocument<
  AtlasScopeState,
  AtlasScopeAction,
  AtlasScopeLocalState
> {
  static fileExtension = "";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<AtlasScopeState>,
        PartialState<AtlasScopeLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, AtlasScope.fileExtension, name);
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

applyMixins(AtlasScope, [AtlasScope_Scope]);

export { AtlasScope };
