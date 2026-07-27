import { MD3LightTheme } from "react-native-paper";
import Colors from "./Colors";

const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
  },
};

export default LightTheme;
