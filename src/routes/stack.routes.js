import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn, SignUp, Welcome, Home, Tags, ListForTag, Profile, QuestionDetails } from "../screens";

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
    <Stack.Screen name="Tags" component={Tags} />
    <Stack.Screen name="ListForTag" component={ListForTag} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="QuestionDetails" component={QuestionDetails} />
  </Stack.Navigator>
);