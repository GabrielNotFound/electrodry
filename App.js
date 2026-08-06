import { PaperProvider } from "react-native-paper";
import ApplicationNavigator from "./src/navigation/ApplicationNavigator";
import LightTheme from "./src/shared/constants/Theme";

const App = () => {
  return (
    <PaperProvider theme={LightTheme}>
      <ApplicationNavigator />
    </PaperProvider>
  );
};

export default App;
