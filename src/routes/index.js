import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthRoutes, SessionRoutes } from "./stack.routes";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

const RootRoutes = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async () => {
      const value = await AsyncStorage.getItem('QB@user_session_key');
      setSession(JSON.parse(value));
    }
  });

  return (
    <Stack.Navigator initialRouteName={!Boolean(session) ? "AuthRoutes" : "SessionRoutes"} screenOptions={{ headerShown: false }} >
      <Stack.Screen name="AuthRoutes" component={AuthRoutes} />
      <Stack.Screen name="SessionRoutes" component={SessionRoutes} />
    </Stack.Navigator>
  );
};

export default RootRoutes;