import React from "react";
import { View } from "react-native";
import { Button, Text, useTheme, TextInput } from "react-native-paper";

export const Home = () => {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.ctt }}>
      <Text style={{ color: "white" }} >Hello Home</Text>
      <TextInput placeholder="Teste" />
      <Button icon="login" mode="contained">Teste</Button>
    </View>
  );
};