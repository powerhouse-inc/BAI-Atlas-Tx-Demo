/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import { utils as documentModelUtils } from "document-model/document";

import utils from "../../gen/utils";
import {
  z,
  UpdateRequestFinanceInput,
  UpdateGnosisSafeInput,
  DeleteGnosisWalletInput,
} from "../../gen/schema";
import { reducer } from "../../gen/reducer";
import * as creators from "../../gen/settings/creators";
import { IntegrationSettingsDocument } from "../../gen/types";

describe("Settings Operations", () => {
  let document: IntegrationSettingsDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle updateRequestFinance operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: UpdateRequestFinanceInput = {
      accountEmail: "test@test.com",
      appId: "test",
      appSecret: "test",
    };

    const updatedDocument = reducer(
      document,
      creators.updateRequestFinance(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "UPDATE_REQUEST_FINANCE",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.state.global.requestFinance.accountEmail).toBe(
      input.accountEmail,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateGnosisSafe operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: UpdateGnosisSafeInput = {
      address: '0x1FB6bEF04230d67aF0e3455B997a28AFcCe1F45e',
      name: "test",
      privateKey: "test",
    };

    const updatedDocument = reducer(document, creators.updateGnosisSafe(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "UPDATE_GNOSIS_SAFE",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.state.global.gnosisSafe?.wallets[0].address).toBe(
      input.address,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteGnosisWallet operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();
    const input1: UpdateGnosisSafeInput = {
      address: '0x1FB6bEF04230d67aF0e3455B997a28AFcCe1F45e',
      name: "test",
      privateKey: "test",
    };

    const updatedDocument1 = reducer(document, creators.updateGnosisSafe(input1));

    const input: DeleteGnosisWalletInput = {
      address: '0x1FB6bEF04230d67aF0e3455B997a28AFcCe1F45e',
    };

    const updatedDocument = reducer(
      document,
      creators.deleteGnosisWallet(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "DELETE_GNOSIS_WALLET",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
