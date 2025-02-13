import { Action, EditorProps } from "document-model/document";
import { utils as documentModelUtils } from "document-model/document";
import { useEffect, useMemo, useState } from "react";
import {
  InvoiceState,
  InvoiceAction,
  InvoiceLineItem,
  InvoiceLocalState,
  actions,
  EditIssuerInput,
  EditIssuerBankInput,
  EditPayerInput,
  DeleteLineItemInput,
  Status,
  EditStatusInput,
  EditInvoiceInput,
  EditIssuerWalletInput,
} from "../../document-models/invoice";
import { DateTimeLocalInput } from "./dateTimeLocalInput";
import { LegalEntityForm } from "./legalEntity/legalEntity";
import { LineItemsTable } from "./lineItems";
import { loadUBLFile } from "./ingestUBL";
import RequestFinance from "./requestFinance";
import InvoiceToGnosis from "./invoiceToGnosis";
import axios from "axios";
import { toast } from "@powerhousedao/design-system";

import Toggle from "react-toggle";
import "./toggle.css";

export default function Editor(
  props: EditorProps<InvoiceState, InvoiceAction, InvoiceLocalState>,
) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

  const { document, dispatch } = props;
  const state = document.state.global;

  const [fiatMode, setFiatMode] = useState(state.currency != "USDS");

  const itemsTotalTaxExcl = useMemo(() => {
    return state.lineItems.reduce((total, lineItem) => {
      return total + lineItem.quantity * lineItem.unitPriceTaxExcl;
    }, 0.0);
  }, [state.lineItems]);

  const itemsTotalTaxIncl = useMemo(() => {
    return state.lineItems.reduce((total, lineItem) => {
      return total + lineItem.quantity * lineItem.unitPriceTaxIncl;
    }, 0.0);
  }, [state.lineItems]);

  const getStatusStyle = (status: Status) => {
    const baseStyle = "px-4 py-2 rounded-full font-semibold text-sm";
    switch (status) {
      case "DRAFT":
        return `${baseStyle} bg-gray-200 text-gray-800`;
      case "ISSUED":
        return `${baseStyle} bg-blue-100 text-blue-800`;
      case "ACCEPTED":
        return `${baseStyle} bg-green-100 text-green-800`;
      case "REJECTED":
        return `${baseStyle} bg-red-100 text-red-800`;
      case "PAID":
        return `${baseStyle} bg-purple-100 text-purple-800`;
      default:
        return baseStyle;
    }
  };

  const STATUS_OPTIONS: Status[] = [
    "DRAFT",
    "ISSUED",
    "ACCEPTED",
    "REJECTED",
    "PAID",
  ];

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await loadUBLFile({ file, dispatch });
    } catch (error) {
      // Handle error presentation to user
      console.error("Failed to load UBL file:", error);
    }
  };

  const handleReset = () => {
    dispatch(actions.editStatus({ status: "DRAFT" }));
  };

  const handleUpdateInvoiceStatus = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/update-invoice-status",
        {
          invoiceNo: state.invoiceNo,
        },
      );
      toast(response.data.message, {
        type: "success",
      });
      console.log("Response: ", response.data.message);
    } catch (error) {
      console.error("Error updating invoice status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Left side with Invoice title, input, and upload */}
        <div className="flex items-center gap-4 flex-nowrap">
          <h1 className="text-3xl font-bold whitespace-nowrap">Invoice</h1>
          <input
            className="min-w-[12rem] max-w-xs rounded-lg border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) =>
              dispatch(actions.editInvoice({ invoiceNo: e.target.value }))
            }
            placeholder={new Date()
              .toISOString()
              .substring(0, 10)
              .replaceAll("-", "")}
            type="text"
            value={state.invoiceNo || ""}
          />
          <label className="inline-flex cursor-pointer items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 whitespace-nowrap">
            Upload UBL
            <input
              accept=".xml"
              className="hidden"
              onChange={(e) => handleFileUpload(e)}
              type="file"
            />
          </label>
        </div>

        {/* Toggle between upload and status */}
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${!fiatMode ? "text-purple-600" : "text-gray-500"}`}
          >
            Crypto
          </span>
          <Toggle
            checked={fiatMode}
            onChange={() => setFiatMode(!fiatMode)}
            icons={false}
          />
          <span
            className={`text-sm font-medium ${fiatMode ? "text-green-600" : "text-gray-500"}`}
          >
            Fiat
          </span>
        </div>

        {/* Status on the right */}
        <select
          className={getStatusStyle(state.status)}
          onChange={(e) =>
            dispatch(actions.editStatus({ status: e.target.value as Status }))
          }
          value={state.status}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Issuer Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Issuer</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Issue Date:</label>
              <DateTimeLocalInput
                className="w-full"
                inputType="date"
                onChange={(e) =>
                  dispatch(actions.editInvoice({ dateIssued: e.target.value }))
                }
                value={state.dateIssued}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Delivery Date:</label>
              <DateTimeLocalInput
                className="w-full"
                inputType="date"
                onChange={(e) =>
                  dispatch(
                    actions.editInvoice({ dateDelivered: e.target.value }),
                  )
                }
                value={state.dateDelivered || state.dateIssued}
              />
            </div>
          </div>
          <LegalEntityForm
            legalEntity={state.issuer}
            onChangeBank={(input) => dispatch(actions.editIssuerBank(input))}
            onChangeInfo={(input) => dispatch(actions.editIssuer(input))}
            onChangeWallet={(input) =>
              dispatch(actions.editIssuerWallet(input))
            }
            bankDisabled={!fiatMode}
            walletDisabled={fiatMode}
          />
        </div>

        {/* Payer Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Payer</h3>
          <div>
            <label className="block mb-1 text-sm">Due Date:</label>
            <DateTimeLocalInput
              className="w-full"
              inputType="date"
              onChange={(e) =>
                dispatch(actions.editInvoice({ dateDue: e.target.value }))
              }
              value={state.dateDue}
            />
          </div>
          <LegalEntityForm
            bankDisabled
            legalEntity={state.payer}
            onChangeInfo={(input) => dispatch(actions.editPayer(input))}
          />
        </div>
      </div>

      {/* Line Items Table */}
      <div className="mb-8">
        <LineItemsTable
          currency={state.currency}
          lineItems={state.lineItems}
          onAddItem={(item) => dispatch(actions.addLineItem(item))}
          onDeleteItem={(input) => dispatch(actions.deleteLineItem(input))}
          onUpdateCurrency={(input) => {
            setFiatMode(input.currency !== "USDS");
            dispatch(actions.editInvoice(input));
          }}
          onUpdateItem={(item) => dispatch(actions.editLineItem(item))}
        />
      </div>

      {/* Totals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-start-2">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Subtotal (excl. tax):</span>
                <span>
                  {itemsTotalTaxExcl.toFixed(2)} {state.currency}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
                <span>Total (incl. tax):</span>
                <span>
                  {itemsTotalTaxIncl.toFixed(2)} {state.currency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Finance Request Section */}
      {state.status === "ACCEPTED" && (
        <div className="mt-8">
          {state.currency === "USDS" ? (
            state.issuer.paymentRouting?.wallet?.chainName === "base" ? (
              <InvoiceToGnosis docState={state} />
            ) : (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-red-500 text-white p-8 rounded-lg shadow-xl relative max-w-md">
                  <button
                    className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                    onClick={() =>
                      dispatch(actions.editStatus({ status: "DRAFT" }))
                    }
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                  <h1 className="text-xl font-semibold mb-2">Error</h1>
                  <p>Please use 'base' chain name instead</p>
                </div>
              </div>
            )
          ) : (
            <RequestFinance docState={state} />
          )}
        </div>
      )}
    </div>
  );
}
