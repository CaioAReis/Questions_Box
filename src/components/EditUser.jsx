import { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider, IconButton, Menu } from "react-native-paper";

export const EditUser = ({ setOpenEdit }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return <Menu
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
    <Menu.Item icon="account-edit-outline" onPress={() => setOpenEdit(true)} title="Editar perfil" />
    <Menu.Item icon="lock-open-outline" onPress={() => alert("Aterar senha")} title="Alterar senha" />
    <Divider />
    <Menu.Item titleStyle={{ color: colors.error }} icon="logout" onPress={async () => { await AsyncStorage.clear(); setIsOpenMenu(false); navigation.navigate("SignIn"); }} title="Sair" />
  </Menu>
};