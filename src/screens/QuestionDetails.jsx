import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Modal, PixelRatio, Pressable, View } from "react-native";
import { Avatar, Button, Chip, Divider, IconButton, Text, TextInput, Title, useTheme } from "react-native-paper";
import { ResponseCard } from "../components";

const ratio = PixelRatio.getFontScale();

export const QuestionDetails = ({ navigation }) => {
  const { colors } = useTheme();

  const [openAnswer, setOpenAnswer] = useState(false);

  const list = [
    {
      _id: "111",
      date: "15/09/22 - 20:07",
      response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur ex et finibus tincidunt. Donec sodales sollicitudin purus, lacinia dictum metus fringilla vitae. Ut sagittis ligula non finibus convallis. Donec at tincidunt magna, quis elementum.",
      user: {
        name: "Caio AReis"
      },
      bestAnswer: true,
    },

    {
      _id: "222",
      date: "15/09/22 - 20:07",
      response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur ex et finibus tincidunt. Donec sodales sollicitudin purus, lacinia dictum metus fringilla vitae. Ut sagittis ligula non finibus convallis. Donec at tincidunt magna, quis elementum.",
      user: {
        name: "Caio AReis"
      },
      bestAnswer: false,
    },

    {
      _id: "333",
      date: "15/09/22 - 20:07",
      response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur ex et finibus tincidunt. Donec sodales sollicitudin purus, lacinia dictum metus fringilla vitae. Ut sagittis ligula non finibus convallis. Donec at tincidunt magna, quis elementum.",
      user: {
        name: "Caio AReis"
      },
      bestAnswer: false,
    },
  ];

  return (
    <>
      <View style={{ backgroundColor: colors.surface, flex: 1 }}>
        <FlatList
          data={list}
          keyExtractor={answer => answer._id}
          contentContainerStyle={{ paddingBottom: 34 }}
          renderItem={({ item }) => <ResponseCard answer={item} ratio={ratio} />}
          ListHeaderComponent={
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

                <Pressable onPress={() => navigation.navigate("Profile")} style={{ borderRadius: 8, backgroundColor: colors.background, flexDirection: "row", alignItems: "center", padding: 5, paddingHorizontal: 15 }}>
                  <Avatar.Text size={30} label="CA" labelStyle={{ fontSize: 12 / ratio, fontWeight: "bold" }} />
                  <Text style={{ marginLeft: 10 }} >Caio AReis</Text>
                </Pressable>
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
              <Divider style={{ marginTop: 20 }} />
            </View>
          }
        />

        <View style={{ paddingHorizontal: 20 }}>
          <Button
            mode="contained"
            icon="clipboard-check"
            style={{ marginBottom: 20 }}
            contentStyle={{ height: 45 }}
            onPress={() => setOpenAnswer(true)}
          >
            Responder
          </Button>
        </View>
      </View>

      <Modal animationType="fade" visible={openAnswer} transparent onRequestClose={() => setOpenAnswer(false)}>
        <View style={{ backgroundColor: colors.backModal, flex: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1, alignItems: "center", justifyContent: "center"  }} behavior={Platform.OS === "ios" ? "padding" : ""}>
            <View style={{ padding: 20, width: "90%", borderRadius: 20, backgroundColor: colors.background }}>
              <View style={{ position: "relative", marginBottom: 30 }}>
                <Title style={{ textAlign: "center", }}>Resposta</Title>
                <IconButton
                  size={30}
                  icon="close-circle-outline"
                  color={colors.error} onPress={() => setOpenAnswer(false)}
                  style={{ position: "absolute", margin: 0, top: -10, right: 0 }}
                />
              </View>

              <Text style={{ fontSize: 14 / ratio, marginBottom: 30 }}>
                Onde fica a CRE do campus Lagarto?
              </Text>

              <View style={{ marginBottom: 20 }}>
                <TextInput
                  multiline
                  mode="outlined"
                  label="Sua resposta"
                  theme={{ colors: { background: colors.surface, primary: colors.text } }}
                  style={{ marginBottom: 30, height: 180 }}
                />

                <Button mode="contained" icon="bookmark-check">Responder</Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}