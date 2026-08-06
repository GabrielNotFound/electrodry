import SectionCard from "@/src/shared/components/SectionCard";
import SectionHeader from "@/src/shared/components/SectionHeader";
import SignatureBox from "@/src/shared/components/SignatureBox";
import Colors from "@/src/shared/constants/Colors";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Button,
    Checkbox,
    RadioButton,
    Text,
    TextInput,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { PaymentSummaryItem } from "../Types";

const SUMMARY_ITEMS: PaymentSummaryItem[] = [
  {
    type: "UC Upholstery Clean",
    details: "1x Lounge Chairs, 1x Recliners, 1x Dining Chairs",
    price: 25,
  },
  { type: "CC Carpet Clean", details: "1x Lounge Chairs", price: 10 },
];

const DEPOSIT_COLLECTED = 20;
const GST = 15;
const TOTAL = 50;

const COURTESY_CALL_OPTIONS = ["3 Months", "6 Months", "9 Months", "12 Months"];

interface PaymentScreenProps {
  bookingId?: string;
  onBack?: () => void;
  onFinishJob?: () => void;
}

const PaymentScreen = ({
  bookingId = "ABC1234",
  onBack,
  onFinishJob,
}: PaymentScreenProps) => {
  const [hasDiscount, setHasDiscount] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [depositPaid, setDepositPaid] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [depositPaidAlt, setDepositPaidAlt] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [discountReason, setDiscountReason] = useState("");
  const [paymentType, setPaymentType] = useState("Card");
  const [amount, setAmount] = useState("");
  const [surcharge, setSurcharge] = useState("");
  const [total, setTotal] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [customerAccepted, setCustomerAccepted] = useState(false);
  const [courtesyCall, setCourtesyCall] = useState<string | null>(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View style={styles.backRow}>
          <Icon
            name="arrow-left"
            size={20}
            color={Colors.textLight}
            onPress={onBack}
          />
          <Text style={styles.backLabel} onPress={onBack}>
            Job Photo
          </Text>
        </View>
        <Text style={styles.bookingId}>
          <Text style={styles.bookingIdLabel}>Booking ID: </Text>
          {bookingId}
        </Text>
      </View>

      <View style={styles.columns}>
        <View style={styles.leftColumn}>
          <SectionCard>
            <SectionHeader title="Payment Details" />
            <View style={styles.formContent}>
              {!hasDiscount ? (
                <View style={styles.formRow}>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Account Number</Text>
                    <TextInput
                      mode="outlined"
                      value={accountNumber}
                      onChangeText={setAccountNumber}
                      editable={false}
                      style={styles.formInput}
                    />
                  </View>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>
                      Deposit paid to technician
                    </Text>
                    <TextInput
                      mode="outlined"
                      value={depositPaid}
                      onChangeText={setDepositPaid}
                      style={styles.formInput}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.formRow}>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Invoice Number</Text>
                    <TextInput
                      mode="outlined"
                      value={invoiceNumber}
                      onChangeText={setInvoiceNumber}
                      editable={false}
                      style={styles.formInput}
                    />
                  </View>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Deposit paid</Text>
                    <TextInput
                      mode="outlined"
                      value={depositPaidAlt}
                      onChangeText={setDepositPaidAlt}
                      style={styles.formInput}
                    />
                  </View>
                </View>
              )}

              <View style={styles.checkboxRow}>
                <Checkbox
                  status={hasDiscount ? "checked" : "unchecked"}
                  onPress={() => setHasDiscount((prev) => !prev)}
                  color={Colors.primary}
                />
                <Text onPress={() => setHasDiscount((prev) => !prev)}>
                  Discount
                </Text>
              </View>

              {hasDiscount && (
                <View style={styles.formRow}>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Discount Amount</Text>
                    <TextInput
                      mode="outlined"
                      value={discountAmount}
                      onChangeText={setDiscountAmount}
                      keyboardType="numeric"
                      style={styles.formInput}
                    />
                  </View>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Reason</Text>
                    <TextInput
                      mode="outlined"
                      value={discountReason}
                      onChangeText={setDiscountReason}
                      style={styles.formInput}
                    />
                  </View>
                </View>
              )}

              <View style={styles.formRow}>
                <View style={styles.formFieldSmall}>
                  <Text style={styles.formLabel}>Payment Type</Text>
                  <TextInput
                    mode="outlined"
                    value={paymentType}
                    onChangeText={setPaymentType}
                    style={styles.formInput}
                  />
                </View>
                <View style={styles.formFieldSmall}>
                  <Text style={styles.formLabel}>Amount</Text>
                  <TextInput
                    mode="outlined"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    style={styles.formInput}
                  />
                </View>
                <View style={styles.formFieldSmall}>
                  <Text style={styles.formLabel}>Surcharge</Text>
                  <TextInput
                    mode="outlined"
                    value={surcharge}
                    onChangeText={setSurcharge}
                    keyboardType="numeric"
                    style={styles.formInput}
                  />
                </View>
                <View style={styles.formFieldSmall}>
                  <Text style={styles.formLabel}>Total</Text>
                  <TextInput
                    mode="outlined"
                    value={total}
                    onChangeText={setTotal}
                    keyboardType="numeric"
                    style={styles.formInput}
                  />
                </View>
                <View style={styles.formFieldSmall}>
                  <Text style={styles.formLabel}>Transaction ID</Text>
                  <TextInput
                    mode="outlined"
                    value={transactionId}
                    onChangeText={setTransactionId}
                    style={styles.formInput}
                  />
                </View>
              </View>

              <Text style={styles.subheading}>Customer Acceptance</Text>
              <View style={styles.checkboxRow}>
                <Checkbox
                  status={customerAccepted ? "checked" : "unchecked"}
                  onPress={() => setCustomerAccepted((prev) => !prev)}
                  color={Colors.primary}
                />
                <Text
                  style={styles.checkboxLabel}
                  onPress={() => setCustomerAccepted((prev) => !prev)}
                >
                  The customer acknowledges completion of the work to their
                  satisfaction
                </Text>
              </View>

              <Text style={styles.subheading}>
                Courtesy Call (Please contact me in...)
              </Text>
              <View style={styles.radioRow}>
                {COURTESY_CALL_OPTIONS.map((option) => (
                  <View key={option} style={styles.radioOption}>
                    <RadioButton
                      value={option}
                      status={courtesyCall === option ? "checked" : "unchecked"}
                      onPress={() => setCourtesyCall(option)}
                      color={Colors.primary}
                    />
                    <Text onPress={() => setCourtesyCall(option)}>
                      {option}
                    </Text>
                  </View>
                ))}
              </View>

              <SignatureBox label="Customer Signature" height={90} />
            </View>
          </SectionCard>
        </View>

        <View style={styles.rightColumn}>
          <SectionCard>
            <SectionHeader title="Summary" />
            <View style={styles.summaryContent}>
              <View style={styles.summaryHeaderRow}>
                <Text style={styles.summaryHeaderLabel}>Type</Text>
                <Text style={styles.summaryHeaderLabel}>Price</Text>
              </View>
              {SUMMARY_ITEMS.map((item, index) => (
                <View key={index} style={styles.summaryItem}>
                  <View style={styles.summaryItemRow}>
                    <Text style={styles.summaryItemType}>{item.type}</Text>
                    <Text style={styles.summaryItemPrice}>
                      ${item.price.toFixed(2)}
                    </Text>
                  </View>
                  {item.details && (
                    <Text style={styles.summaryItemDetails}>
                      {item.details}
                    </Text>
                  )}
                </View>
              ))}

              <View style={styles.summaryItemRow}>
                <Text style={styles.summaryItemType}>Deposit Collected</Text>
                <Text style={styles.summaryItemPrice}>
                  - ${DEPOSIT_COLLECTED.toFixed(2)}
                </Text>
              </View>
              <View style={styles.summaryItemRow}>
                <Text style={styles.summaryItemType}>Includes GST</Text>
                <Text style={styles.summaryItemPrice}>${GST.toFixed(2)}</Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>${TOTAL.toFixed(2)}</Text>
              </View>
            </View>
          </SectionCard>

          <Button
            mode="contained"
            buttonColor={customerAccepted ? Colors.primary : Colors.textLight}
            disabled={!customerAccepted}
            style={styles.finishButton}
            onPress={onFinishJob}
          >
            Finish Job
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, paddingBottom: 48 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  backLabel: { fontSize: 15, color: Colors.textLight },
  bookingId: { fontSize: 14, color: Colors.text },
  bookingIdLabel: { fontWeight: "700" },
  columns: { flexDirection: "row", gap: 16 },
  leftColumn: { flex: 2 },
  rightColumn: { flex: 1 },
  formContent: { padding: 16 },
  formRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
  },
  formField: { flex: 1, minWidth: 140 },
  formFieldSmall: { width: 100 },
  formLabel: { fontSize: 12, color: Colors.text, marginBottom: 4 },
  formInput: { backgroundColor: Colors.background, height: 44 },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  checkboxLabel: { flex: 1, fontSize: 13, color: Colors.text },
  subheading: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 8,
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  radioOption: { flexDirection: "row", alignItems: "center" },
  summaryContent: { padding: 16 },
  summaryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryHeaderLabel: { fontSize: 12, color: Colors.textLight },
  summaryItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  summaryItemRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryItemType: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    flexShrink: 1,
  },
  summaryItemPrice: { fontSize: 13, color: Colors.text },
  summaryItemDetails: { fontSize: 11, color: Colors.textLight, marginTop: 2 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  totalLabel: { fontSize: 15, fontWeight: "700", color: Colors.primary },
  totalValue: { fontSize: 15, fontWeight: "700", color: Colors.primary },
  finishButton: { borderRadius: 8, marginTop: 16 },
});

export default PaymentScreen;
