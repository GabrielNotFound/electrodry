import { StyleSheet, View, ViewStyle } from "react-native";
import Colors from "../constants/Colors";

interface SectionCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const SectionCard = ({ children, style }: SectionCardProps) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
});

export default SectionCard;
