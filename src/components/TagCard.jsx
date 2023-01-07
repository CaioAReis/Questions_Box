import React from 'react'
import { View, PixelRatio } from 'react-native'
import { Chip, useTheme, Text, Divider, Card, TouchableRipple } from 'react-native-paper'

export const TagCard = ({ name, description, style, onPress = null }) => {
  const { colors } = useTheme();
  const ratio = PixelRatio.getFontScale();

  return (
    <TouchableRipple onPress={onPress} style={{ backgroundColor: colors.background, borderRadius: 8, marginVertical: 10, ...style }}>
      <Card.Content style={{ padding: 15, }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Chip textStyle={{ fontSize: 14 / ratio }} style={{ backgroundColor: colors.surface }}>{name}</Chip>
        </View>
        <Divider style={{ marginVertical: 8 }} />
        <Text numberOfLines={4} style={{ fontSize: 14 / ratio }}>{description}</Text>
      </Card.Content>
    </TouchableRipple>
  );
}