import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Colors from "../constants/Colors";

interface LabeledFieldProps {
  label: string;
  value: string;
}

// Read-only "label above boxed value" pattern from Booking Details
const LabeledField = ({ label, value }: LabeledFieldProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.box}>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: {
    fontSize: 13,
    color: Colors.text,
    marginBottom: 4,
    fontWeight: "600",
  },
  box: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  value: { fontSize: 14, color: Colors.text },
});

export default LabeledField;
