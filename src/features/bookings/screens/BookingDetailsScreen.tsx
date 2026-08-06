import LabeledField from "@/src/shared/components/LabeledField";
import SectionCard from "@/src/shared/components/SectionCard";
import SectionHeader from "@/src/shared/components/SectionHeader";
import StatusBadge from "@/src/shared/components/StatusBadge";
import Colors from "@/src/shared/constants/Colors";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, DataTable, Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BookingDetails, BookingStatus } from "../Types";

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string }> = {
  new: { label: "New", color: Colors.badgeNew },
  pending: { label: "Pending", color: Colors.badgePending },
  complete: { label: "Complete", color: Colors.badgeComplete },
};

const MOCK_DETAILS: BookingDetails = {
  id: "1",
  status: "pending",
  date: "June 20, 2025 | 1:30 PM",
  name: "John Doe",
  location: "56 Purcell Place, Crowther Island, New South Wales",
  bookingId: "ABC1234",
  quotedPrice: 35,
  depositTaken: 0,
  scheduleDate: "June 20, 2025 | Friday",
  startTime: "13:00",
  customerName: "John Doe",
  customAddress: "56 Purcell Place, Crowther Island, New South Wales",
  phoneNumber: "1597538521",
  workPhone: "",
  customerEmail: "johndoe@gmail.com",
  internalJobNotes:
    "Lorem ipsum dolor sit amet consectetur. Velit odio vitae sit adipiscing nisl elementum.",
  cleaningDetails: [
    {
      type: "UC Upholstery Clean",
      description: "Lounge Chairs = 1, Recliners = 1, Dining Chairs = 1",
      quantity: 3,
      amount: 25,
    },
    {
      type: "CC Carpet Clean",
      description: "Lounge = 1",
      quantity: 1,
      amount: 10,
    },
  ],
  quotedJob: [{ type: "Aircon", quantity: 1, amount: 25 }],
};

interface BookingDetailsScreenProps {
  onBack?: () => void;
  onCollectPayment?: () => void;
  onRevertJob?: () => void;
  onJobPhotos?: () => void;
  onStartQuotedJob?: () => void;
  onStartPreInspection?: () => void;
}

const BookingDetailsScreen = ({
  onBack,
  onCollectPayment,
  onRevertJob,
  onJobPhotos,
  onStartQuotedJob,
  onStartPreInspection,
}: BookingDetailsScreenProps) => {
  const [notes, setNotes] = useState(MOCK_DETAILS.internalJobNotes);
  const status = STATUS_CONFIG[MOCK_DETAILS.status];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.backRow}>
        <Icon
          name="arrow-left"
          size={20}
          color={Colors.textLight}
          onPress={onBack}
        />
        <Text style={styles.backLabel} onPress={onBack}>
          Booking Details
        </Text>
      </View>

      <View style={styles.idRow}>
        <Text style={styles.idLabel}>Booking ID: </Text>
        <Text style={styles.idValue}>{MOCK_DETAILS.bookingId}</Text>
        <Button
          mode="contained"
          buttonColor={Colors.primary}
          style={styles.copyButton}
          compact
        >
          Copy
        </Button>
      </View>

      <View style={styles.fieldGrid}>
        <LabeledField label="Schedule Date" value={MOCK_DETAILS.scheduleDate} />
        <LabeledField label="Start Time" value={MOCK_DETAILS.startTime} />
        <LabeledField
          label="Quoted Price"
          value={`$${MOCK_DETAILS.quotedPrice.toFixed(2)}`}
        />
        <View style={styles.statusField}>
          <Text style={styles.label}>Status</Text>
          <StatusBadge label={status.label} color={status.color} />
        </View>
      </View>

      <View style={styles.fieldGrid}>
        <LabeledField label="Customer Name" value={MOCK_DETAILS.customerName} />
        <LabeledField
          label="Custom Address"
          value={MOCK_DETAILS.customAddress}
        />
      </View>

      <View style={styles.fieldGrid}>
        <LabeledField label="Phone Number" value={MOCK_DETAILS.phoneNumber} />
        <LabeledField
          label="Work Phone"
          value={MOCK_DETAILS.workPhone || "-"}
        />
        <LabeledField
          label="Customer Email"
          value={MOCK_DETAILS.customerEmail}
        />
      </View>

      <Text style={styles.label}>Internal Job Notes</Text>
      <TextInput
        mode="outlined"
        multiline
        numberOfLines={4}
        value={notes}
        onChangeText={setNotes}
        style={styles.notesInput}
      />

      <SectionCard>
        <SectionHeader title="Cleaning Details" />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Type</DataTable.Title>
            <DataTable.Title numeric>Quantity</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>
          {MOCK_DETAILS.cleaningDetails.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                <View>
                  <Text style={styles.rowType}>{item.type}</Text>
                  {item.description && (
                    <Text style={styles.rowDescription}>
                      {item.description}
                    </Text>
                  )}
                </View>
              </DataTable.Cell>
              <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
              <DataTable.Cell numeric>${item.amount.toFixed(2)}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </SectionCard>

      <SectionCard>
        <SectionHeader title="Quoted Job" />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Type</DataTable.Title>
            <DataTable.Title numeric>Quantity</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>
          {MOCK_DETAILS.quotedJob.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.type}</DataTable.Cell>
              <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
              <DataTable.Cell numeric>${item.amount.toFixed(2)}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </SectionCard>

      <SectionCard>
        <SectionHeader title="Pre Payment Details" />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Payment Method</DataTable.Title>
            <DataTable.Title>Transaction ID</DataTable.Title>
            <DataTable.Title>ID</DataTable.Title>
          </DataTable.Header>
        </DataTable>
      </SectionCard>

      <View style={styles.footerRow}>
        <Button
          mode="outlined"
          textColor={Colors.primary}
          style={styles.footerButton}
          onPress={onCollectPayment}
        >
          Collect Payment
        </Button>
        <Button
          mode="outlined"
          textColor={Colors.primary}
          style={styles.footerButton}
          onPress={onRevertJob}
        >
          Revert Job
        </Button>
        <Button
          mode="outlined"
          textColor={Colors.primary}
          style={styles.footerButton}
          onPress={onJobPhotos}
        >
          Job Photos
        </Button>
        <Button
          mode="outlined"
          textColor={Colors.primary}
          style={styles.footerButton}
          onPress={onStartQuotedJob}
        >
          Start Quoted Job
        </Button>
        <Button
          mode="contained"
          buttonColor={Colors.primary}
          style={styles.footerButton}
          onPress={onStartPreInspection}
        >
          Start Pre-Inspection
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, paddingBottom: 48 },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  backLabel: { fontSize: 15, color: Colors.textLight },
  idRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  idLabel: { fontSize: 15, fontWeight: "700", color: Colors.text },
  idValue: { fontSize: 15, color: Colors.text },
  copyButton: { borderRadius: 6, marginLeft: 8 },
  fieldGrid: { flexDirection: "row", gap: 16, marginBottom: 16 },
  statusField: { flex: 1 },
  label: {
    fontSize: 13,
    color: Colors.text,
    marginBottom: 6,
    fontWeight: "600",
  },
  notesInput: { backgroundColor: Colors.background, marginBottom: 20 },
  rowType: { fontSize: 14, color: Colors.text, fontWeight: "600" },
  rowDescription: { fontSize: 12, color: Colors.textLight },
  footerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
  },
  footerButton: { borderRadius: 8 },
});

export default BookingDetailsScreen;
