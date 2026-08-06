import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Colors from "../constants/Colors";

interface SignatureBoxProps {
  label: string;
  height?: number;
}

// Static placeholder box matching the design. Swap in a real
// signature pad when ready (react-native-signature-canvas)
const SignatureBox = ({ label, height = 110 }: SignatureBoxProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.box, { height }]} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: { fontSize: 14, color: Colors.text, marginBottom: 8 },
  box: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
  },
});

export default SignatureBox;
