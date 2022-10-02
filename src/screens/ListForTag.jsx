import React from "react";
import { FlatList, PixelRatio, View } from "react-native";
import { Divider, IconButton, Title, useTheme } from "react-native-paper";
import { QuestionCard, TagCard } from "../components";

const ratio = PixelRatio.getFontScale();

export const ListForTag = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { TAG } = route.params;

  const list = [
    {
      _id: "1",
      qtdAnsers: 2,
      date: "15/09/2022 - 20:07",
      tags: ["IFS", "Lagarto"],
      title: "Onde fica a CRE do campus Lagarto?",
    },

    {
      _id: "2",
      qtdAnsers: 12,
      tags: ["Cartão", "Clonar"],
      date: "15/09/2022 - 20:07",
      title: "Como clonar um cartão?",
    },

    {
      _id: "3",
      qtdAnsers: 0,
      date: "15/09/2022 - 20:07",
      tags: ["Compra", "Trailer"],
      title: "Onde posso comprar um trailer?",
    },

    {
      _id: "4",
      qtdAnsers: 4,
      date: "15/09/2022 - 20:07",
      tags: ["Pokemon", "Shiny"],
      title: "Como encontrar um pokemon shiny?",
    },

    {
      _id: "5",
      qtdAnsers: 1,
      date: "15/09/2022 - 20:07",
      tags: ["Gato", "Elétrico"],
      title: "Como fazer um gato elétrico sem tomar choque⚡?",
    }

  ];

  return (
    <FlatList
      data={list}
      showsVerticalScrollIndicator={false}
      keyExtractor={question => question._id}
      contentContainerStyle={{ paddingBottom: 34, backgroundColor: colors.surface }}
      renderItem={({ item }) => <QuestionCard nav={navigation} question={item} ratio={ratio} />}
      ListHeaderComponent={
        <View style={{ padding: 20 }}>
          <IconButton
            size={35}
            color={colors.text}
            icon="arrow-left-circle-outline"
            onPress={() => navigation.goBack()}
            style={{ margin: 0, marginBottom: 20 }}
          />
          <TagCard />
          <Divider style={{ marginVertical: 20 }} />
          <Title style={{ fontSize: 20 / ratio, marginBottom: 20 }}>
            Dúvidas com: <Title style={{ color: colors.primary }}>{TAG.title}</Title>
          </Title>
        </View>
      }
    />
  )
}