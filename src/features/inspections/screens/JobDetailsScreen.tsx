// features/inspections/screens/JobDetailsScreen.tsx
import SectionCard from "@/src/shared/components/SectionCard";
import SectionHeader from "@/src/shared/components/SectionHeader";
import Colors from "@/src/shared/constants/Colors";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import JobTypeRow from "../components/JobTypeRow";
import { JobTypeItem } from "../Types";

const MOCK_JOB_TYPES: JobTypeItem[] = [
  {
    id: "1",
    type: "CC Carpet Clean",
    details: ["1x Lounge Chairs"],
    status: "pending",
  },
  {
    id: "2",
    type: "UC Upholstery Clean",
    details: ["1x Lounge Chairs", "1x Recliners", "1x Dining Chairs"],
    status: "pending",
  },
];

type ServiceMode = "none" | "upsell" | "addon";

interface JobDetailsScreenProps {
  bookingId?: string;
  onBack?: () => void;
  onViewQuoteForm?: () => void;
  onSave?: () => void;
  onProceedToPayment?: () => void;
}

const JobDetailsScreen = ({
  bookingId = "ABC1234",
  onBack,
  onViewQuoteForm,
  onSave,
  onProceedToPayment,
}: JobDetailsScreenProps) => {
  const [jobTypes, setJobTypes] = useState(MOCK_JOB_TYPES);
  const [mode, setMode] = useState<ServiceMode>("none");

  const [upsellType, setUpsellType] = useState("");
  const [upsellPrice, setUpsellPrice] = useState("");
  const [upsellNote, setUpsellNote] = useState("");

  const [addonService, setAddonService] = useState("");
  const [addonApplyTo, setAddonApplyTo] = useState("");
  const [addonQuantity, setAddonQuantity] = useState("");
  const [addonPrice, setAddonPrice] = useState("");

  const markAsDone = (id: string) => {
    setJobTypes((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "done",
              timeFinished: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : item,
      ),
    );
  };

  const toggleMode = (value: ServiceMode) => {
    setMode((prev) => (prev === value ? "none" : value));
  };

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

      <SectionCard>
        <SectionHeader
          title="Job Details"
          rightAction={
            <Text style={styles.viewQuote} onPress={onViewQuoteForm}>
              View Quote Form
            </Text>
          }
        />
        <View style={styles.typeHeader}>
          <Text style={styles.typeHeaderLabel}>Type</Text>
        </View>
        {jobTypes.map((item) => (
          <JobTypeRow key={item.id} item={item} onMarkAsDone={markAsDone} />
        ))}
      </SectionCard>

      <View style={styles.checkboxRow}>
        <View style={styles.checkboxOption}>
          <Checkbox
            status={mode === "upsell" ? "checked" : "unchecked"}
            onPress={() => toggleMode("upsell")}
            color={Colors.primary}
          />
          <Text onPress={() => toggleMode("upsell")}>Upsell Service</Text>
        </View>
        <View style={styles.checkboxOption}>
          <Checkbox
            status={mode === "addon" ? "checked" : "unchecked"}
            onPress={() => toggleMode("addon")}
            color={Colors.primary}
          />
          <Text onPress={() => toggleMode("addon")}>Add-on Service</Text>
        </View>
      </View>

      {mode === "upsell" && (
        <View style={styles.formRow}>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Service Type</Text>
            <TextInput
              mode="outlined"
              value={upsellType}
              onChangeText={setUpsellType}
              style={styles.formInput}
            />
          </View>
          <View style={styles.formFieldSmall}>
            <Text style={styles.formLabel}>Price</Text>
            <TextInput
              mode="outlined"
              value={upsellPrice}
              onChangeText={setUpsellPrice}
              keyboardType="numeric"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Note</Text>
            <TextInput
              mode="outlined"
              value={upsellNote}
              onChangeText={setUpsellNote}
              style={styles.formInput}
            />
          </View>
          <Icon
            name="plus-circle"
            size={32}
            color={Colors.primary}
            style={styles.addIcon}
          />
        </View>
      )}

      {mode === "addon" && (
        <View style={styles.formRow}>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Select Additional Service</Text>
            <TextInput
              mode="outlined"
              value={addonService}
              onChangeText={setAddonService}
              style={styles.formInput}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Choose Service to apply add-on</Text>
            <TextInput
              mode="outlined"
              value={addonApplyTo}
              onChangeText={setAddonApplyTo}
              style={styles.formInput}
            />
          </View>
          <View style={styles.formFieldSmall}>
            <Text style={styles.formLabel}>Quantity</Text>
            <TextInput
              mode="outlined"
              value={addonQuantity}
              onChangeText={setAddonQuantity}
              keyboardType="numeric"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formFieldSmall}>
            <Text style={styles.formLabel}>Price</Text>
            <TextInput
              mode="outlined"
              value={addonPrice}
              onChangeText={setAddonPrice}
              keyboardType="numeric"
              style={styles.formInput}
            />
          </View>
          <Icon
            name="plus-circle"
            size={32}
            color={Colors.primary}
            style={styles.addIcon}
          />
        </View>
      )}

      <View style={styles.footerRow}>
        <Button
          mode="outlined"
          textColor={Colors.primary}
          style={styles.footerButton}
          onPress={onSave}
        >
          Save
        </Button>
        <Button
          mode="contained"
          buttonColor={Colors.primary}
          style={styles.footerButton}
          onPress={onProceedToPayment}
        >
          Proceed To Payment
        </Button>
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
  viewQuote: {
    color: Colors.background,
    fontSize: 13,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  typeHeader: { paddingHorizontal: 16, paddingTop: 10 },
  typeHeaderLabel: { fontSize: 12, color: Colors.textLight },
  checkboxRow: { flexDirection: "row", gap: 24, marginVertical: 16 },
  checkboxOption: { flexDirection: "row", alignItems: "center" },
  formRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 20,
  },
  formField: { flex: 1 },
  formFieldSmall: { width: 90 },
  formLabel: { fontSize: 12, color: Colors.text, marginBottom: 4 },
  formInput: { backgroundColor: Colors.background, height: 44 },
  addIcon: { marginBottom: 8 },
  footerRow: { flexDirection: "row", justifyContent: "flex-end", gap: 12 },
  footerButton: { borderRadius: 8 },
});

export default JobDetailsScreen;
