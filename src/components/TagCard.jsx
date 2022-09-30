import React from 'react'
import { View, PixelRatio } from 'react-native'
import { Chip, useTheme, Text, Divider } from 'react-native-paper'

export const TagCard = () => {
  const { colors } = useTheme();
  const ratio = PixelRatio.getFontScale();

  return (
    <View style={{ backgroundColor: colors.background, padding: 15, borderRadius: 8, marginVertical: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Chip
          textStyle={{ fontSize: 14 / ratio,  }}
          onPress={() => console.log('Pressed')}
          style={{ backgroundColor: colors.surface,  }}
        >
          Java
        </Chip>
        <Text style={{ fontSize: 14 / ratio, textAlign: "center", color: colors.success }} >{`${123}\r\nDúvidas`}</Text>
      </View>

      <Divider style={{ marginVertical: 8 }} />

      <Text numberOfLines={4} style={{ fontSize: 12 / ratio }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Phasellus sollicitudin id nibh vitae eleifend. Fusce placerat 
        justo sed erat lobortis bibendum. Donec at tellus vestibulum, faucibus nisl at!
      </Text>
    </View>
  );
}