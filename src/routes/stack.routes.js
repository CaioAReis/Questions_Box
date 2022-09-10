import { createNativeStackNavigator } from "@react-navigation/native-stack";

//  Auth routes
import { SignIn, SignUp } from "../screens/stack"; 

const Stack = createNativeStackNavigator();

export const AuthRoutes = () => (
  <Stack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);