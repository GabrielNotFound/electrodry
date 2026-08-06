// features/inspections/screens/OHSAssessmentScreen.tsx
import RadioYesNo from "@/src/shared/components/RadioYesNo";
import SignatureBox from "@/src/shared/components/SignatureBox";
import Colors from "@/src/shared/constants/Colors";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const QUESTIONS = [
  {
    key: "tripHazards",
    question: "Are there any trip or slip hazards that require controls?",
  },
  {
    key: "accessSafety",
    question:
      "Are there safety issues when accessing the premises or job site?",
  },
  {
    key: "chemicalConcerns",
    question:
      "Are there any concerns with the use of chemicals in the premises?",
  },
  {
    key: "manualHandling",
    question: "Are there any manual handling concerns?",
  },
  {
    key: "asthmatic",
    question: "Is the customer asthmatic?",
    helperText:
      "(If so, ask the customer to stay out of the room for 20 mins after completion of work)",
  },
  {
    key: "hazardsAdvised",
    question:
      "Have you advised the customer of likely trip/slip hazards, the location of your hot water bucket and safety concerns?",
  },
] as const;

const SAFETY_POINTS = [
  "The carpet floor in the rooms where we are working, and adjacent areas, may be damp during the course of the job, and may remain damp for several hours after the completion of work. This may result in a slip hazard.",
  "We need to use electrical items and we ask you to be careful not to trip over any cords and keep children away from equipment that may be turned on.",
  "We may need to place a bucket that contains a heater and hot water in the laundry or bathroom. Please keep children away from this bucket.",
  "Asthmatics and people with breathing difficulties should stay out of the room whilst work is completed and for at least 20 mins thereafter.",
  "We ask you to advise our technicians of any potential hazards that may exist in the house or grounds prior to the commencement of work.",
];

interface OHSAssessmentScreenProps {
  bookingId?: string;
  onBack?: () => void;
  onStartJob?: (
    answers: Record<string, boolean | null>,
    agreed: boolean,
  ) => void;
}

const OHSAssessmentScreen = ({
  bookingId = "ABC1234",
  onBack,
  onStartJob,
}: OHSAssessmentScreenProps) => {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(
    Object.fromEntries(QUESTIONS.map((q) => [q.key, null])),
  );
  const [agreed, setAgreed] = useState(false);

  const setAnswer = (key: string, value: boolean) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));
  const allAnswered = Object.values(answers).every((value) => value !== null);

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
            Pre Inspection Analysis
          </Text>
        </View>
        <Text style={styles.bookingId}>
          <Text style={styles.bookingIdLabel}>Booking ID: </Text>
          {bookingId}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>OH&S Safety Risk Assessment</Text>
      {QUESTIONS.map((q, index) => (
        <RadioYesNo
          key={q.key}
          index={index + 1}
          question={q.question}
          helperText={"helperText" in q ? q.helperText : undefined}
          value={answers[q.key]}
          onChange={(value) => setAnswer(q.key, value)}
        />
      ))}

      <Text style={styles.sectionTitle}>Safety Acknowledgement</Text>
      <Text style={styles.paragraph}>
        You safety is one of our greatest concerns. We advise that:
      </Text>
      {SAFETY_POINTS.map((point, index) => (
        <View key={index} style={styles.bulletRow}>
          <Text style={styles.bullet}>{"\u2022"}</Text>
          <Text style={styles.bulletText}>{point}</Text>
        </View>
      ))}
      <Text style={styles.paragraph}>
        By signing in this box, you acknowledge that you have read and
        understood our 5 point safety update.
      </Text>

      <Text style={styles.sectionTitle}>
        General Conditions for Cleaning of Carpet & Upholstery
      </Text>
      <Text style={styles.paragraph}>
        By agreeing to the following terms and conditions you understand and
        accept Electrodry's terms of service. Within this document you (the
        client) may be referred to as "you", "the client" or the "customer". All
        references to "us", and your "technician" include A Whistle & Co (1979)
        Pty Ltd t/as Electrodry and its' related entities including Electrodry
        Franchise Owners.
      </Text>

      <View style={styles.signatureRow}>
        <SignatureBox label="Customer's Acknowledgment Signature" />
        <SignatureBox label="Technician's Acknowledgment Signature" />
      </View>

      <View style={styles.agreeRow}>
        <Checkbox
          status={agreed ? "checked" : "unchecked"}
          onPress={() => setAgreed((prev) => !prev)}
          color={Colors.primary}
        />
        <Text
          style={styles.agreeText}
          onPress={() => setAgreed((prev) => !prev)}
        >
          I have read, understood and agree to Electrodry's terms and conditions
          of service
        </Text>
      </View>

      <Button
        mode="contained"
        buttonColor={Colors.primary}
        style={styles.startButton}
        disabled={!allAnswered || !agreed}
        onPress={() => onStartJob?.(answers, agreed)}
      >
        Start Job
      </Button>
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 8,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  bulletRow: { flexDirection: "row", marginBottom: 8, paddingRight: 8 },
  bullet: { fontSize: 14, color: Colors.text, marginRight: 8 },
  bulletText: { flex: 1, fontSize: 14, color: Colors.text, lineHeight: 20 },
  signatureRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  agreeRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  agreeText: { flex: 1, fontSize: 14, color: Colors.text },
  startButton: { borderRadius: 8, paddingVertical: 4 },
});

export default OHSAssessmentScreen;
