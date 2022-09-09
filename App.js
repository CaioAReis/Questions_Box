import { StatusBar, SafeAreaView, useColorScheme } from "react-native";
import { configureFonts, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  useFonts,
  WorkSans_100Thin,
  WorkSans_700Bold,
  WorkSans_300Light,
  WorkSans_500Medium,
  WorkSans_400Regular,
} from '@expo-google-fonts/work-sans';

import { SignIn, SignUp } from "./src/screens/stack";

const _defaultFonts = {
  regular: { fontFamily: "WorkSans_400Regular" },
  medium: { fontFamily: "WorkSans_500Medium" },
  light: { fontFamily: "WorkSans_300Light" },
  thin: { fontFamily: "WorkSans_100Thin" },
  bold: { fontFamily: "WorkSans_700Bold" }
}

const fontConfig = {
  web: _defaultFonts,
  ios: _defaultFonts,
  android: _defaultFonts,
}

const theme = {
  "light": {
    ...DefaultTheme,
    roundness: 8,
    isV3: false,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      text: "#191A1F",
      error: "#DD4B39",
      surface: "#DCDCE0",
      primary: "#191A1F",
      success: "#00A65A",
      warning: "#DA8C10",
      secondary: "#9633FF",
      outline: "#191A1F50",
      onSurface: "#191A1F",
      background: "#c3c8d0",
      placeholder: "#191A1F",
      semiWhite: "#191A1F50",
      onSurfaceVariant: "#191A1F80",
    },
    fonts: configureFonts(fontConfig),
  },
  "dark": {
    ...DefaultTheme,
    dark: true,
    roundness: 8,
    colors: {
      ...DefaultTheme.colors,
      text: "#DCDCE0",
      error: "#DD4B39",
      primary: "#DCDCE0",
      success: "#00A65A",
      surface: "#262A35",
      warning: "#DA8C10",
      secondary: "#9633FF",
      onSurface: "#DCDCE0",
      background: "#191A1F",
      outline: "#DCDCE050",
      semiWhite: "#DCDCE050",
      placeholder: "#DCDCE080",
      onSurfaceVariant: "#DCDCE080",

      // tertiary: "rgba(125, 82, 96, 1)",
      // onError: "rgba(255, 255, 255, 1)",
      // onBackground: "rgba(28, 27, 31, 1)",
      // onPrimary: "rgba(255, 255, 255, 1)",
      // onTertiary: "rgba(255, 255, 255, 1)",
      // inverseSurface: "rgba(49, 48, 51, 1)",
      // onSecondary: "rgba(255, 255, 255, 1)",
      // onErrorContainer: "rgba(65, 14, 11, 1)",
      // errorContainer: "rgba(249, 222, 220, 1)",
      // inversePrimary: "rgba(208, 188, 255, 1)",
      // onPrimaryContainer: "rgba(33, 0, 93, 1)",
      // surfaceVariant: "rgba(231, 224, 236, 1)",
      // surfaceDisabled: "rgba(28, 27, 31, 0.12)",
      // onTertiaryContainer: "rgba(49, 17, 29, 1)",
      // inverseOnSurface: "rgba(244, 239, 244, 1)",
      // primaryContainer: "rgba(234, 221, 255, 1)",
      // onSecondaryContainer: "rgba(29, 25, 43, 1)",
      // onSurfaceDisabled: "rgba(28, 27, 31, 0.38)",
      // tertiaryContainer: "rgba(255, 216, 228, 1)",
      // secondaryContainer: "rgba(232, 222, 248, 1)",
    },
    fonts: configureFonts(fontConfig),
  },
};

export default function App() {
  const colorSchema = useColorScheme();

  let [fontsLoaded] = useFonts({
    WorkSans_100Thin, WorkSans_700Bold, WorkSans_300Light, WorkSans_500Medium, WorkSans_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <PaperProvider theme={theme[colorSchema]}>
      <SafeAreaView style={{ width: "100%", flex: 1, backgroundColor: theme[colorSchema].colors.background }} >
        <StatusBar backgroundColor={theme[colorSchema].colors.background} barStyle={colorSchema === "dark" ? "light-content" : "dark-content"} />
        {/* <SignIn /> */}
        <SignUp />
      </SafeAreaView>
    </PaperProvider>
  );
}
