import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/Colors";

export type ConfirmationVariant = "question" | "success";

interface ConfirmationModalProps {
  visible: boolean;
  variant?: ConfirmationVariant;
  title: string;
  description: string;
  primaryLabel: string;
  onPrimaryPress: () => void;
  secondaryLabel?: string;
  onSecondaryPress?: () => void;
  onDismiss?: () => void;
}

const ConfirmationModal = ({
  visible,
  variant = "question",
  title,
  description,
  primaryLabel,
  onPrimaryPress,
  secondaryLabel,
  onSecondaryPress,
  onDismiss,
}: ConfirmationModalProps) => {
  const isSuccess = variant === "success";

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <View
          style={[styles.iconCircle, isSuccess && styles.iconCircleSuccess]}
        >
          <Icon
            name={isSuccess ? "check-circle" : "help"}
            size={28}
            color={Colors.background}
          />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.buttonRow}>
          {secondaryLabel && (
            <Button
              mode="outlined"
              onPress={onSecondaryPress}
              textColor={Colors.primary}
              style={styles.button}
            >
              {secondaryLabel}
            </Button>
          )}
          <Button
            mode="contained"
            onPress={onPrimaryPress}
            buttonColor={Colors.primary}
            style={styles.button}
          >
            {primaryLabel}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    marginHorizontal: 32,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconCircleSuccess: {
    backgroundColor: Colors.badgeComplete,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    borderRadius: 8,
    minWidth: 110,
  },
});

export default ConfirmationModal;

//Example of Usage if ever you will use, i placed it here for easier access hehehe

{
  /*
    if double button option
<ConfirmationModal
  visible={showMarkDone}
  title="Mark as Done?"
  description="Are you sure you want to mark this service as done?"
  secondaryLabel="Cancel"
  onSecondaryPress={() => setShowMarkDone(false)}
  primaryLabel="Confirm"
  onPrimaryPress={handleConfirmDone}
/>

    if single button
<ConfirmationModal
  visible={showSuccess}
  variant="success"
  title="Job Completed Successfully"
  description="The job has been finished successfully"
  primaryLabel="Close"
  onPrimaryPress={() => setShowSuccess(false)}
/> 
*/
}
