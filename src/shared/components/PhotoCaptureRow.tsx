import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/Colors";

interface PhotoCaptureRowProps {
  title: string;
  description: string;
  onPress: () => void;
}

const PhotoCaptureRow = ({
  title,
  description,
  onPress,
}: PhotoCaptureRowProps) => (
  <View style={styles.row}>
    <View style={styles.textBlock}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <TouchableOpacity style={styles.cameraButton} onPress={onPress}>
      <Icon name="camera" size={22} color={Colors.background} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  textBlock: { flex: 1, paddingRight: 12 },
  title: { fontSize: 15, fontWeight: "700", color: Colors.text },
  description: { fontSize: 13, color: Colors.textLight, marginTop: 2 },
  cameraButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PhotoCaptureRow;
