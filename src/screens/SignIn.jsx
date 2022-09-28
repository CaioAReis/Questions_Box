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

export const SignIn = ({ navigation }) => {
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
        <Title style={{ ...fonts.regular, fontSize: 18 / ratio }}>Faça o login para continuar!</Title>
      </View>

      <View style={styles.main}>
        <TextInput
          label="E-mail"
          mode="outlined"
          style={{ marginBottom: 10 }}
          theme={{ colors: { background: colors.surface, primary: colors.secondary } }}
        />

        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry={true}
          style={{ marginBottom: 35 }}
          theme={{ colors: { background: colors.surface, primary: colors.secondary } }}
        />

        <Button onPress={() => navigation.navigate("SessionRoutes")} contentStyle={{ height: 45 }} icon="login" mode="contained">Entrar</Button>

        <View style={styles.orView}>
          <Text style={{ marginHorizontal: 20, fontSize: 14 / ratio }}>Ou entre com</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <IconButton size={40} icon="google" color="#E73B31" onPress={() => console.log("Google")} />
          <IconButton size={40} icon="facebook" color="#4A72B7" onPress={() => console.log("Facebook")} />
          <IconButton size={40} icon="github" color={colors.text} onPress={() => console.log("GitHub")} />
        </View>

        <Text style={{ textAlign: "center", marginTop: 30, fontSize: 14 / ratio }}>Não possui conta? <Text onPress={() => navigation.navigate("SignUp")} style={{ ...fonts.medium, ...styles.title, color: colors.primary, fontSize: 14 / ratio }}>CADASTRE-SE</Text>!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 2,
    padding: 20,
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
    justifyContent: "center",
  }
});