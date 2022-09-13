import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Button,
  Headline,
  useTheme,
  Paragraph,
  TextInput,
  IconButton,
} from "react-native-paper";

export const SignIn = ({ navigation }) => {
  const { colors, fonts } = useTheme();

  return (
    <ScrollView>
      <View style={{ padding: 20, flex: 1, justifyContent: "flex-end" }}>
        <IconButton
          size={40}
          color={colors.text}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
        <Headline style={{ textAlign: "center", marginTop: 20, marginBottom: 40 }}>LOGO</Headline>
        <Headline style={{ ...fonts.regular, fontSize: 16 }}>{"Faça o login para continuar!"}</Headline>
      </View>

      <View style={styles.main}>
        <TextInput
          label="E-mail"
          mode="outlined"
          style={{ marginBottom: 10 }}
          theme={{ colors: { background: colors.surface } }}
        />

        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry={true}
          style={{ marginBottom: 35 }}
          theme={{ colors: { background: colors.surface } }}
        />

        <Button onPress={() => navigation.navigate("SessionRoutes")} contentStyle={{ height: 45 }} icon="login" mode="contained">Entrar</Button>

        <View style={styles.orView}>
          <View style={{ ...styles.line, backgroundColor: colors.semiWhite }} />
          <Text style={{ marginHorizontal: 20 }}>Ou entre com</Text>
          <View style={{ ...styles.line, backgroundColor: colors.semiWhite }} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <IconButton size={40} icon="google" color="#E73B31" onPress={() => console.log("Google")} />
          <IconButton size={40} icon="facebook" color="#4A72B7" onPress={() => console.log("Facebook")} />
          <IconButton size={40} icon="github" color={colors.text} onPress={() => console.log("GitHub")} />
        </View>

        <Paragraph style={{ textAlign: "center", marginTop: 30 }}>Não possui conta? <Paragraph onPress={() => navigation.navigate("SignUp")} style={{ ...fonts.medium, ...styles.title, color: colors.warning, textDecorationLine: "underline" }}>CADASTRE-SE</Paragraph>!</Paragraph>
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
    flexDirection: "row",
  }
});