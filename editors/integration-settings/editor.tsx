import { Action, EditorProps } from "document-model/document";
import { utils as documentModelUtils } from "document-model/document";
import { Button } from "@powerhousedao/design-system";
import React, { useState } from "react";
import { actions } from "../../document-models/integration-settings";
import { IntegrationSettingsState } from "../../document-models/integration-settings/gen/types";
export type IProps = EditorProps<unknown, Action, any>;

export default function Editor(props: IProps) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

  const { document, dispatch } = props;
  const {
    state: { global: state },
  } = document as { state: { global: IntegrationSettingsState } };

  // State for form inputs
  const [email, setEmail] = useState("");
  const [appId, setAppId] = useState("");
  const [appSecret, setAppSecret] = useState("");

  // State for new wallet inputs
  const [newWallet, setNewWallet] = useState({ name: "", address: "", privateKey: "" });
  const [addingWallet, setAddingWallet] = useState(false);

  // State for selected wallets
  const [selectedWallets, setSelectedWallets] = useState<Set<number>>(new Set());

  // Handle form submission
  const handleSubmit = () => {
    if (!email && !appId && !appSecret) {
      return;
    }

    const stateAccountEmail = state.requestFinance?.accountEmail ?? "";
    const stateAppId = state.requestFinance?.appId ?? "";
    const stateAppSecret = state.requestFinance?.appSecret ?? "";
    if (
      email !== stateAccountEmail ||
      appId !== stateAppId ||
      appSecret !== stateAppSecret
    ) {
      dispatch(
        actions.updateRequestFinance({
          accountEmail: email || stateAccountEmail,
          appId: appId || stateAppId,
          appSecret: appSecret || stateAppSecret,
        })
      );
    }
  };

  // Handle adding a new wallet
  const handleAddWallet = () => {
    if (!newWallet.name || !newWallet.address || !newWallet.privateKey) {
      return;
    }

    dispatch(
      actions.updateGnosisSafe({
        name: newWallet.name,
        address: newWallet.address,
        privateKey: newWallet.privateKey,
      })
    );

    // Reset new wallet state
    setNewWallet({ name: "", address: "", privateKey: "" });
    setAddingWallet(false);
  };

  // Handle wallet selection
  const handleWalletSelection = (index: number) => {
    const updatedSelection = new Set(selectedWallets);
    if (updatedSelection.has(index)) {
      updatedSelection.delete(index);
    } else {
      updatedSelection.add(index);
    }
    setSelectedWallets(updatedSelection);
  };

  // Handle deleting selected wallets
  const handleDeleteWallets = () => {
    selectedWallets.forEach((index) => {
      const walletAddress = state.gnosisSafe?.wallets[index]?.address;
      if (walletAddress) {
        dispatch(actions.deleteGnosisWallet({ address: walletAddress }));
      }
    });
    setSelectedWallets(new Set());
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        Request Finance
      </h1>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Account E-mail
        </label>
        <input
          type="email"
          defaultValue={state.requestFinance?.accountEmail ?? ""}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>App ID</label>
        <input
          type="text"
          defaultValue={state.requestFinance?.appId ?? ""}
          onChange={(e) => setAppId(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          App Secret
        </label>
        <input
          type="text"
          defaultValue={state.requestFinance?.appSecret ?? ""}
          onChange={(e) => setAppSecret(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <Button onClick={handleSubmit} style={{ marginBottom: "20px" }}>
        Submit
      </Button>

      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>Gnosis Safe</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}></th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Wallet Address
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Private Key
            </th>
          </tr>
        </thead>
        <tbody>
          {state.gnosisSafe?.wallets.map((wallet, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <input
                  type="checkbox"
                  checked={selectedWallets.has(index)}
                  onChange={() => handleWalletSelection(index)}
                />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {wallet.name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {wallet.address}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <textarea
                  readOnly
                  value={wallet.privateKey}
                  style={{ width: "100%", height: "50px", resize: "none" }}
                />
              </td>
            </tr>
          ))}
          {addingWallet && (
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <input type="checkbox" disabled />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <input
                  type="text"
                  value={newWallet.name}
                  onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
                  placeholder="Name"
                  style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <input
                  type="text"
                  value={newWallet.address}
                  onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
                  placeholder="Address"
                  style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <input
                  type="text"
                  value={newWallet.privateKey}
                  onChange={(e) => setNewWallet({ ...newWallet, privateKey: e.target.value })}
                  placeholder="Private Key"
                  style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Button onClick={() => setAddingWallet(true)} style={{ marginTop: "10px" }}>
        Add New Wallet
      </Button>
      {addingWallet && (
        <Button onClick={handleAddWallet} style={{ marginTop: "10px" }}>
          Submit New Wallet
        </Button>
      )}
      {selectedWallets.size > 0 && (
        <Button onClick={handleDeleteWallets} style={{ marginTop: "10px" }}>
          Delete Selected Wallets
        </Button>
      )}
    </div>
  );
}
