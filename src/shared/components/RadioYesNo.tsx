import { StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import Colors from "../constants/Colors";

interface RadioYesNoProps {
  index: number;
  question: string;
  helperText?: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
}

const RadioYesNo = ({
  index,
  question,
  helperText,
  value,
  onChange,
}: RadioYesNoProps) => (
  <View style={styles.container}>
    <Text style={styles.question}>
      {index}. {question}
    </Text>
    {helperText && <Text style={styles.helper}>{helperText}</Text>}
    <View style={styles.row}>
      <View style={styles.option}>
        <RadioButton
          value="yes"
          status={value === true ? "checked" : "unchecked"}
          onPress={() => onChange(true)}
          color={Colors.primary}
        />
        <Text onPress={() => onChange(true)}>Yes</Text>
      </View>
      <View style={styles.option}>
        <RadioButton
          value="no"
          status={value === false ? "checked" : "unchecked"}
          onPress={() => onChange(false)}
          color={Colors.primary}
        />
        <Text onPress={() => onChange(false)}>No</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  question: { fontSize: 15, color: Colors.text, fontWeight: "600" },
  helper: {
    fontSize: 13,
    color: Colors.textLight,
    fontStyle: "italic",
    marginTop: 2,
  },
  row: { flexDirection: "row", gap: 24, marginTop: 4 },
  option: { flexDirection: "row", alignItems: "center" },
});

export default RadioYesNo;
