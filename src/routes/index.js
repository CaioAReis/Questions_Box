import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthRoutes, SessionRoutes } from "./stack.routes";

const Stack = createNativeStackNavigator();

const RootRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Cadastro" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="AuthRoutes" component={AuthRoutes} />
      <Stack.Screen name="SessionRoutes" component={SessionRoutes} />
    </Stack.Navigator>
  );
};

export default RootRoutes;