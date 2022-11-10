import React from 'react'
import { View, PixelRatio } from 'react-native'
import { Chip, useTheme, Text, Divider, Card, Title } from 'react-native-paper'

export const TagCard = ({ name, description, qtdQuestions }) => {
  const { colors } = useTheme();
  const ratio = PixelRatio.getFontScale();

  return (
    <Card.Content style={{ backgroundColor: colors.background, padding: 15, borderRadius: 8, marginVertical: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Chip textStyle={{ fontSize: 14 / ratio }} style={{ backgroundColor: colors.surface }}>
          {name}
        </Chip>
        <Title style={{ fontSize: 14 / ratio, color: colors.success, lineHeight: 16 / ratio }} >{`${qtdQuestions} Dúvidas`}</Title>
      </View>

      <Divider style={{ marginVertical: 8 }} />

      <Text numberOfLines={4} style={{ fontSize: 14 / ratio }}>{description}</Text>
    </Card.Content>
  );
}