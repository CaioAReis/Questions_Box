import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn, SignUp, Welcome, Home } from "../screens/stack";

const Stack = createNativeStackNavigator();

//  Auth routes
export const AuthRoutes = () => (
  <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Welcome" component={Welcome} />
  </Stack.Navigator>
);

//  Session routes
export const SessionRoutes = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);