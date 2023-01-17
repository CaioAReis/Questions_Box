import React, { useEffect, useRef, useState } from "react";
import { PixelRatio, StyleSheet, View, FlatList, ScrollView, Pressable } from "react-native";
import { Button, Modal, Chip, Divider, IconButton, TextInput, Title, useTheme, Searchbar, HelperText, Portal, Dialog, Avatar, Text, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, useForm } from "react-hook-form";
import { API } from "../services/api";

const ratio = PixelRatio.getFontScale();

export const CreateQuestion = ({ route, navigation }) => {
  const __tagSize = useRef();
  const { colors } = useTheme();
  const { question, session } = route.params;
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [dialogData, setDialogData] = useState(null);
  const [addTagModal, setAddTagModal] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { title: Boolean(question) ? question?.title : "", description: Boolean(question) ? question?.description : "", tags: Boolean(question) ? question?.tags : [] }
  });

  const onSubmit = async data => {
    !Boolean(question)
      ? API.createQuestion(data, session?.token).then(res => {
        setDialogData({ title: "Dúvida publicada!", body: "Sua dúvida publicada com sucesso!", callback: () => navigation.goBack() });
      }).catch(err => {
        setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
      }).finally(() => setLoading(false))

      : API.editQuestion(question?._id, data, session?.token).then(res => {
        console.warn(res);
        setDialogData({ title: "Dúvida Editada!", body: "Sua dúvida foi editada com sucesso!", callback: () => navigation.goBack() });
      }).catch(err => {
        setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
      }).finally(() => setLoading(false));
  };

  const handleGetTags = () => {
    if (loading || pagination < 0) return;
    setLoading(true);
    API.tags(pagination).then(res => {
      if (Boolean(res.length) && pagination >= 0) {
        setTagList([...tagList, ...res]);
        setPagination(pagination + 1);
      } else setPagination(-1);
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => setLoading(false));
  };

  const handleSelectTag = ({ origin, destiny, item, value = null, out = false }) => {
    if (out) {
      origin(value.filter(it => it?._id !== item?._id));
      destiny(prev => [...prev, item]);
    } else {
      origin(prev => prev.filter(it => it?._id !== item?._id));
      destiny([...value, item]);
    }
  };

  useEffect(() => handleGetTags(), []);

  return (
    <>
      <ScrollView>
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
          {Boolean(errors.title) ? (
            <HelperText type="error" visible={Boolean(errors.title)}>{errors.title.message}</HelperText>
          ) : null}

          <Controller name="description" control={control}
            rules={{ required: "Campo obrigatório" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                multiline
                value={value}
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                label="Descrição dúvida"
                error={Boolean(errors.description)}
                style={{ height: 150, marginTop: 20 }}
                theme={{ colors: { background: colors.surface, primary: colors.text } }}
              />
            )}
          />
          {Boolean(errors.description) ? (
            <HelperText type="error" visible={Boolean(errors.description)}>{errors.description.message}</HelperText>
          ) : null}

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <Title style={{ fontSize: 20 / ratio }}>Tags</Title>
            <Button contentStyle={{ height: 45 }} color={colors.success} icon="plus-circle" onPress={() => setAddTagModal(true)}>Adicionar tag</Button>
          </View>

          <Controller name="tags" control={control}
            rules={{ required: "Campo obrigatório" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                {Boolean(value.length) ? (
                  <>
                    <View style={{ borderWidth: 1, borderColor: Boolean(errors.tags) ? colors.error : colors.surface, marginTop: 15, flexDirection: "row", padding: 10, borderRadius: 8, backgroundColor: colors.surface, flexWrap: "wrap" }} >
                      {value.map((tag) => (
                        <Chip
                          key={tag._id}
                          closeIcon="close-circle-outline"
                          style={{ margin: 4, backgroundColor: colors.background }}
                          onClose={() => handleSelectTag({ origin: onChange, destiny: setTagList, item: tag, value: value, out: true })}
                        >
                          {tag.title}
                        </Chip>
                      ))}
                    </View>
                  </>
                ) :
                  <Pressable onPress={() => setAddTagModal(true)} style={{ marginTop: 20, backgroundColor: colors.surface, padding: 20, borderRadius: 8, borderWidth: 1, borderColor: Boolean(errors.tags) ? colors.error : colors.placeholder }}>
                    <Text style={{ color: Boolean(errors.tags) ? colors.error : colors.placeholder }}>Selecione as Tags</Text>
                  </Pressable>
                }

                <Portal>
                  <Modal visible={addTagModal} contentContainerStyle={{ alignItems: "center" }}>
                    <View style={{ padding: 20, width: "90%", borderRadius: 10, backgroundColor: colors.background }}>
                      <View style={{ position: "relative", marginBottom: 10 }}>
                        <Title style={{ textAlign: "center", }}>Adicionar TAGs</Title>
                        <IconButton
                          size={30}
                          color={colors.error}
                          icon="close-circle-outline"
                          onPress={() => setAddTagModal(false)}
                          style={{ position: "absolute", margin: 0, top: -10, right: 0 }}
                        />
                      </View>

                      <Text style={{ textAlign: "center", opacity: .5, marginBottom: 20 }}>Considera a 1ª TAG a mais importante!</Text>

                      <Title style={{ fontSize: 16 / ratio }}>TAGs selecionadas:</Title>
                      <ScrollView onContentSizeChange={() => __tagSize.current.scrollToEnd()} ref={__tagSize} style={{ maxHeight: "20%" }}>
                        {Boolean(value.length) && (
                          <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
                            {value.map((tag, i) => (
                              <Chip
                                key={tag._id}
                                closeIcon="close-circle-outline"
                                style={{ margin: 4, backgroundColor: colors.surface }}
                                onClose={() => handleSelectTag({ origin: onChange, destiny: setTagList, item: tag, value: value, out: true })}
                              >
                                {tag.title}
                              </Chip>
                            ))}
                          </View>
                        )}
                      </ScrollView>

                      <Divider style={{ marginVertical: 20 }} />

                      <Title style={{ fontSize: 16 / ratio, marginBottom: 10 }}>Selecione as TAGs:</Title>
                      {/* <Searchbar
                        // value={searchQuery}
                        placeholder="Pesquisar TAG"
                      // onChangeText={onChangeSearch}
                      /> */}

                      <FlatList
                        numColumns={5}
                        data={tagList}
                        onEndReached={handleGetTags}
                        keyExtractor={(item) => item._id}
                        columnWrapperStyle={{ flexWrap: "wrap" }}
                        contentContainerStyle={{ paddingBottom: 30, }}
                        style={{ height: 200, marginTop: 15, padding: 10, borderRadius: 8, backgroundColor: colors.surface }}
                        ListFooterComponent={
                          loading && <ActivityIndicator style={{ padding: 10 }} size={"large"} color={colors.primary} />}
                        renderItem={({ item }) => (
                          <Chip icon="plus" onPress={() => handleSelectTag({ origin: setTagList, destiny: onChange, value: value, item: item })} style={{ margin: 4, backgroundColor: colors.background }}>
                            {item.title}
                          </Chip>
                        )}
                      />

                      <Button
                        title="Submit"
                        mode="contained"
                        style={{ marginTop: 20 }}
                        icon="checkbox-marked-circle"
                        contentStyle={{ height: 45 }}
                        onPress={() => setAddTagModal(false)}
                        labelStyle={{ fontSize: 14 / ratio }}>
                        OK
                      </Button>
                    </View>
                  </Modal>
                </Portal>
              </>
            )}
          />

          {Boolean(errors.tags) ? (
            <HelperText type="error" visible={Boolean(errors.tags)}>{errors.tags.message}</HelperText>
          ) : null}

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
      </ScrollView>

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