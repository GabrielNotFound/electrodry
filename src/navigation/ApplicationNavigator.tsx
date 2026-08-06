import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "../features/auth/screens/LoginScreen";
import BookingDetailsScreen from "../features/bookings/screens/BookingDetailsScreen";
import BookingListScreen from "../features/bookings/screens/BookingListScreen";
import JobDetailsScreen from "../features/inspections/screens/JobDetailsScreen";
import OHSAssessmentScreen from "../features/inspections/screens/OHSAssessmentScreen";
import PhotoReviewScreen from "../features/inspections/screens/PhotoReviewScreen";
import PreInspectionAnalysisScreen from "../features/inspections/screens/PreInspectionAnalysisScreen";
import PaymentScreen from "../features/payments/screens/PaymentScreen";
import LightTheme from "../shared/constants/Theme";
import {
  navigate,
  navigateBack,
  navigationRef,
} from "../shared/utils/NavigationService";

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

            <Stack.Screen name="BookingDetailsScreen">
              {() => (
                <BookingDetailsScreen
                  onBack={navigateBack}
                  onCollectPayment={() => navigate("PaymentScreen")}
                  onRevertJob={navigateBack}
                  onJobPhotos={() => navigate("PreInspectionAnalysisScreen")}
                  onStartQuotedJob={() => navigate("JobDetailsScreen")}
                  onStartPreInspection={() => navigate("OHSAssessmentScreen")}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="JobDetailsScreen">
              {() => (
                <JobDetailsScreen
                  onBack={navigateBack}
                  onViewQuoteForm={() => {}}
                  onSave={navigateBack}
                  onProceedToPayment={() => navigate("PaymentScreen")}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="PreInspectionAnalysisScreen">
              {() => (
                <PreInspectionAnalysisScreen
                  onBack={navigateBack}
                  onTakePhoto={() => navigate("PhotoReviewScreen")}
                  onViewPhoto={() => navigate("PhotoReviewScreen")}
                  onNext={() => navigate("OHSAssessmentScreen")}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="PhotoReviewScreen">
              {() => (
                <PhotoReviewScreen
                  photoUri=""
                  onBack={navigateBack}
                  onOpenGallery={() => {}}
                  onTakeAnother={navigateBack}
                  onSubmit={navigateBack}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="OHSAssessmentScreen">
              {() => (
                <OHSAssessmentScreen
                  onBack={navigateBack}
                  onStartJob={() => navigate("JobDetailsScreen")}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="PaymentScreen">
              {() => (
                <PaymentScreen
                  onBack={navigateBack}
                  onFinishJob={() => navigate("BookingListScreen")}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
