import Colors from "@/src/shared/constants/Colors";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface PhotoReviewScreenProps {
  photoUri: string;
  onBack?: () => void;
  onOpenGallery?: () => void;
  onTakeAnother?: () => void;
  onSubmit?: () => void;
}

const PhotoReviewScreen = ({
  photoUri,
  onBack,
  onOpenGallery,
  onTakeAnother,
  onSubmit,
}: PhotoReviewScreenProps) => (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <View style={styles.headerRow}>
      <Icon name="arrow-left" size={22} color={Colors.text} onPress={onBack} />
      <Icon
        name="image-multiple-outline"
        size={22}
        color={Colors.primary}
        onPress={onOpenGallery}
      />
    </View>

    <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />

    <View style={styles.buttonRow}>
      <Button
        mode="outlined"
        textColor={Colors.primary}
        style={styles.button}
        onPress={onTakeAnother}
      >
        Take Another Photo
      </Button>
      <Button
        mode="contained"
        buttonColor={Colors.primary}
        style={styles.button}
        onPress={onSubmit}
      >
        Submit
      </Button>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  photo: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  buttonRow: { flexDirection: "row", gap: 12 },
  button: { flex: 1, borderRadius: 8 },
});

export default PhotoReviewScreen;
