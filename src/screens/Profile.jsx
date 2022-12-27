import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, KeyboardAvoidingView, PixelRatio, Platform, View } from "react-native";
import { Avatar, Button, Dialog, HelperText, IconButton, Modal, Portal, Text, TextInput, Title, useTheme } from "react-native-paper";
import { QuestionCard } from "../components";
import { API } from "../services/api";

const ratio = PixelRatio.getFontScale();

export const Profile = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [list, setList] = useState([]);
  const { userID, user } = route.params;
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [session, setSession] = useState({ ...user });

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: user?.name, cpf: user?.cpf, email: user?.email, }
  });

  const onSubmit = data => {
    setLoading(true);
    API.editUser(user?._id, data, user?.token).then(async res => {
      setDialogData({ title: "Salvo!", body: "Seus dados foram editados com sucesso!"});
      await AsyncStorage.setItem('QB@user_session_key', JSON.stringify({ ...session, ...data }));
      setSession(current => { return { ...current, ...data } });
      setOpenEdit(false);
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    const requestProfile = () => {
      setLoading(true);
      API.getUser(userID)
        .then(res => setSession(res))
        .catch(err => setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message }))
        .finally(() => setLoading(false));
    };

    const requestQuestions = () => {
      setLoading(true);
      API.questionsByUser(userID)
        .then(res => setList(res))
        .catch(err => setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message }))
        .finally(() => setLoading(false));
    }

    !Boolean(user) ? requestProfile() : null;
    requestQuestions();
  }, []);

  return (
    <>
      <View style={{ backgroundColor: colors.surface, flex: 1 }}>
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          keyExtractor={question => question._id}
          contentContainerStyle={{ paddingBottom: 34, backgroundColor: colors.surface }}
          renderItem={({ item }) => <QuestionCard nav={navigation} question={item} ratio={ratio} />}
          ListEmptyComponent={
            <View style={{ padding: 20 }}>
              <Title style={{ color: colors.semiTransparent, textAlign: "center", fontSize: 20 / ratio, marginBottom: 20 }}>
                Nenhuma dúvida postada!
              </Title>
            </View>
          }
          ListHeaderComponent={
            <>
              <View style={{ padding: 20, backgroundColor: colors.background, marginBottom: 10 }}>
                <View style={{ marginBottom: 20, flexDirection: "row", justifyContent: "space-between" }}>
                  <IconButton
                    size={35}
                    color={colors.text}
                    style={{ margin: 0 }}
                    icon="arrow-left-circle-outline"
                    onPress={() => navigation.goBack()}
                  />

                  {userID === session?._id ? (
                    <IconButton
                      size={35}
                      color={colors.text}
                      style={{ margin: 0 }}
                      icon="circle-edit-outline"
                      onPress={() => setOpenEdit(true)}
                    />
                  ) : null}
                </View>

                <View style={{ flexDirection: "row", }}>
                  <Avatar.Text size={80} label={session?.name[0] || ""} labelStyle={{ fontSize: 25 / ratio, fontWeight: "bold" }} />
                  <View style={{ flex: 1, marginLeft: 15, justifyContent: "center" }}>
                    <Title style={{ fontSize: 20 / ratio, lineHeight: 20 / ratio }}>{session?.name || ""}</Title>

                    <Title style={{ fontSize: 12 / ratio, lineHeight: 20 / ratio, color: colors.primary }}>
                      {session?.email}
                    </Title>
                  </View>
                </View>
              </View>

              <View style={{ margin: 20, flexDirection: "row", justifyContent: "space-between" }}>
                <Title style={{ fontSize: 20 / ratio, marginBottom: 20 }}>
                  Dúvidas postadas:
                </Title>
                <Title style={{ color: colors.primary }}>{session?.questions || ""}</Title>
              </View>
            </>
          }
        />
      </View>

      <Modal visible={openEdit} style={{ justifyContent: "flex-start", alignItems: "center" }} onDismiss={() => setOpenEdit(false)}
        contentContainerStyle={{
          padding: 20,
          width: "90%",
          borderRadius: 10,
          backgroundColor: colors.background,
        }}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : ""}>
          <View style={{ position: "relative", marginBottom: 30 }}>
            <Title style={{ textAlign: "center", }}>Editar dados</Title>
            <IconButton
              size={30}
              icon="close-circle-outline"
              color={colors.error} onPress={() => setOpenEdit(false)}
              style={{ position: "absolute", margin: 0, top: -10, right: 0 }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Controller name="name" control={control}
              rules={{ required: "Campo obrigatório" }}
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
            {Boolean(errors.name) && <HelperText type="error" visible={Boolean(errors.name)}>{errors.name.message}</HelperText>}

            <Controller name="cpf" control={control}
              rules={{ required: "Campo obrigatório" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="CPF"
                  value={value}
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={{ marginTop: 15 }}
                  error={Boolean(errors.cpf)}
                  theme={{ colors: { background: colors.surface, primary: colors.text } }}
                />
              )}
            />
            {Boolean(errors.cpf) && <HelperText type="error" visible={Boolean(errors.cpf)}>{errors.cpf.message}</HelperText>}

            <Controller name="email" control={control}
              rules={{ required: "Campo obrigatório" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  value={value}
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={{ marginTop: 15 }}
                  error={Boolean(errors.email)}
                  theme={{ colors: { background: colors.surface, primary: colors.text } }}
                />
              )}
            />
            {Boolean(errors.email) && <HelperText type="error" visible={Boolean(errors.email)}>{errors.email.message}</HelperText>}

            <Button disabled={loading} loading={loading} mode="contained" style={{ marginTop: 35 }} onPress={handleSubmit(onSubmit)}>Salvar alterações</Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Portal>
        <Dialog visible={Boolean(dialogData)} onDismiss={() => {Boolean(dialogData?.callback) ? dialogData?.callback() : null; setDialogData(null);}}
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
}