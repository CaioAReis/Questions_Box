import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Image, Platform, StyleSheet, PixelRatio, Dimensions, ScrollView, KeyboardAvoidingView, } from "react-native";
import { Text, Title, Button, useTheme, TextInput, IconButton, HelperText, Portal, Dialog, Avatar, } from "react-native-paper";
import { API } from "../services/api";
import { RegEx } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignIn = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = data => {
    setLoading(true);
    API.signIN(data).then(async res => {
      const strRes = JSON.stringify({ ...res?.session });
      await AsyncStorage.setItem('QB@user_session_key', strRes);
      // const value = await AsyncStorage.getItem('QB@user_session_key');
      // console.warn(value);
      navigation.navigate("SessionRoutes");
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => {
      setLoading(false);
    });
  };

  const ratio = PixelRatio.getFontScale();
  const { colors, fonts, logos } = useTheme();
  const imgDimensions = Dimensions.get("window").width / 3.5;

  return (
    <>
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
                rules={{
                  required: "Campo obrigatório.",
                  pattern: { value: RegEx.EMAIL, message: "Email inválido." }
                }}
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
              {Boolean(errors.email) && (
                <HelperText style={{ marginBottom: 5 }} type="error" visible={Boolean(errors.email)}>{errors.email.message}</HelperText>
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

              <Button style={{ marginTop: 35 }} disabled={loading} loading={loading} title="Submit" onPress={handleSubmit(onSubmit)} contentStyle={{ height: 45 }} icon="login" mode="contained">Entrar</Button>

              <Text style={{ textAlign: "center", marginTop: 30, fontSize: 14 / ratio }}>
                Não possui conta? <Text onPress={() => navigation.navigate("SignUp")} style={{ ...fonts.medium, ...styles.title, color: colors.primary, fontSize: 14 / ratio }}>CADASTRE-SE</Text>!
              </Text>
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