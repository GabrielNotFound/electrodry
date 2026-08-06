import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import Colors from "../constants/Colors";

interface LabeledTextAreaProps {
  label: string;
  helperText?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  numberOfLines?: number;
  editable?: boolean;
}

const LabeledTextArea = ({
  label,
  helperText,
  value,
  onChangeText,
  placeholder,
  numberOfLines = 5,
  editable = true,
}: LabeledTextAreaProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    {helperText && <Text style={styles.helper}>{helperText}</Text>}
    <TextInput
      mode="outlined"
      multiline
      numberOfLines={numberOfLines}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      editable={editable}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 2,
  },
  helper: { fontSize: 13, color: Colors.textLight, marginBottom: 8 },
  input: { backgroundColor: Colors.background },
});

export default LabeledTextArea;
