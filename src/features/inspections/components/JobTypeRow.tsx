// features/inspections/components/JobTypeRow.tsx
import Colors from "@/src/shared/constants/Colors";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { JobTypeItem } from "../Types";

interface JobTypeRowProps {
  item: JobTypeItem;
  onMarkAsDone: (id: string) => void;
}

const JobTypeRow = ({ item, onMarkAsDone }: JobTypeRowProps) => (
  <View style={styles.row}>
    <View style={styles.info}>
      <Text style={styles.type}>{item.type}</Text>
      {item.details.map((detail, index) => (
        <Text key={index} style={styles.detail}>
          {detail}
        </Text>
      ))}
      {item.addOnService && (
        <Text style={styles.addOn}>
          <Text style={styles.addOnLabel}>Add On Service: </Text>
          {item.addOnService}
        </Text>
      )}
    </View>

    {item.status === "done" ? (
      <View style={styles.doneBlock}>
        <View style={styles.doneRow}>
          <Icon name="check-circle" size={16} color={Colors.badgeComplete} />
          <Text style={styles.doneLabel}>Done</Text>
        </View>
        {item.timeFinished && (
          <Text style={styles.timeFinished}>
            Time Finished: {item.timeFinished}
          </Text>
        )}
      </View>
    ) : (
      <Button
        mode="contained"
        buttonColor={Colors.badgeComplete}
        compact
        onPress={() => onMarkAsDone(item.id)}
        style={styles.doneButton}
      >
        Mark as Done
      </Button>
    )}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  info: { flex: 1, paddingRight: 12 },
  type: { fontSize: 14, fontWeight: "700", color: Colors.text },
  detail: { fontSize: 12, color: Colors.textLight },
  addOn: { fontSize: 12, color: Colors.text, marginTop: 4 },
  addOnLabel: { fontWeight: "700" },
  doneButton: { borderRadius: 6 },
  doneBlock: { alignItems: "flex-end" },
  doneRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  doneLabel: { color: Colors.badgeComplete, fontWeight: "700", fontSize: 13 },
  timeFinished: { fontSize: 11, color: Colors.textLight, marginTop: 2 },
});

export default JobTypeRow;
