import React, { useState } from "react";
import axios from "axios"; // or use fetch API directly
import { InvoiceAction, actions } from "../../document-models/invoice";
//import { uploadPdfAndGetJson } from "./pdfToDocumentAi"

export async function loadPDFFile({ file, dispatch }: { file: File, dispatch: (action: InvoiceAction) => void }) {
  if (!file) throw new Error("No file provided");

  if (file.type !== "application/pdf") {
    throw new Error("Please upload a PDF file");
  }

  console.log("Loading PDF file:", file.name);

  return file;
}

interface PDFUploaderProps {
  dispatch: (action: InvoiceAction) => void;
}

export default function PDFUploader({ dispatch }: PDFUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    console.log("File selected for upload:", file.name);

    try {
        // Convert file to base64
        const reader = new FileReader();
        reader.onload = async () => {
            const base64Data = reader.result?.toString().split(',')[1];
            console.log("Base64 data prepared for upload");

            const response = await axios.post(
                "http://localhost:5001/api/pdf-upload",
                {
                    pdfData: base64Data
                }
            );

            const { invoiceData } = response.data;
            console.log('Extracted response:', response);
            console.log('Extracted data:', invoiceData);
            console.log('Extracted date issued:', invoiceData.dateIssued);
            
            // Dispatch the parsed invoice data
            dispatch(
                actions.editInvoice({
                    invoiceNo: invoiceData.invoiceNo || "",
                    dateIssued: invoiceData.dateIssued || new Date().toISOString().split('T')[0],
                    dateDue: invoiceData.dateDue || new Date().toISOString().split('T')[0],
                    currency: invoiceData.currency || "USD",
                })
            );

            // If we have line items, dispatch them
            if (invoiceData.lineItems && invoiceData.lineItems.length > 0) {
                invoiceData.lineItems.forEach((item: any) => {
                    dispatch(
                        actions.addLineItem({
                            id: item.id,
                            description: item.description,
                            taxPercent: item.taxPercent,
                            quantity: item.quantity,
                            currency: item.currency,
                            unitPriceTaxExcl: item.unitPriceTaxExcl,
                            unitPriceTaxIncl: item.unitPriceTaxIncl,
                            totalPriceTaxExcl: item.totalPriceTaxExcl,
                            totalPriceTaxIncl: item.totalPriceTaxIncl,
                        })
                    );
                });
            }

            // If we have issuer data, dispatch it
            if (invoiceData.issuer) {
                dispatch(
                    actions.editIssuer({
                        name: invoiceData.issuer.name,
                        country: invoiceData.issuer.country || "",
                        streetAddress: invoiceData.issuer.address?.streetAddress || "",
                        extendedAddress: invoiceData.issuer.address?.extendedAddress || "",
                        city: invoiceData.issuer.address?.city || "",
                        postalCode: invoiceData.issuer.address?.postalCode || "",
                        stateProvince: invoiceData.issuer.address?.stateProvince || "",
                        tel: invoiceData.issuer.contactInfo?.tel || "",
                        email: invoiceData.issuer.contactInfo?.email || "",
                    })
                );

                // Add bank information dispatch
                if (invoiceData.issuer.paymentRouting?.bank) {
                    dispatch(
                        actions.editIssuerBank({
                            name: invoiceData.issuer.paymentRouting.bank.name || "",
                            accountNum: invoiceData.issuer.paymentRouting.bank.accountNum || "",
                            ABA: invoiceData.issuer.paymentRouting.bank.ABA || "",
                            BIC: invoiceData.issuer.paymentRouting.bank.BIC || "",
                            SWIFT: invoiceData.issuer.paymentRouting.bank.SWIFT || "",
                            accountType: invoiceData.issuer.paymentRouting.bank.accountType || 'CHECKING',
                            beneficiary: invoiceData.issuer.paymentRouting.bank.beneficiary || "",
                            memo: invoiceData.issuer.paymentRouting.bank.memo || "",
                        })
                    );
                }
            }

            setIsLoading(false);
        };
        reader.readAsDataURL(file);
    } catch (error) {
        console.error("Error handling file:", error);
        setIsLoading(false);
    }
  };

  return (
    <div>
      <label className={`mx-3 inline-flex cursor-pointer items-center rounded ${isLoading ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'} px-4 py-2 text-white`}>
        {isLoading ? 'Processing...' : 'Upload PDF'}
        <input
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
          type="file"
          disabled={isLoading}
        />
      </label>
      {isLoading && <span className="ml-3">Extracting data from PDF...</span>}
    </div>
  );
}
