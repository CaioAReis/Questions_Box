import React, { useState } from "react";
import { KeyboardAvoidingView, PixelRatio, StyleSheet, View, Modal, ScrollView, FlatList } from "react-native";
import { Button, Chip, Divider, IconButton, Text, TextInput, Title, useTheme, Searchbar } from "react-native-paper";

const ratio = PixelRatio.getFontScale();

export const CreateQuestion = ({ navigation }) => {
  const { colors } = useTheme();
  const [addTagModal, setAddTagModal] = useState(false);

  const tagList = [
    { title: "Java" },
    { title: "SQL" },
    { title: "JavaScript" },
    { title: "HTML" },
    { title: "CSS" },
    { title: "React" },
    { title: "IFS" },
    { title: "NodeJS" },
    { title: "Java" },
    { title: "SQL" },
    { title: "JavaScript" },
    { title: "HTML" },
    { title: "CSS" },
    { title: "React" },
    { title: "IFS" },
    { title: "NodeJS" },
    { title: "Java" },
    { title: "SQL" },
    { title: "JavaScript" },
    { title: "HTML" },
    { title: "CSS" },
    { title: "React" },
    { title: "IFS" },
    { title: "NodeJS" },
  ];

  const QuestiontagList = [
    { title: "HTML" },
    { title: "CSS" },
    { title: "DOM" },
    { title: "JavaScript" },
    { title: "TypeScript" },
    { title: "PHP" },
  ];

  return (
    <>
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

            <Button color={colors.success} icon="plus-circle" onPress={() => setAddTagModal(true)}>Adicionar tag</Button>
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

      <Modal visible={addTagModal} transparent>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={{ flex: 1, maxHeight: "90%", borderWidth: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.backModal }}>
          <View style={{ padding: 20, width: "90%", borderRadius: 10, backgroundColor: colors.background }}>
            <View style={{ position: "relative", marginBottom: 30 }}>
              <Title style={{ textAlign: "center", }}>Adicionar TAGs</Title>
              <IconButton
                size={30}
                color={colors.error}
                icon="close-circle-outline"
                onPress={() => setAddTagModal(false)}
                style={{ position: "absolute", margin: 0, top: -10, right: 0 }}
              />
            </View>

            <Title style={{ fontSize: 16 / ratio }}>TAGs selecionadas:</Title>
            {Boolean(QuestiontagList.length) && (
              <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
                {QuestiontagList.map(tag => (
                  <Chip
                    key={tag.title}
                    onClose={() => alert("close")}
                    closeIcon="close-circle-outline"
                    style={{ margin: 4, backgroundColor: colors.surface }}
                  >
                    {tag.title}
                  </Chip>
                ))}
              </View>
            )}

            <Divider style={{ marginVertical: 20 }} />

            <Title style={{ fontSize: 16 / ratio, marginBottom: 10 }}>Selecione as TAGs:</Title>
            <Searchbar
              // value={searchQuery}
              placeholder="Pesquisar TAG"
            // onChangeText={onChangeSearch}
            />

            <FlatList
              numColumns={5}
              data={tagList}
              scrollEventThrottle={1900}
              keyExtractor={(item, index) => index}
              columnWrapperStyle={{ flexWrap: "wrap" }}
              contentContainerStyle={{ paddingBottom: 30, }}
              style={{ height: 200, marginTop: 15, padding: 10, borderRadius: 8, backgroundColor: colors.surface }}
              renderItem={({ item }) => (
                <Chip icon="plus" onPress={() => { }} style={{ margin: 4, backgroundColor: colors.background }}>
                  {item.title}
                </Chip>
              )}
            />

            {/* <View style={{ height: 200, marginTop: 15, padding: 10, borderRadius: 8, backgroundColor: colors.surface }}>
              <ScrollView style={{}}>
                {tagList.map((item, i) => (
                  <>
                    <Chip icon="plus" key={i} style={{ margin: 4, backgroundColor: colors.background }}>
                      {item.title}
                    </Chip>
                  </>
                ))}
              </ScrollView>
            </View> */}

          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
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