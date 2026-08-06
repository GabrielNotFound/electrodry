import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/Colors";

interface PhotoListItemProps {
  label: string;
  onView: () => void;
}

const PhotoListItem = ({ label, onView }: PhotoListItemProps) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity onPress={onView}>
      <Icon name="eye-outline" size={20} color={Colors.primary} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  label: { fontSize: 14, color: Colors.text },
});

export default PhotoListItem;
