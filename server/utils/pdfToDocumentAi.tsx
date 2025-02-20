import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { GoogleAuth } from 'google-auth-library';
import {
    InvoiceState,
    InvoiceAction,
    actions,
  } from "../../document-models/invoice";
import crypto from 'crypto';

interface DocumentAIEntity {
    type: string;
    mentionText: string;
    confidence: number;
    children: DocumentAIEntity[];
}

export async function uploadPdfAndGetJson(inputDoc: any) {
    try {
        console.log("Starting PDF upload and processing"); // Log when processing starts

        const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
        const location = process.env.GOOGLE_CLOUD_LOCATION;
        const processorId = process.env.GOOGLE_CLOUD_PROCESSOR_ID;

        console.log("Initializing Document AI client..."); // New log
        const auth = new GoogleAuth({
            keyFile: process.env.GOOGLE_CLOUD_KEY_FILE,
            scopes: 'https://www.googleapis.com/auth/cloud-platform',
        });
        const client = new DocumentProcessorServiceClient({ auth });

        console.log("Preparing document request..."); // New log
        const document = { content: inputDoc, mimeType: 'application/pdf' };
        const request = {
            name: `projects/${projectId}/locations/${location}/processors/${processorId}`,
            rawDocument: document,
        };

        console.log("Sending request to Document AI..."); // New log
        const [result]: any = await client.processDocument(request);
        console.log("PDF processed successfully"); // Original log

        // Extract useful sections from the JSON data using recursive function
        const extractEntities = (entities: any[]): DocumentAIEntity[] => {
            return entities.flatMap(entity => {
                const extracted = {
                    type: entity.type,
                    mentionText: entity.mentionText,
                    confidence: entity.confidence,
                    children: [] as DocumentAIEntity[]
                };

                if (entity.properties && entity.properties.length > 0) {
                    extracted.children = extractEntities(entity.properties);
                }

                return extracted;
            });
        };

        const entities = extractEntities(result.document.entities);
        console.log("Entities:", JSON.stringify(entities, null, 2));

        // Map the entities to invoice format
        const invoiceData = mapDocumentAiToInvoice(entities);
        
        console.log("Mapped invoice data:", invoiceData);

        return { invoiceData };
    } catch (error) {
        console.error("Error in uploadPdfAndGetJson:", error); // Add error logging
        throw error; // Re-throw to handle in the API route
    }
}

function parseDate(dateStr: string): string {
    // Remove any leading/trailing whitespace
    dateStr = dateStr.trim();
    
    // Try different date formats
    let date: Date | null = null;
    
    // Handle YYYY-MM-DD format
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        date = new Date(dateStr);
    }
    // Handle DD-MMM-YYYY format (e.g., "12-Mar-2025")
    else if (dateStr.match(/^\d{1,2}-[A-Za-z]{3}-\d{4}$/)) {
        const [day, month, year] = dateStr.split('-');
        const monthMap: {[key: string]: string} = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
            'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
            'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };
        date = new Date(`${year}-${monthMap[month]}-${day.padStart(2, '0')}`);
    }
    // Handle MM/DD/YYYY format
    else if (dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        const [month, day, year] = dateStr.split('/');
        date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    }
    
    if (!date || isNaN(date.getTime())) {
        throw new Error(`Invalid date format: ${dateStr}`);
    }
    
    // Return in YYYY-MM-DD format
    return date.toISOString().split('T')[0];
}

function convertCurrencySymbolToCode(symbol: string): string {
    const currencyMap: { [key: string]: string } = {
        '$': 'USD',
        '£': 'GBP',
        '€': 'EUR',
        // Add more symbols as needed
    };

    return currencyMap[symbol.trim()] || symbol;
}

