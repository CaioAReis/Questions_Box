import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Button,
  Surface,
  Headline,
  useTheme,
  Paragraph,
  TextInput,
  IconButton,
} from "react-native-paper";

export const SignUp = () => {
  const { colors, fonts } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={{ marginBottom: 20, padding: 20, flex: 1, justifyContent: "flex-end" }}>
        <IconButton
          size={40}
          color={colors.primary}
          style={{ marginBottom: 40 }}
          icon="arrow-left-circle-outline"
          onPress={() => console.log('Pressed')}
        />
        <Headline style={{ ...fonts.medium, color: colors.primary }}>Cadastre-se já!</Headline>
        <Paragraph style={{ ...fonts.light }}>Preencha os campos abaixo!</Paragraph>
      </View>

      <Surface style={styles.main}>
        <TextInput
          mode="outlined"
          label="Nome completo"
          style={{ marginBottom: 10 }}
          theme={{ colors: { background: colors.surface } }}
        />

        <TextInput
          label="E-mail"
          mode="outlined"
          style={{ marginBottom: 10 }}
          theme={{ colors: { background: colors.surface } }}
        />

        <TextInput
          mode="outlined"
          label="Telefone"
          style={{ marginBottom: 10 }}
          theme={{ colors: { background: colors.surface } }}
        />

        <TextInput
          label="Senha"
          mode="outlined"
          style={{ marginBottom: 35 }}
          theme={{ colors: { background: colors.surface } }}
        />

        <Button contentStyle={{ height: 45 }} labelStyle={{ fontWeight: "bold" }} icon="login" mode="contained">Entrar</Button>

        <View style={styles.orView}>
          <View style={{ ...styles.line, backgroundColor: colors.semiWhite }} />
          <Text style={{ marginHorizontal: 20 }}>OU</Text>
          <View style={{ ...styles.line, backgroundColor: colors.semiWhite }} />
        </View>

        <Button contentStyle={{ height: 45 }} uppercase={false} color="#E73B31" icon="google" mode="contained">Google</Button>
        <Button contentStyle={{ height: 45 }} uppercase={false} color="#4A72B7" style={{ marginTop: 20 }} icon="facebook" mode="contained">Facebook</Button>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 3,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopRightRadius: 20, borderTopLeftRadius: 20,
  },
  line: {
    flex: 1,
    height: 2,
    borderRadius: 2,
  },
  orView: {
    marginVertical: 40,
    alignItems: "center",
    flexDirection: "row",
  }
});