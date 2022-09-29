import React from 'react'
import { View, Text, StyleSheet, Image, PixelRatio } from "react-native";
import { Avatar, useTheme } from 'react-native-paper';

const ratio = PixelRatio.getFontScale();

export const Tags = () => {
  const { colors, logos } = useTheme();

  return (
    <View>
      <View style={{ ...styles.header, backgroundColor: colors.background }}>
        <View style={{ alignItems: "center" }}>
          <Image source={logos[3]} resizeMode="contain" style={{ width: 140, height: 50 }} />
        </View>
        <Avatar.Text size={40} label="CA" labelStyle={{ fontSize: 16 / ratio }} />
      </View>

      <Text>Tags</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});