function mapDocumentAiToInvoice(
    entities: DocumentAIEntity[], 
    existingInvoice?: Partial<InvoiceState>
): Partial<InvoiceState> {
    const invoiceData: Partial<InvoiceState> = existingInvoice || {
        lineItems: []
    };

    // Initialize issuer if it doesn't exist
    if (!invoiceData.issuer) {
        invoiceData.issuer = {
            name: null,
            address: null,
            contactInfo: {
                email: null,
                tel: null
            },
            country: null,
            id: null,
            paymentRouting: null
        };
    }

    // Initialize payer if it doesn't exist
    if (!invoiceData.payer) {
        invoiceData.payer = {
            name: null,
            address: null,
            contactInfo: {
                email: null,
                tel: null
            },
            country: null,
            id: null,
            paymentRouting: null
        };
    }

    // Initialize issuer's payment routing if it doesn't exist
    if (!invoiceData.issuer!.paymentRouting) {
        invoiceData.issuer!.paymentRouting = {
            bank: {
                name: "Bank of America",
                address: {
                    streetAddress: null,
                    city: null,
                    stateProvince: null,
                    postalCode: null,
                    country: null,
                    extendedAddress: null
                },
                accountNum: "11111111111111111111",
                ABA: null,
                BIC: null,
                SWIFT: null,
                accountType: null,
                beneficiary: null,
                intermediaryBank: null,
                memo: null
            },
            wallet: null
        };
    }

    const monthMap: {[key: string]: string} = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    
    entities.forEach(entity => {
        switch(entity.type) {
            case 'invoice_id':
                invoiceData.invoiceNo = entity.mentionText;
                break;
            case 'invoice_date':
                invoiceData.dateIssued = parseDate(entity.mentionText);
                break;
            
            case 'due_date':
                invoiceData.dateDue = parseDate(entity.mentionText);
                break;

            case 'currency':
                invoiceData.currency = convertCurrencySymbolToCode(entity.mentionText);
                break;
                
            case 'supplier_name':
                invoiceData.issuer!.name = entity.mentionText;
                break;
            
            case 'supplier_email':
                if (!invoiceData.issuer!.contactInfo) {
                    invoiceData.issuer!.contactInfo = { email: null, tel: null };
                }
                invoiceData.issuer!.contactInfo.email = entity.mentionText;
                break;

            case 'supplier_address':
                const addressLines = entity.mentionText.split('\n');
                const streetAddress = addressLines[0];
                
                let city = '', stateProvince = '', postalCode = '', country = '';
                if (addressLines[1]) {
                    const matches = addressLines[1].match(/(\d{4})\s+([^,]+)/);
                    if (matches) {
                        postalCode = matches[1];
                        city = matches[2].trim();
                    }
                }
                if (addressLines[2]) {
                    country = addressLines[2].trim();
                }

                invoiceData.issuer!.address = {
                    streetAddress,
                    city,
                    stateProvince,
                    postalCode,
                    country,
                    extendedAddress: null
                };
                break;

            case 'supplier_tax_id':
                invoiceData.issuer!.id = {
                    taxId: entity.mentionText
                };
                break;

            case 'supplier_phone':
                if (!invoiceData.issuer!.contactInfo) {
                    invoiceData.issuer!.contactInfo = { email: null, tel: null };
                }
                invoiceData.issuer!.contactInfo.tel = entity.mentionText;
                break;
            
            case 'line_item':
                const description = entity.children?.find(child => 
                    child.type === 'line_item/description'
                )?.mentionText || '';
                
                const amount = entity.children?.find(child => 
                    child.type === 'line_item/amount'
                )?.mentionText || '';

                const baseAmount = parseFloat(amount.replace(',', '')) || 0;
                const taxRate = 0;  // assuming no tax for now
                
                invoiceData.lineItems = invoiceData.lineItems || [];
                invoiceData.lineItems.push({
                    description,
                    quantity: 1,
                    unitPriceTaxExcl: baseAmount,
                    unitPriceTaxIncl: baseAmount * (1 + taxRate),
                    totalPriceTaxExcl: baseAmount,
                    totalPriceTaxIncl: baseAmount * (1 + taxRate),
                    currency: convertCurrencySymbolToCode(invoiceData.currency || 'USD'),
                    id: crypto.randomUUID(),
                    taxPercent: taxRate * 100
                });
                break;

            case 'receiver_name':
                invoiceData.payer!.name = entity.mentionText;
                break;
            
            case 'receiver_tax_id':
                invoiceData.payer!.id = {
                    taxId: entity.mentionText
                };
                break;

            case 'receiver_address':
                const payerAddressLines = entity.mentionText.split('\n');
                const payerStreetAddress = payerAddressLines[0];
                
                let payerCity = '', payerPostalCode = '', payerCountry = '';
                if (payerAddressLines[1]) {
                    const matches = payerAddressLines[1].match(/(\d{4})\s+([^,]+)/);
                    if (matches) {
                        payerPostalCode = matches[1];
                        payerCity = matches[2].trim();
                    }
                }
                if (payerAddressLines[2]) {
                    payerCountry = payerAddressLines[2].trim();
                }

                invoiceData.payer!.address = {
                    streetAddress: payerStreetAddress,
                    city: payerCity,
                    postalCode: payerPostalCode,
                    country: payerCountry,
                    stateProvince: null,
                    extendedAddress: null
                };
                break;

            case 'receiver_email':
                if (!invoiceData.payer!.contactInfo) {
                    invoiceData.payer!.contactInfo = { email: null, tel: null };
                }
                invoiceData.payer!.contactInfo.email = entity.mentionText;
                break;

            case 'supplier_iban':
                if (!invoiceData.issuer!.paymentRouting!.bank) {
                    invoiceData.issuer!.paymentRouting!.bank = {
                        name: "N/A",
                        address: {
                            streetAddress: null,
                            city: null,
                            stateProvince: null,
                            postalCode: null,
                            country: null,
                            extendedAddress: null
                        },
                        accountNum: entity.mentionText,
                        ABA: null,
                        BIC: null,
                        SWIFT: null,
                        accountType: null,
                        beneficiary: null,
                        intermediaryBank: null,
                        memo: null
                    };
                } else {
                    invoiceData.issuer!.paymentRouting!.bank.accountNum = entity.mentionText;
                }
                break;
        }
    });

    return invoiceData;
}

/*// Example usage
(async () => {
    const projectId = '980330048014';
    const location = 'us';  // or your specific location
    const processorId = 'd54517bef7b04930';
    const filePath = '/Users/teepteep/Documents/Work/BuilderShowcase/InvoiceFlow/documentAi/Invoices/invoice_55.pdf';

    const { usefulData } = await uploadPdfAndGetJson(projectId, location, processorId, filePath);
    console.log(usefulData);

   
    });
})()*/