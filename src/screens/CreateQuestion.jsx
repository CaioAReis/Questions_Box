import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, PixelRatio, StyleSheet, View, Modal, FlatList } from "react-native";
import { Button, Chip, Divider, IconButton, TextInput, Title, useTheme, Searchbar, HelperText, Portal, Dialog, Avatar, Text } from "react-native-paper";
import { API } from "../services/api";

const ratio = PixelRatio.getFontScale();

export const CreateQuestion = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { question } = route.params;
  const [loading, setLoading] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [addTagModal, setAddTagModal] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { title: Boolean(question) ? question?.title : "", description: Boolean(question) ? question?.description : "", tags: Boolean(question) ? question?.tags : [] }
  });
  const onSubmit = async data => {
    const session = JSON.parse(await AsyncStorage.getItem('QB@user_session_key'));
    !Boolean(question)
      ? API.createQuestion(data, session?.token).then(res => {
        setDialogData({ title: "Dúvida publicada!", body: "Sua dúvida publicada com sucesso!", callback: () => navigation.goBack() });
      }).catch(err => {
        setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
      }).finally(() => setLoading(false))

      : API.editQuestion(question?._id, data, session?.token).then(res => {
        setDialogData({ title: "Dúvida Editada!", body: "Sua dúvida foi editada com sucesso!", callback: () => navigation.goBack() });
      }).catch(err => {
        setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
      }).finally(() => setLoading(false));
  };

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
          <Title style={{ fontSize: 20 / ratio, flex: 1, textAlign: "center" }}>
            {Boolean(question) ? "Editar Dúvida" : "Postar Dúvida"}
          </Title>
          <View style={{ width: 30 }} />
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
          <Controller name="title" control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                label="Título da dúvida"
                error={Boolean(errors.title)}
                theme={{ colors: { background: colors.surface, primary: colors.text } }}
              />
            )}
          />
          <HelperText style={{ marginBottom: 5 }} type="error" visible={Boolean(errors.title)} >
            Campo obrigatório
          </HelperText>

          <Controller name="description" control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                style={{ height: 150 }}
                label="Descrição dúvida"
                error={Boolean(errors.description)}
                theme={{ colors: { background: colors.surface, primary: colors.text } }}
              />
            )}
          />
          <HelperText style={{ marginBottom: 5 }} type="error" visible={Boolean(errors.description)} >
            Campo obrigatório
          </HelperText>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <Title style={{ fontSize: 20 / ratio }}>Tags</Title>
            <Button contentStyle={{ height: 45 }} color={colors.success} icon="plus-circle" onPress={() => setAddTagModal(true)}>Adicionar tag</Button>
          </View>

          {Boolean(QuestiontagList.length) && (
            <>
              <View style={{ borderWidth: 1, borderColor: Boolean(errors.tags) ? colors.error : colors.surface, marginTop: 15, flexDirection: "row", padding: 10, borderRadius: 8, backgroundColor: colors.surface, flexWrap: "wrap" }} >
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
              <HelperText type="error" visible={Boolean(errors.tags)} >
                Selecione pelo menos uma tag.
              </HelperText>
            </>
          )}

          <Divider style={{ marginVertical: 30 }} />

          <Button
            title="Submit"
            mode="contained"
            loading={loading}
            disabled={loading}
            icon="checkbox-marked-circle"
            contentStyle={{ height: 45 }}
            onPress={handleSubmit(onSubmit)}
            labelStyle={{ fontSize: 14 / ratio }}>
            {Boolean(question) ? "Salvar Alterações" : "Postar Dúvida"}
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

      <Portal>
        <Dialog visible={Boolean(dialogData)} onDismiss={() => { Boolean(dialogData?.callback) ? dialogData?.callback() : null; setDialogData(null); }}
          style={{ borderWidth: 4, borderColor: dialogData?.error ? colors.error : colors.success, paddingVertical: 20 }}
        >
          <>
            <Dialog.Title>{dialogData?.title}</Dialog.Title>
            <Dialog.Content>
              <Text>{dialogData?.body}</Text>
            </Dialog.Content>
            <Avatar.Icon icon={dialogData?.error ? "close" : "check"} size={120} style={{ position: "absolute", top: -80, alignSelf: "center", backgroundColor: dialogData?.error ? colors.error : colors.success }} />
          </>
        </Dialog>
      </Portal>
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