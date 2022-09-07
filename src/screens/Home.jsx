import React from "react";
import { View } from "react-native";
import { Button, Text, useTheme, TextInput } from "react-native-paper";

export const Home = (props) => {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.surface, padding: 20 }}>

      {/* <Text style={{ color: "white", fontFamily: "WorkSans_400Regular" }} >Com a fonte ll</Text> */}
      <Text style={{ color: colors.text, fontFamily: "WorkSans_700Bold", }} >Sem a fonte ll</Text>

      <TextInput
        label="teste"
        placeholderTextColor="white"
        outlineColor={colors.text}
        style={{ marginBottom: 20, backgroundColor: colors.surface }}
        mode="outlined"
        placeholder="Teste ll"
      />

      <TextInput
        label="teste"
        placeholderTextColor="white"
        outlineColor={colors.text}
        style={{ marginBottom: 20 }}
        mode="outlined"
        placeholder="Teste ll"
      />


      <Button labelStyle={{ fontFamily: "WorkSans_700Bold" }} icon="login" mode="contained">Teste ll</Button>
    </View>
  );
};