import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { configureFonts, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, DefaultTheme as NavigateDefaultTheme } from "@react-navigation/native";
import {
  useFonts,WorkSans_100Thin, WorkSans_700Bold, WorkSans_300Light, WorkSans_500Medium, WorkSans_400Regular,
} from '@expo-google-fonts/work-sans';

import { AuthRoutes, SessionRoutes } from "./stack.routes";

// Logos
import LogoMain from "../../assets/LogoMain.png";
import LogoMainWhite from "../../assets/LogoMainWhite.png";
import Logo2 from "../../assets/Logo2.png";
import Logo2White from "../../assets/Logo2White.png";
import LogoH from "../../assets/LogoH.png";
import LogoHWhite from "../../assets/LogoHWhite.png";

const Stack = createNativeStackNavigator();

const _defaultFonts = {
  regular: { fontFamily: "WorkSans_400Regular" },
  medium: { fontFamily: "WorkSans_500Medium" },
  light: { fontFamily: "WorkSans_300Light" },
  thin: { fontFamily: "WorkSans_100Thin" },
  bold: { fontFamily: "WorkSans_700Bold" }
}

const theme = {
  "light": {
    ...DefaultTheme,
    ...NavigateDefaultTheme,
    roundness: 8,
    dark: false,
    logos: {
      1: LogoMain,
      2: Logo2,
      3: LogoH,
    },
    colors: {
      ...DefaultTheme.colors,
      ...NavigateDefaultTheme.colors,
      text: "#191A1F",
      error: "#DD4B39",
      surface: "#FFFFFF",
      primary: "#191A1F",
      success: "#00A65A",
      warning: "#DA8C10",
      secondary: "#9633FF",
      outline: "#191A1F50",
      onSurface: "#191A1F",
      background: "#ededed",
      placeholder: "#191A1F",
      semiWhite: "#191A1F50",
      onSurfaceVariant: "#191A1F80",
    },
    fonts: configureFonts({
      web: _defaultFonts,
      ios: _defaultFonts,
      android: _defaultFonts,
    }),
  },
  "dark": {
    ...DefaultTheme,
    ...NavigateDefaultTheme,
    dark: true,
    roundness: 8,
    logos: {
      1: LogoMainWhite,
      2: Logo2White,
      3: LogoHWhite,
    },
    colors: {
      ...DefaultTheme.colors,
      ...NavigateDefaultTheme.colors,
      text: "#DCDCE0",
      error: "#DD4B39",
      primary: "#5ea0e6",
      success: "#00A65A",
      surface: "#141A28",
      warning: "#DA8C10",
      secondary: "#9633FF",
      onSurface: "#DCDCE0",
      background: "#27314A",
      // background: "#141A28",
      outline: "#DCDCE050",
      semiTransparent: "#DCDCE030",
      placeholder: "#DCDCE080",
      onSurfaceVariant: "#DCDCE080",
    },
    fonts: configureFonts({
      web: _defaultFonts,
      ios: _defaultFonts,
      android: _defaultFonts,
    }),
  },
};

const RootRoutes = () => {
  const colorSchema = useColorScheme();

  let [fontsLoaded] = useFonts({
    WorkSans_100Thin, WorkSans_700Bold, WorkSans_300Light, WorkSans_500Medium, WorkSans_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <PaperProvider theme={theme[colorSchema]}>
      <NavigationContainer theme={theme[colorSchema]}>
        <SafeAreaView style={{ width: "100%", flex: 1, backgroundColor: theme[colorSchema].colors.background }} >
          <StatusBar backgroundColor={theme[colorSchema].colors.background} barStyle={colorSchema === "dark" ? "light-content" : "dark-content"} />
          <Stack.Navigator initialRouteName="Cadastro" screenOptions={{ headerShown: false }} >
            
            <Stack.Screen name="AuthRoutes" component={AuthRoutes} />
            <Stack.Screen name="SessionRoutes" component={SessionRoutes} />

          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootRoutes;