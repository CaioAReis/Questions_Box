import React from "react";
import { PixelRatio, View } from "react-native";
import { Avatar, Chip, Divider, IconButton, Text, Title, useTheme } from "react-native-paper";

const ratio = PixelRatio.getFontScale();

export const QuestionDetails = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.surface, flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
      <IconButton
        size={35}
        color={colors.text}
        style={{ margin: 0 }}
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 18 / ratio }}>Postado por:</Text>

        <View style={{ borderRadius: 8, backgroundColor: colors.background, flexDirection: "row", alignItems: "center", padding: 5, paddingHorizontal: 15 }}>
          <Avatar.Text size={45} label="CA" labelStyle={{ fontSize: 16 / ratio, fontWeight: "bold" }} />
          <Text style={{ marginLeft: 10 }} >Caio AReis</Text>
        </View>
      </View>

      <Divider style={{ marginVertical: 30 }} />

      <Title style={{ fontSize: 25 / ratio, marginBottom: 45 }}>
        Onde fica a CRE do campus Lagarto?
      </Title>

      <Text style={{ fontSize: 18 / ratio }}>
        Sou novato e gostaria de saber onde fica a CRE docampus Lagarto, pois preciso resolver uma pendencia.
      </Text>

      <View style={{ flexWrap: "wrap", marginVertical: 35, flexDirection: "row" }}>
        <Chip
          textStyle={{ fontSize: 16 / ratio }}
          onPress={() => navigation.navigate("ListForTag", { TAG: { title: "IFS" } })}
          style={{ backgroundColor: colors.background, paddingHorizontal: 6, paddingVertical: 2, marginHorizontal: 5 }}
        >
          IFS
        </Chip>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 18 / ratio, color: colors.success }}>2 Respostas</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton
            size={25}
            style={{ margin: 0 }}
            icon="thumb-up-outline"
            color={colors.semiTransparent}
            onPress={() => { }}
          />

          <Text style={{ fontSize: 16 / ratio, marginHorizontal: 15 }}>0</Text>

          <IconButton
            size={25}
            style={{ margin: 0 }}
            icon="thumb-down-outline"
            color={colors.semiTransparent}
            onPress={() => { }}
          />
        </View>
      </View>

      <Divider style={{ marginVertical: 30 }} />

    </View>
  );
}