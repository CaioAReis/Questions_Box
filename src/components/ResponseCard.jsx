import React from "react";
import { View } from "react-native";
import { Avatar, Text, Title, useTheme } from "react-native-paper";

export const ResponseCard = ({ answer, ratio }) => {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
      <Text style={{ fontSize: 11 / ratio, marginBottom: 10 }}>{answer.date}</Text>
      <View style={{ backgroundColor: colors.background, padding: 10, borderRadius: 8, borderWidth: 2, borderColor: answer.bestAnswer ? colors.success : colors.background }}>
        <Text style={{ fontSize: 14 / ratio }}>{answer.response}</Text>
        <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Avatar.Text size={40} label="CA" labelStyle={{ fontSize: 16 / ratio }} />
            <Title style={{ fontSize: 14 / ratio, marginLeft: 10 }}>{answer.user.name}</Title>
          </View>
          {answer.bestAnswer &&
            <Title style={{ fontSize: 14 / ratio, color: colors.success }}>MELHOR RESPOSTA</Title>
          }
        </View>
      </View>
    </View>
  );
}