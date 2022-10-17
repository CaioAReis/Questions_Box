import React from "react";
import { PixelRatio, StyleSheet, View } from "react-native";
import { Button, Chip, Divider, IconButton, Text, TextInput, Title, useTheme } from "react-native-paper";

const ratio = PixelRatio.getFontScale();

export const CreateQuestion = ({ navigation }) => {
  const { colors } = useTheme();

  const QuestiontagList = [
    { title: "HTML" },
    { title: "CSS" },
    { title: "DOM" },
    { title: "JavaScript" },
    { title: "TypeScript" },
    { title: "PHP" },
  ];

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

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
          <Title style={{ fontSize: 20 / ratio }}>Tags</Title>

          <Button color={colors.success} icon="plus-circle" onPress={() => { }}>Adicionar tag</Button>
        </View>

        {Boolean(QuestiontagList.length) && (
          <View style={{ marginTop: 15, flexDirection: "row", padding: 10, borderRadius: 8, backgroundColor: colors.surface, flexWrap: "wrap" }} >
            {QuestiontagList.map(tag => (
              <Chip
                key={tag.title}
                onClose={() => alert("close")}
                closeIcon="close-circle-outline"
                style={{ margin: 4, backgroundColor: colors.background }}
              >
                {tag.title}
              </Chip>
            ))}
          </View>
        )}

        <Divider style={{ marginVertical: 30 }} />

        <Button
          mode="contained"
          onPress={() => { }}
          icon="checkbox-marked-circle"
          contentStyle={{ height: 45 }}
          labelStyle={{ fontSize: 14 / ratio }}>
          Postar dúvida
        </Button>
      </View>
    </View>
  );
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