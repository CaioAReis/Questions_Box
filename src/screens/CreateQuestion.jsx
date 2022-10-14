import React from "react";
import { PixelRatio, StyleSheet, View } from "react-native";
import { Button, Divider, IconButton, Text, TextInput, Title, useTheme } from "react-native-paper";

const ratio = PixelRatio.getFontScale();

export const CreateQuestion = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View>
      <View style={{ ...styles.header, backgroundColor: colors.background }}>
        <IconButton
          size={35}
          color={colors.text}
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: colors.background, margin: 0 }}
        />
        <Title style={{ fontSize: 20 / ratio, flex: 1, textAlign: "center" }}>Postar Dúvida</Title>
        <View style={{ width: 30 }} />
      </View>

      <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
        <TextInput
          mode="outlined"
          label="Título da dúvida"
          style={{ marginBottom: 10 }}
          theme={{ colors: { background: colors.surface, primary: colors.text } }}
        />

        <TextInput
          mode="outlined"
          label="Descrição dúvida"
          style={{ marginBottom: 10, height: 150 }}
          theme={{ colors: { background: colors.surface, primary: colors.text } }}
        />

        <Divider style={{ marginVertical: 30 }} />

        <Button
          mode="contained"
          icon="checkbox-marked-circle"
          onPress={() => { }}
          contentStyle={{ height: 45 }}
          labelStyle={{ fontSize: 14 / ratio }}>
          Postar dúvida
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});