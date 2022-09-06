import { StatusBar, SafeAreaView, useColorScheme } from "react-native";
import { DefaultTheme, configureFonts, Provider as PaperProvider } from "react-native-paper";
import {
  useFonts,
  WorkSans_100Thin,
  WorkSans_700Bold,
  WorkSans_300Light,
  WorkSans_500Medium,
  WorkSans_400Regular,
} from '@expo-google-fonts/work-sans';

import { Home } from "./src/screens";

const customFonts = {
  thin: { fontFamily: "WorkSans_100Thin", fontWeight: "normal" },
  light: { fontFamily: "WorkSans_300Light", fontWeight: "normal" },
  medium: { fontFamily: "WorkSans_500Medium", fontWeight: "normal" },
  regular: { fontFamily: "WorkSans_400Regular", fontWeight: "normal" },
}

const fontConfig = {
  default: customFonts,
  web: customFonts,
  ios: customFonts,
  android: customFonts
};

const theme = {
  light: {
    ...DefaultTheme,
    roundness: 2,
    fonts: configureFonts(fontConfig.android),
    colors: {
      ...DefaultTheme.colors,
      background: "#DCDCE0",
      surface: "#C0CDDF",
      primary: "#FF7E33",
      secondary: "#9633FF",
      success: "#00A65A",
      error: "#DD4B39",
      warning: "#DA8C10"
    }
  },
  dark: {
    ...DefaultTheme,
    roundness: 2,
    fonts: configureFonts(fontConfig),
    colors: {
      ...DefaultTheme.colors,
      background: "#191A1F",
      surface: "#262A35",
      primary: "#FF7E33",
      secondary: "#9633FF",
      success: "#00A65A",
      error: "#DD4B39",
      warning: "#DA8C10"
    }
  },
};

export default function App() {
  const colorSchema = useColorScheme();

  let [fontsLoaded] = useFonts({
    WorkSans_100Thin,
    WorkSans_700Bold,
    WorkSans_300Light,
    WorkSans_500Medium,
    WorkSans_400Regular,
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
