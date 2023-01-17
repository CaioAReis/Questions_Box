import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Divider, Menu, Avatar, Button, Dialog, HelperText, IconButton, Modal, Portal, Text, TextInput, Title, useTheme } from "react-native-paper";
import { API } from "../services/api";

export const UserMenu = ({ user, setUser }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenLogout, setIsOpenLogout] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: user?.name, cpf: user?.cpf, email: user?.email }
  });

  const onSubmit = data => {
    setLoading(true);
    API.editUser(user?._id, data, user?.token).then(async res => {
      setDialogData({ title: "Salvo!", body: "Seus dados foram editados com sucesso!" });
      await AsyncStorage.setItem('QB@user_session_key', JSON.stringify({ ...user, ...data, token: res?.token }));
      setUser(current => { return { ...current, ...data, token: res?.token } });
      setOpenEdit(false);
    }).catch(err => {
      console.error(err);
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => setLoading(false));
  };

  const handleLogout = () => {
    AsyncStorage.clear().then(() => {
      setIsOpenMenu(false);
      navigation.navigate("SignIn");
    });
  }

  return (
    <>
      <Menu
        visible={isOpenMenu}
        onDismiss={() => setIsOpenMenu(false)}
        contentStyle={{ borderWidth: 1, borderColor: colors.placeholder }}
        anchor={
          <IconButton
            size={35}
            color={colors.text}
            style={{ margin: 0 }}
            icon="circle-edit-outline"
            onPress={() => setIsOpenMenu(true)}
          />
        }>
        <Menu.Item icon="account-edit-outline" onPress={() => { setIsOpenMenu(false); setOpenEdit(true); }} title="Editar perfil" />
        {/* <Menu.Item icon="lock-open-outline" onPress={() => alert("Aterar senha")} title="Alterar senha" /> */}
        <Divider />
        <Menu.Item titleStyle={{ color: colors.error }} icon="logout" onPress={async () => { setIsOpenMenu(false); setIsOpenLogout(true); }} title="Sair" />
      </Menu>

      <Portal>
        <Modal visible={openEdit} style={{ justifyContent: "center", alignItems: "center" }} onDismiss={() => setOpenEdit(false)}
          contentContainerStyle={{
            padding: 20,
            width: "90%",
            borderRadius: 10,
            backgroundColor: colors.background,
          }}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
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
      </Portal>

      <Portal>
        <Dialog visible={isOpenLogout} onDismiss={() => setIsOpenLogout(false)}>
          <Dialog.Title>Você realmente deseja sair da conta?</Dialog.Title>
          <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
            <Button labelStyle={{ color: colors.error }} onPress={handleLogout}>SIM</Button>
            <Button labelStyle={{ color: colors.text }} onPress={() => setIsOpenLogout(false)}>NÃO</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={Boolean(dialogData)} onDismiss={() => { Boolean(dialogData?.callback) ? dialogData?.callback() : null; setDialogData(null); }}
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