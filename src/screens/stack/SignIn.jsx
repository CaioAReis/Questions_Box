import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Headline, IconButton, Paragraph, Surface, Text, TextInput, useTheme } from "react-native-paper";

import Logo from "../../../assets/Logo.png";

export const SignIn = () => {

  const { colors, fonts } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>

      <View style={{ padding: 20, flex: 1, justifyContent: "flex-end" }}>
        <IconButton
          size={40}
          color={colors.primary}
          icon="arrow-left-circle-outline"
          onPress={() => console.log('Pressed')}
          style={{ position: "absolute", top: 10 }}
        />
        <Headline style={{ ...fonts.medium, color: colors.primary }}>Seja muito bem vindo!</Headline>
        <Paragraph style={{ ...fonts.light }}>Faça o login para continuar</Paragraph>
      </View>

      <Surface style={styles.main}>
        <TextInput
          label="E-mail"
          mode="outlined"
          style={{ marginBottom: 15 }}
          theme={{ colors: { background: colors.surface } }}
        />

        <TextInput
          label="Senha"
          mode="outlined"
          style={{ marginBottom: 25 }}
          theme={{ colors: { background: colors.surface } }}
        />

        <Button contentStyle={{ height: 45 }} labelStyle={{ fontWeight: "bold" }} icon="login" mode="contained">Entrar</Button>

        <View style={styles.orView}>
          <View style={{ ...styles.line, backgroundColor: colors.semiWhite }} />
          <Text style={{ marginHorizontal: 20 }}>OU</Text>
          <View style={{ ...styles.line, backgroundColor: colors.semiWhite }} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button uppercase={false} color="#E73B31" icon="google" mode="contained" style={{ flex: 1 }}>Google</Button>
          <View style={{ width: "3%" }} />
          <Button uppercase={false} color="#4A72B7" style={{ flex: 1 }} icon="facebook" mode="contained">Facebook</Button>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  main: {
    flex: 2,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 2,
    borderRadius: 2,
  },
  orView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 40,
  }
});