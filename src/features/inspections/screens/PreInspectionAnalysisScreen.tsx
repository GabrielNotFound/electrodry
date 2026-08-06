// features/inspections/screens/PreInspectionAnalysisScreen.tsx
import LabeledTextArea from "@/src/shared/components/LabeledTextArea";
import PhotoCaptureRow from "@/src/shared/components/PhotoCaptureRow";
import PhotoListItem from "@/src/shared/components/PhotoListItem";
import SectionCard from "@/src/shared/components/SectionCard";
import Colors from "@/src/shared/constants/Colors";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface PreInspectionAnalysisScreenProps {
  bookingId?: string;
  onBack?: () => void;
  onTakePhoto?: () => void;
  onViewPhoto?: (index: number) => void;
  onNext?: () => void;
}

const PreInspectionAnalysisScreen = ({
  bookingId = "ABC1234",
  onBack,
  onTakePhoto,
  onViewPhoto,
  onNext,
}: PreInspectionAnalysisScreenProps) => {
  const [internalNotes, setInternalNotes] = useState(
    "Lorem ipsum dolor sit amet consectetur. Elementum dolor nisi adipiscing lectus.",
  );
  const [analysis, setAnalysis] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleTakePhoto = () => {
    setPhotos((prev) => [...prev, `Image ${prev.length + 1}`]);
    onTakePhoto?.();
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
            Booking Details
          </Text>
        </View>
        <Text style={styles.bookingId}>
          <Text style={styles.bookingIdLabel}>Booking ID: </Text>
          {bookingId}
        </Text>
      </View>

      <LabeledTextArea
        label="Internal Job Notes"
        value={internalNotes}
        onChangeText={setInternalNotes}
        numberOfLines={3}
      />

      <LabeledTextArea
        label="Pre Inspection Analysis (Carpet / Upholstery/ Hard Floors)"
        helperText="i.e Soiling, Rips, Tears, UV Damage, Stains, Previously Treated, Age, etc."
        value={analysis}
        onChangeText={setAnalysis}
        numberOfLines={6}
      />

      <SectionCard>
        <PhotoCaptureRow
          title="Pre Inspection Photo"
          description="Take a clear photo of the item to document its condition before any work begins."
          onPress={handleTakePhoto}
        />
        {photos.map((label, index) => (
          <PhotoListItem
            key={index}
            label={label}
            onView={() => onViewPhoto?.(index)}
          />
        ))}
      </SectionCard>

      {photos.length > 0 && (
        <Button
          mode="contained"
          buttonColor={Colors.primary}
          style={styles.nextButton}
          onPress={onNext}
        >
          Next
        </Button>
      )}
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
  nextButton: {
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 16,
    minWidth: 120,
  },
});

export default PreInspectionAnalysisScreen;
