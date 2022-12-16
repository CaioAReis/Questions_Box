import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Image,
  Platform,
  StyleSheet,
  PixelRatio,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {
  Text,
  Title,
  Button,
  useTheme,
  TextInput,
  IconButton,
  HelperText,
} from "react-native-paper";
import { API } from "../services/api";

export const SignIn = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = data => {
    API.signIN(data).then(res => {
      console.warn(res);
      //  Tratar a resposta!
      navigation.navigate("SessionRoutes");
    }).catch(err => {
      //  Exibir toast de erro!
      console.error(err.response.data);
      navigation.navigate("SessionRoutes");

    });
  };

  const ratio = PixelRatio.getFontScale();
  const { colors, fonts, logos } = useTheme();
  const imgDimensions = Dimensions.get("window").width / 3.5;

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
        <View style={styles.content}>
          <View style={styles.main}>
            <IconButton
              size={40}
              color={colors.text}
              icon="arrow-left-circle-outline"
              onPress={() => navigation.goBack()}
              style={{ position: "absolute", top: 0 }}
            />
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Image source={logos[1]} resizeMode="contain"
                style={{ marginVertical: 20, width: imgDimensions, height: imgDimensions }}
              />
            </View>
            <Title style={{ ...fonts.regular, fontSize: 18 / ratio, marginBottom: 20 }}>
              Faça o login para continuar!
            </Title>

            <Controller name="email" control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  label="E-mail"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={Boolean(errors.email)}
                  theme={{ colors: { background: colors.surface, primary: colors.text } }}
                />
              )}
            />
            <HelperText style={{ marginBottom: 5 }} type="error" visible={Boolean(errors.email)} >
              Campo obrigatório
            </HelperText>

            <Controller name="password" control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  label="Senha"
                  mode="outlined"
                  onBlur={onBlur}
                  secureTextEntry={true}
                  onChangeText={onChange}
                  error={Boolean(errors.password)}
                  theme={{ colors: { background: colors.surface, primary: colors.text } }}
                />
              )}
            />
            <HelperText style={{ marginBottom: 25 }} type="error" visible={Boolean(errors.password)} >
              Campo obrigatório
            </HelperText>

            <Button title="Submit" onPress={handleSubmit(onSubmit)} contentStyle={{ height: 45 }} icon="login" mode="contained">Entrar</Button>

            {/* <View style={styles.orView}>
            <Text style={{ marginHorizontal: 20, fontSize: 14 / ratio }}>Ou entre com</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <IconButton size={40} icon="google" color="#E73B31" onPress={() => console.log("Google")} />
            <IconButton size={40} icon="facebook" color="#4A72B7" onPress={() => console.log("Facebook")} />
            <IconButton size={40} icon="github" color={colors.text} onPress={() => console.log("GitHub")} />
          </View> */}

            <Text style={{ textAlign: "center", marginTop: 30, fontSize: 14 / ratio }}>
              Não possui conta? <Text onPress={() => navigation.navigate("SignUp")} style={{ ...fonts.medium, ...styles.title, color: colors.primary, fontSize: 14 / ratio }}>CADASTRE-SE</Text>!
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    padding: 20,
    width: "100%",
    paddingBottom: 50,
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