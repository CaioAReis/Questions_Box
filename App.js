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

import { Home } from "./src/screens";

const _customFonts = {
  regular: { fontFamily: "WorkSans_400Regular" },
  medium: { fontFamily: "WorkSans_500Medium" },
  light: { fontFamily: "WorkSans_300Light" },
  thin: { fontFamily: "WorkSans_100Thin" },
}

const fontConfig = {
  web: _customFonts,
  ios: _customFonts,
  android: _customFonts,
  default: _customFonts,
};

const theme = {
  "light": {
    ...DefaultTheme,
    roundness: 2,
    font: configureFonts(fontConfig),
    typescale: {
      bodyLarge: { ...DefaultTheme.typescale.bodyLarge, ..._customFonts.regular },
      bodyMedium: { ...DefaultTheme.typescale.bodyMedium, ..._customFonts.regular },
      bodySmall: { ...DefaultTheme.typescale.bodySmall, ..._customFonts.regular },
      displayLarge: { ...DefaultTheme.typescale.displayLarge, ..._customFonts.regular },
      displayMedium: { ...DefaultTheme.typescale.displayMedium, ..._customFonts.regular },
      displaySmall: { ...DefaultTheme.typescale.displaySmall, ..._customFonts.regular },
      headlineLarge: { ...DefaultTheme.typescale.headlineLarge, ..._customFonts.regular },
      headlineMedium: { ...DefaultTheme.typescale.headlineMedium, ..._customFonts.regular },
      headlineSmall: { ...DefaultTheme.typescale.headlineSmall, ..._customFonts.regular },
      labelLarge: { ...DefaultTheme.typescale.labelLarge, ..._customFonts.medium },
      labelMedium: { ...DefaultTheme.typescale.labelMedium, ..._customFonts.medium },
      labelSmall: { ...DefaultTheme.typescale.labelSmall, ..._customFonts.medium },
      titleLarge: { ...DefaultTheme.typescale.titleLarge, ..._customFonts.regular },
      titleMedium: { ...DefaultTheme.typescale.titleMedium, ..._customFonts.medium },
      titleSmall: { ...DefaultTheme.typescale.titleSmall, ..._customFonts.medium },
    },
    colors: {
      ...DefaultTheme.colors,
      background: "#DCDCE0",
      surface: "#C0CDDF",
      primary: "#FF7E33",
      secondary: "#9633FF",
      success: "#00A65A",
      error: "#DD4B39",
      warning: "#DA8C10",
      text: "#191A1F",
    }
  },
  "dark": {
    ...DefaultTheme,
    roundness: 1,
    fonts: configureFonts(fontConfig),
    
    colors: {
      ...DefaultTheme.colors,
      background: "#191A1F",
      surface: "#262A35",
      primary: "#FF7E33",
      secondary: "#9633FF",
      success: "#00A65A",
      error: "#DD4B39",
      warning: "#DA8C10",
      text: "#DCDCE0",

      placeholder: "red",
      underlineColor: "red"
    },
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
        <Home />
      </SafeAreaView>
    </PaperProvider>
  );
}
