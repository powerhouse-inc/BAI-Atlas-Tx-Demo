import {
  BaseDocument,
  ExtendedState,
  PartialState,
  applyMixins,
  SignalDispatch,
} from "document-model/document";
import { AtlasFoundationState, AtlasFoundationLocalState } from "./types";
import { AtlasFoundationAction } from "./actions";
import { reducer } from "./reducer";
import utils from "./utils";
import AtlasFoundation_Article from "./article/object";

export * from "./article/object";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AtlasFoundation extends AtlasFoundation_Article {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AtlasFoundation extends BaseDocument<
  AtlasFoundationState,
  AtlasFoundationAction,
  AtlasFoundationLocalState
> {
  static fileExtension = "";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<AtlasFoundationState>,
        PartialState<AtlasFoundationLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, AtlasFoundation.fileExtension, name);
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

applyMixins(AtlasFoundation, [AtlasFoundation_Article]);

export { AtlasFoundation };
