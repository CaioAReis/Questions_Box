import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Image, Platform, StyleSheet, Dimensions, PixelRatio, ScrollView, KeyboardAvoidingView, } from "react-native";
import { Text, Title, Button, useTheme, TextInput, IconButton, HelperText, Portal, Dialog, Avatar, } from "react-native-paper";
import { API } from "../services/api";
import { RegEx, maskInputs } from "../utils";

export const SignUp = ({ navigation }) => {
  const ratio = PixelRatio.getFontScale();
  const { colors, fonts, logos } = useTheme();
  const [loading, setLoading] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const imgDimensions = Dimensions.get("window").width / 3.5;

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: "", cpf: "", email: "", password: "" }
  });

  const onSubmit = data => {
    setLoading(true);
    API.signUP(data).then(res => {
      console.warn(res);
      //  Tratar a resposta!
      setDialogData({ error: false, title: "Parabéns! 👏👏", body: "Sua conta foi criada com sucesso!" });
      navigation.navigate("SignIn");
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
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
                rules={{
                  required: "Campo obrigatório.",
                  pattern: { value: RegEx.NAME, message: "Nome inválido." }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    mode="outlined"
                    onBlur={onBlur}
                    maxLength={255}
                    label="Nome completo"
                    onChangeText={onChange}
                    error={Boolean(errors.name)}
                    theme={{ colors: { background: colors.surface, primary: colors.text } }}
                  />
                )}
              />
              {Boolean(errors.name) && (
                <HelperText type="error" visible={Boolean(errors.name)}>{errors.name.message}</HelperText>
              )}

              <Controller name="cpf" control={control}
                rules={{
                  required: "Campo obrigatório.",
                  pattern: { value: RegEx.CPF, message: "CPF inválido." }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="CPF"
                    maxLength={14}
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={{ marginTop: 10 }}
                    error={Boolean(errors.cpf)}
                    value={maskInputs.document(value)}
                    theme={{ colors: { background: colors.surface, primary: colors.text } }}
                  />
                )}
              />
              {Boolean(errors.cpf) && (
                <HelperText type="error" visible={Boolean(errors.cpf)}>{errors.cpf.message}</HelperText>
              )}

              <Controller name="email" control={control}
                rules={{
                  required: "Campo obrigatório.",
                  pattern: { value: RegEx.EMAIL, message: "Email inválido" }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Email"
                    value={value}
                    mode="outlined"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={{ marginTop: 10 }}
                    error={Boolean(errors.email)}
                    theme={{ colors: { background: colors.surface, primary: colors.text } }}
                  />
                )}
              />
              {Boolean(errors.email) && (
                <HelperText type="error" visible={Boolean(errors.email)}>{errors.email.message}</HelperText>
              )}

              <Controller name="password" control={control}
                rules={{ required: "Campo obrigatório." }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    label="Senha"
                    mode="outlined"
                    onBlur={onBlur}
                    secureTextEntry={true}
                    onChangeText={onChange}
                    style={{ marginTop: 10 }}
                    error={Boolean(errors.password)}
                    theme={{ colors: { background: colors.surface, primary: colors.text } }}
                  />
                )}
              />
              {Boolean(errors.password) && (
                <HelperText type="error" visible={Boolean(errors.password)}>{errors.password.message}</HelperText>
              )}

              <Button style={{ marginTop: 30 }} disabled={loading} loading={loading} title="Submit" onPress={handleSubmit(onSubmit)} contentStyle={{ height: 45 }} icon="account-arrow-right" mode="contained">Criar conta</Button>
              <Text style={{ textAlign: "center", marginTop: 30, fontSize: 14 / ratio }}>Já possui conta? Faça o <Text onPress={() => navigation.navigate("SignIn")} style={{ ...fonts.medium, ...styles.title, color: colors.primary, fontSize: 14 / ratio }}>LOGIN</Text>!</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <Portal>
        <Dialog visible={Boolean(dialogData)} onDismiss={() => setDialogData(null)}
          style={{ borderWidth: 4, borderColor: dialogData?.error ? colors.error : colors.success, paddingVertical: 20 }}
        >
          <>
            <Dialog.Title>{dialogData?.title}</Dialog.Title>
            <Dialog.Content>
              <Text>{dialogData?.body}</Text>
            </Dialog.Content>
            <Avatar.Icon icon={dialogData?.error ? "close" : "check"} size={120} style={{ position: "absolute", top: -80, alignSelf: "center", backgroundColor: dialogData?.error ? colors.error : colors.success }} />
          </>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    height: "100%",
    paddingBottom: 30,
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