import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "../features/auth/screens/LoginScreen";
import BookingListScreen from "../features/bookings/screens/BookingListScreen";
import LightTheme from "../shared/constants/Theme";
import { navigationRef } from "../shared/utils/NavigationService";

const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={LightTheme}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="BookingListScreen"
              component={BookingListScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
