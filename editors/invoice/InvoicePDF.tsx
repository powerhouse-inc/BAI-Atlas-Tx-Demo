import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { InvoiceState } from "../../document-models/invoice";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  invoiceNumber: {
    fontSize: 12,
    marginLeft: 4,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: 70,
    color: "#4B5563", // text-gray-600
    fontSize: 10,
  },
  value: {
    flex: 1,
    fontSize: 10,
  },
  gridContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
  },
  gridColumn: {
    flex: 1,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6", // bg-gray-100
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB", // border-gray-200
    fontSize: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    padding: 8,
    fontSize: 10,
  },
  tableCol40: {
    width: "40%",
  },
  tableCol15: {
    width: "15%",
  },
  totals: {
    marginTop: 20,
    marginRight: 20,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "flex-end",
  },
  totalLabel: {
    marginRight: 8,
    color: "#4B5563",
    fontSize: 14,
  },
  totalValue: {
    minWidth: 100,
    textAlign: "right",
    fontSize: 14,
  },
  status: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1F2937",
    marginLeft: 4,
  },
  paymentSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1F2937",
  },
  paymentRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
});

// Format date to readable string
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
};

// Format currency
const formatCurrency = (amount: number, currency: string) => {
  return `${amount.toFixed(2)} ${currency}`;
};

interface InvoicePDFProps {
  invoice: InvoiceState;
}

export const InvoicePDF: React.FC<InvoicePDFProps> = ({
  invoice,
  fiatMode,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
          <Text style={[styles.title, { marginBottom: 0 }]}>Invoice</Text>
          <Text style={styles.invoiceNumber}>{invoice.invoiceNo}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
          <Text style={[styles.title, { marginBottom: 0, fontSize: 10 }]}>
            Currency:
          </Text>
          <Text style={styles.status}>{invoice.currency}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
          <Text style={[styles.title, { marginBottom: 0, fontSize: 10 }]}>
            Status:
          </Text>
          <Text style={styles.status}>{invoice.status}</Text>
        </View>
      </View>

      <View style={styles.gridContainer}>
        {/* Issuer Section */}
        <View style={styles.gridColumn}>
          <Text style={styles.sectionTitle}>Issuer</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Issue Date:</Text>
            <Text style={styles.value}>{formatDate(invoice.dateIssued)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Delivery Date:</Text>
            <Text style={styles.value}>
              {formatDate(invoice.dateDelivered || invoice.dateIssued)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{invoice.issuer.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
              {invoice.issuer.address?.streetAddress || ""}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>
              {invoice.issuer.address?.city || ""}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Country:</Text>
            <Text style={styles.value}>
              {invoice.issuer.address?.country || ""}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>
              {invoice.issuer.contactInfo?.email || ""}
            </Text>
          </View>
        </View>

        {/* Payer Section */}
        <View style={styles.gridColumn}>
          <Text style={styles.sectionTitle}>Payer</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Due Date:</Text>
            <Text style={styles.value}>{formatDate(invoice.dateDue)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{invoice.payer.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
              {invoice.issuer.address?.streetAddress || ""}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>
              {invoice.payer.address?.city || ""}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Country:</Text>
            <Text style={styles.value}>
              {invoice.payer.address?.country || ""}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>
              {invoice.payer.contactInfo?.email || ""}
            </Text>
          </View>
        </View>
      </View>
      {/* Payment Information */}
      <View style={styles.paymentSection}>
        <Text style={styles.paymentTitle}>Payment Information</Text>
        {fiatMode ? (
          <View style={[styles.gridContainer, { marginTop: 0 }]}>
            {/* Left Column - Bank Address */}
            <View style={styles.gridColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Bank Name:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.name || ""}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.address?.streetAddress || ""}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>City:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.address?.city || ""}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Country:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.address?.country || ""}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Extended Address:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.address?.extendedAddress || ""}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Postal Code:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.address?.postalCode || ""}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>State/Province:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.address?.stateProvince || ""}
                </Text>
              </View>
            </View>
            {/* Right Column - Account Details */}
            <View style={styles.gridColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Account Type:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.accountType || ""}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Account Nr:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.accountNum || ""}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Beneficiary:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.beneficiary || ""}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  {invoice.issuer.paymentRouting?.bank?.BIC
                    ? "BIC:"
                    : invoice.issuer.paymentRouting?.bank?.SWIFT
                    ? "SWIFT:"
                    : invoice.issuer.paymentRouting?.bank?.ABA
                    ? "ABA:"
                    : "Routing:"}
                </Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.bank?.BIC ||
                    invoice.issuer.paymentRouting?.bank?.SWIFT ||
                    invoice.issuer.paymentRouting?.bank?.ABA ||
                    ""}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.row}>
            <View style={styles.gridColumn}>
              <View style={styles.row}>
                <Text style={styles.label}>Chain:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.wallet?.chainName || ""}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>
                  {invoice.issuer.paymentRouting?.wallet?.address || ""}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Line Items */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCol40}>Description</Text>
          <Text style={styles.tableCol15}>Quantity</Text>
          <Text style={styles.tableCol15}>Unit Price</Text>
          <Text style={styles.tableCol15}>Tax</Text>
          <Text style={styles.tableCol15}>Total</Text>
        </View>
        {invoice.lineItems.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol40}>{item.description}</Text>
            <Text style={styles.tableCol15}>{item.quantity}</Text>
            <Text style={styles.tableCol15}>
              {formatCurrency(item.unitPriceTaxExcl, invoice.currency)}
            </Text>
            <Text style={styles.tableCol15}>
              {formatCurrency(
                item.unitPriceTaxIncl - item.unitPriceTaxExcl,
                invoice.currency
              )}
            </Text>
            <Text style={styles.tableCol15}>
              {formatCurrency(
                item.quantity * item.unitPriceTaxIncl,
                invoice.currency
              )}
            </Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totals}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(
              invoice.lineItems.reduce(
                (sum, item) => sum + item.quantity * item.unitPriceTaxExcl,
                0
              ),
              invoice.currency
            )}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total (incl. tax):</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(
              invoice.lineItems.reduce(
                (sum, item) => sum + item.quantity * item.unitPriceTaxIncl,
                0
              ),
              invoice.currency
            )}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
)};
