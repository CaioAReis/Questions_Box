import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Image,
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
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

export const SignUp = ({ navigation }) => {
  const ratio = PixelRatio.getFontScale();
  const { colors, fonts, logos } = useTheme();
  const imgDimensions = Dimensions.get("window").width / 3.5;

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      document: "",
      email: "",
      password: "",
    }
  });
  const onSubmit = data => console.warn(data);

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        <View style={styles.content}>
          <View style={{ ...styles.main }}>
            <IconButton
              size={40}
              color={colors.text}
              icon="arrow-left-circle-outline"
              onPress={() => navigation.goBack()}
              style={{ position: "absolute", top: 0 }}
            />
            <View style={{ alignItems: "center" }}>
              <Image source={logos[1]} resizeMode="contain" style={{ marginVertical: 20, width: imgDimensions, height: imgDimensions }} />
            </View>
            <Title style={{ ...fonts.regular, fontSize: 18 / ratio, marginBottom: 20 }}>Faça já seu cadastro!</Title>

            <Controller name="name" control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  mode="outlined"
                  onBlur={onBlur}
                  label="Nome completo"
                  onChangeText={onChange}
                  error={Boolean(errors.name)}
                  theme={{ colors: { background: colors.surface, primary: colors.text } }}
                />
              )}
            />
            <HelperText style={{ marginBottom: 5 }} type="error" visible={Boolean(errors.name)} >
              Campo obrigatório
            </HelperText>

            <Controller name="document" control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="CPF"
                  value={value}
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={Boolean(errors.document)}
                  theme={{ colors: { background: colors.surface, primary: colors.text } }}
                />
              )}
            />
            <HelperText style={{ marginBottom: 5 }} type="error" visible={Boolean(errors.document)} >
              Campo obrigatório
            </HelperText>

            <Controller name="email" control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  value={value}
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

            <Button title="Submit" onPress={handleSubmit(onSubmit)} contentStyle={{ height: 45 }} icon="account-arrow-right" mode="contained">Criar conta</Button>

            {/* <View style={styles.orView}>
            <Text style={{ marginHorizontal: 20, fontSize: 14 / ratio }}>Ou entre com</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <IconButton size={40} icon="google" color="#E73B31" onPress={() => console.log("Google")} />
            <IconButton size={40} icon="facebook" color="#4A72B7" onPress={() => console.log("Facebook")} />
            <IconButton size={40} icon="github" color={colors.text} onPress={() => console.log("GitHub")} />
          </View> */}

            <Text style={{ textAlign: "center", marginTop: 30, fontSize: 14 / ratio }}>Já possui conta? Faça o <Text onPress={() => navigation.navigate("SignIn")} style={{ ...fonts.medium, ...styles.title, color: colors.primary, fontSize: 14 / ratio }}>LOGIN</Text>!</Text>
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