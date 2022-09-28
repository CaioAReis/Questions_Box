import React from "react";
import { View, StyleSheet, ScrollView, Image, PixelRatio } from "react-native";
import {
  Text,
  Title,
  Button,
  useTheme,
  TextInput,
  IconButton,
} from "react-native-paper";

const ratio = PixelRatio.getFontScale();

export const SignUp = ({ navigation }) => {
  const { colors, fonts, logos } = useTheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 20, flex: 1, justifyContent: "flex-end" }}>
        <IconButton
          size={40}
          color={colors.text}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />

        <View style={{ alignItems: "center" }}>
          <Image source={logos[1]} resizeMode="contain" style={{ marginVertical: 20, width: 120, height: 120 }} />
        </View>
        <Title style={{ ...fonts.regular, fontSize: 18 / ratio }}>Faça já seu cadastro!</Title>
      </View>

      <View style={{ ...styles.main }}>
        <TextInput
          mode="outlined"
          label="Nome completo"
          style={{ marginBottom: 10 }}
          theme={{ colors: { background: colors.surface, primary: colors.text } }}
        />

        <TextInput
          label="E-mail"
          mode="outlined"
          style={{ marginBottom: 10 }}
          theme={{ colors: { background: colors.surface, primary: colors.text } }}
        />

        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry={true}
          style={{ marginBottom: 35 }}
          theme={{ colors: { background: colors.surface, primary: colors.text } }}
        />

        <Button contentStyle={{ height: 45 }} icon="account-arrow-right" mode="contained">Criar conta</Button>

        <View style={styles.orView}>
          <View style={{ ...styles.line, backgroundColor: colors.semiTransparent }} />
          <Text style={{ marginHorizontal: 20, fontSize: 14 / ratio }}>Ou entre com</Text>
          <View style={{ ...styles.line, backgroundColor: colors.semiTransparent }} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <IconButton size={40} icon="google" color="#E73B31" onPress={() => console.log("Google")} />
          <IconButton size={40} icon="facebook" color="#4A72B7" onPress={() => console.log("Facebook")} />
          <IconButton size={40} icon="github" color={colors.text} onPress={() => console.log("GitHub")} />
        </View>

        <Text style={{ textAlign: "center", marginTop: 30, fontSize: 14 / ratio }}>Já possui conta? Faça o <Text onPress={() => navigation.navigate("SignIn")} style={{ ...fonts.medium, ...styles.title, color: colors.primary, fontSize: 14 / ratio }}>LOGIN</Text>!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 2,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 2,
    borderRadius: 2,
  },
  orView: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
  }
});