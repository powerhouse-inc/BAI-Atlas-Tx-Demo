import {
  BaseDocument,
  ExtendedState,
  PartialState,
  applyMixins,
  SignalDispatch,
} from "document-model/document";
import {
  AccountTransactionsState,
  AccountTransactionsLocalState,
} from "./types";
import { AccountTransactionsAction } from "./actions";
import { reducer } from "./reducer";
import utils from "./utils";
import AccountTransactions_AccountTransactions from "./account-transactions/object";

export * from "./account-transactions/object";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AccountTransactions extends AccountTransactions_AccountTransactions {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AccountTransactions extends BaseDocument<
  AccountTransactionsState,
  AccountTransactionsAction,
  AccountTransactionsLocalState
> {
  static fileExtension = ".phdm";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<AccountTransactionsState>,
        PartialState<AccountTransactionsLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, AccountTransactions.fileExtension, name);
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

applyMixins(AccountTransactions, [AccountTransactions_AccountTransactions]);

export { AccountTransactions };
