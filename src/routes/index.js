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

/*
  Text: 14
  Title: 20
  heading: 24
*/

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
      text: "#141A28",
      error: "#F0424C",
      primary: "#F0424C",
      success: "#10B278",
      surface: "#DCDCE0",
      warning: "#F8A700",
      secondary: "#286EF5",
      onSurface: "#DCDCE0",
      background: "#EDEDED",
      placeholder: "#141A2850",
      semiTransparent: "#141A2850",
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
      text: "#EDEDED",
      error: "#F0424C",
      primary: "#F0424C",
      success: "#10B278",
      surface: "#141A28",
      warning: "#F8A700",
      secondary: "#286EF5",
      onSurface: "#DCDCE0",
      background: "#27314A",
      placeholder: "#EDEDED50",
      semiTransparent: "#EDEDED50",

      // accent: "#F0424C",
      // border: "#F0424C",
      // outline: "#F0424C",
      // backdrop: "#F0424C",
      // disabled: "#F0424C",
      // onSurface: "#F0424C",
      // notification: "#F0424C",
      // onSurfaceVariant: "#F0424C",
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