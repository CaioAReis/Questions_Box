import React from "react";
import { View } from "react-native";
import { Button, Text, useTheme, TextInput } from "react-native-paper";

export const Home = () => {
  const { colors, fonts } = useTheme();

  return (
    <View style={{ backgroundColor: colors.ctt }}>

      <Text style={{ color: "white", fontFamily: "WorkSans_400Regular" }} >Com a fonte ll</Text>
      <Text style={{ color: "white" }} >Sem a fonte ll</Text>
      <TextInput placeholder="Teste ll" />
      <Button icon="login" mode="contained">Teste ll</Button>
    </View>
  );
};