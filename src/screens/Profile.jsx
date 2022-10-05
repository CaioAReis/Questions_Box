import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, PixelRatio, Platform, View } from "react-native";
import { Avatar, Button, IconButton, Modal, TextInput, Title, useTheme } from "react-native-paper";
import { QuestionCard } from "../components";

const ratio = PixelRatio.getFontScale();

export const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  const [openEdit, setOpenEdit] = useState(false);

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
    <>
      <View style={{ backgroundColor: colors.surface, flex: 1 }}>
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          keyExtractor={question => question._id}
          contentContainerStyle={{ paddingBottom: 34, backgroundColor: colors.surface }}
          renderItem={({ item }) => <QuestionCard nav={navigation} question={item} ratio={ratio} />}
          ListEmptyComponent={
            <View style={{ padding: 20 }}>
              <Title style={{ color: colors.semiTransparent, textAlign: "center", fontSize: 20 / ratio, marginBottom: 20 }}>
                Nenhuma dúvida postada!
              </Title>
            </View>
          }
          ListHeaderComponent={
            <>
              <View style={{ padding: 20, backgroundColor: colors.background, marginBottom: 10 }}>
                <View style={{ marginBottom: 20, flexDirection: "row", justifyContent: "space-between" }}>
                  <IconButton
                    size={35}
                    color={colors.text}
                    style={{ margin: 0 }}
                    icon="arrow-left-circle-outline"
                    onPress={() => navigation.goBack()}
                  />

                  <IconButton
                    size={35}
                    onPress={() => setOpenEdit(true)}
                    color={colors.text}
                    style={{ margin: 0 }}
                    icon="circle-edit-outline"
                  />
                </View>

                <View style={{ flexDirection: "row", }}>
                  <Avatar.Text size={80} label="CA" labelStyle={{ fontSize: 25 / ratio, fontWeight: "bold" }} />
                  <View style={{ flex: 1, marginLeft: 15, justifyContent: "center" }}>
                    <Title style={{ fontSize: 20 / ratio, lineHeight: 20 / ratio }}>
                      Caio AReis
                    </Title>

                    <Title style={{ fontSize: 12 / ratio, lineHeight: 20 / ratio, color: colors.primary }}>
                      Caio.AReis@mail.com
                    </Title>
                  </View>
                </View>
              </View>

              <View style={{ margin: 20, flexDirection: "row", justifyContent: "space-between" }}>
                <Title style={{ fontSize: 20 / ratio, marginBottom: 20 }}>
                  Dúvidas postadas:
                </Title>
                <Title style={{ color: colors.primary }}>{"12"}</Title>
              </View>
            </>
          }
        />
      </View>

      <Modal visible={openEdit} style={{ justifyContent: "flex-start", alignItems: "center" }} onDismiss={() => setOpenEdit(false)}
        contentContainerStyle={{
          padding: 20,
          width: "90%",
          borderRadius: 10,
          backgroundColor: colors.background,
        }}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : ""}>
          <View style={{ position: "relative", marginBottom: 30 }}>
            <Title style={{ textAlign: "center", }}>Editar dados</Title>
            <IconButton
              size={30}
              icon="close-circle-outline"
              color={colors.error} onPress={() => setOpenEdit(false)}
              style={{ position: "absolute", margin: 0, top: -10, right: 0 }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <TextInput
              mode="outlined"
              label="Nome de usuário"
              style={{ marginBottom: 10 }}
              theme={{ colors: { background: colors.surface, primary: colors.text } }}
            />

            <TextInput
              mode="outlined"
              label="Email"
              style={{ marginBottom: 10 }}
              theme={{ colors: { background: colors.surface, primary: colors.text } }}
            />

            <TextInput
              mode="outlined"
              label="Telefone"
              style={{ marginBottom: 30 }}
              theme={{ colors: { background: colors.surface, primary: colors.text } }}
            />

            <Button mode="contained" onPress={() => { }} >Salvar alterações</Button>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}