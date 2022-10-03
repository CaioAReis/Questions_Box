import React from "react";
import { View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";

export const Profile = () => {
  return (
    <View style={{ padding: 20 }}>
      <IconButton
        size={35}
        color={colors.text}
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
        style={{ margin: 0, marginBottom: 20 }}
      />

      <View style={{ flexDirection: "row" }}>
        <Avatar.Text size={80} label="CA" labelStyle={{ fontSize: 16 / ratio }} />
        <View>
          <Title style={{ fontSize: 20 / ratio, marginBottom: 20 }}>
            Caio AReis
          </Title>

          <Title style={{ fontSize: 12 / ratio, marginBottom: 12 }}>
            Caio.AReis@mail.com
          </Title>
        </View>
      </View>



      {/* <Title style={{ fontSize: 20 / ratio, marginBottom: 20 }}>
            Dúvidas com: <Title style={{ color: colors.primary }}>{TAG.title}</Title>
          </Title> */}
    </View>
  );
}