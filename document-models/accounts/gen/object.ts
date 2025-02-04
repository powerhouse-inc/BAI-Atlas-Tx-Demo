import {
  BaseDocument,
  ExtendedState,
  PartialState,
  applyMixins,
  SignalDispatch,
} from "document-model/document";
import { AccountsState, AccountsLocalState } from "./types";
import { AccountsAction } from "./actions";
import { reducer } from "./reducer";
import utils from "./utils";
import Accounts_Accounts from "./accounts/object";

export * from "./accounts/object";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface Accounts extends Accounts_Accounts {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class Accounts extends BaseDocument<
  AccountsState,
  AccountsAction,
  AccountsLocalState
> {
  static fileExtension = ".phdm";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<AccountsState>,
        PartialState<AccountsLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, Accounts.fileExtension, name);
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

applyMixins(Accounts, [Accounts_Accounts]);

export { Accounts };
