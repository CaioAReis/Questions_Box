import { Appearance, StatusBar, SafeAreaView, useColorScheme } from "react-native";
import { DefaultTheme, configureFonts, Provider as PaperProvider, useTheme } from "react-native-paper";
import {
  useFonts,
  WorkSans_100Thin,
  WorkSans_700Bold,
  WorkSans_300Light,
  WorkSans_500Medium,
  WorkSans_400Regular,
} from '@expo-google-fonts/work-sans';

import { Home } from "./src/screens";

const fontConfig = {
  ios: {
    thin: { fontFamily: "WorkSans_100Thin", fontWeight: "normal" },
    light: { fontFamily: "WorkSans_300Light", fontWeight: "normal" },
    medium: { fontFamily: "WorkSans_500Medium", fontWeight: "normal" },
    regular: { fontFamily: "WorkSans_400Regular", fontWeight: "normal" },
  },
  android: {
    thin: { fontFamily: "WorkSans_100Thin", fontWeight: "normal" },
    light: { fontFamily: "WorkSans_300Light", fontWeight: "normal" },
    medium: { fontFamily: "WorkSans_500Medium", fontWeight: "normal" },
    regular: { fontFamily: "WorkSans_400Regular", fontWeight: "normal" },
  }
}

const light = {
  ...DefaultTheme,
  roundness: 2,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    background:"#DCDCE0",
    surface: "#C0CDDF",
    primary: "#FF7E33",
    secondary: "#9633FF",
    success: "#00A65A",
    error: "#DD4B39",
    warning: "#DA8C10"
  }
};

const dark = {
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
    <PaperProvider theme={colorSchema === "dark" ? dark : light}>
      <SafeAreaView style={{ width: "100%", flex: 1, backgroundColor: colorSchema === "dark" ? dark.colors.background : light.colors.background}} >
        <StatusBar backgroundColor={colorSchema === "dark" ? dark.colors.background : light.colors.background} barStyle={colorSchema === "dark" ? "light-content" : "dark-content"} />
        <Home />
      </SafeAreaView>
    </PaperProvider>
  );
}
