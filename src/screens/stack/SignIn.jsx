import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

import Logo from "../../../assets/Logo.png";

export const SignIn = () => {

  const { colors, fonts } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>

      <View style={{ alignItems: "center", flex: 1 }}>
        <Image resizeMode="contain" source={Logo} style={{ width: 200, height: 200 }} />
      </View>


      <View style={{ ...styles.main, backgroundColor: colors.surface }}>

        <TextInput
          mode="outlined"
          label="E-mail"
          style={{ marginBottom: 15 }}
          theme={{ colors: { background: colors.background } }}
        />

        <TextInput
          mode="outlined"
          label="Senha"
          theme={{ colors: { background: colors.surface } }}
          style={{ marginBottom: 40 }}
        />

        <Button contentStyle={{ height: 55 }} labelStyle={{ fontWeight: "bold" }} icon="login" mode="contained">Teste ll</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  main: {
    height: "70%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 40,
  }
});