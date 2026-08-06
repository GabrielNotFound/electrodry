import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Colors from "../constants/Colors";

interface StatusBadgeProps {
  label: string;
  color: string;
}

const StatusBadge = ({ label, color }: StatusBadgeProps) => (
  <View style={[styles.badge, { backgroundColor: color }]}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  text: {
    color: Colors.background,
    fontWeight: "600",
    fontSize: 13,
  },
});

export default StatusBadge;
