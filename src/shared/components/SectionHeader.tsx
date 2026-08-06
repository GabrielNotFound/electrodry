import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/Colors";

interface SectionHeaderProps {
  title: string;
  icon?: string;
  rightAction?: React.ReactNode;
}

const SectionHeader = ({ title, icon, rightAction }: SectionHeaderProps) => (
  <View style={styles.header}>
    <View style={styles.left}>
      {icon && <Icon name={icon} size={20} color={Colors.background} />}
      <Text style={styles.title}>{title}</Text>
    </View>
    {rightAction}
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default SectionHeader;
