import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Colors from "../../../shared/constants/Colors";
import { navigateAndSimpleReset } from "../../../shared/utils/NavigationService";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [franchiseId, setFranchiseId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    // TODO: replace with real auth call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigateAndSimpleReset("BookingListScreen");
    }, 400);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Image
          source={require("../../../../assets/electrodry-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        /> */}

        <Text style={styles.title}>Sign In to your Account</Text>
        <Text style={styles.subtitle}>
          Welcome back enter you correct credentials to Sign In
        </Text>

        <TextInput
          mode="outlined"
          label="Username"
          value={username}
          onChangeText={setUsername}
          left={<TextInput.Icon icon="account-outline" />}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          left={<TextInput.Icon icon="lock-outline" />}
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Franchise ID"
          value={franchiseId}
          onChangeText={setFranchiseId}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSignIn}
          loading={loading}
          disabled={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
          buttonColor={Colors.primary}
        >
          Sign In
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  logo: {
    width: 280,
    height: 140,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textLight,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    maxWidth: 480,
    marginBottom: 16,
    backgroundColor: Colors.background,
  },
  button: {
    width: "100%",
    maxWidth: 480,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 6,
  },
});

export default LoginScreen;
