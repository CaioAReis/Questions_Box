import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet, PixelRatio, Modal, KeyboardAvoidingView, Platform, Pressable, FlatList } from "react-native";
import { Avatar, Text, Button, Divider, IconButton, Title, useTheme, TextInput, List, HelperText, Portal, Dialog, ActivityIndicator } from 'react-native-paper';
import { TagCard } from '../components';
import { API } from '../services/api';

const ratio = PixelRatio.getFontScale();

export const Tags = ({ navigation }) => {
  const { colors, fonts } = useTheme();
  const [list, setList] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [dialogData, setDialogData] = useState(null);
  const span = { ...fonts.medium, color: colors.primary };
  const [openCreateTag, setOpenCreateTag] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { title: "", description: "" }
  });

  const onSubmit = data => {
    setLoading(true);
    API.createTag(data, session?.token).then(res => {
      setOpenCreateTag(false);
      setDialogData({ title: "Tag criada!", body: "Sua TAG foi criada!" });
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => setLoading(false));
  };

  const getList = () => {
    if (loading || pagination < 0) return;
    setLoading(true);
    API.tags(pagination).then(res => {
      if (Boolean(res.length) && pagination >= 0) {
        setList([ ...list, ...res ]);
        setPagination(pagination + 1);
      } else setPagination(-1);
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    const req = async () => {
      const s = JSON.parse(await AsyncStorage.getItem('QB@user_session_key'));
      setSession(s);
    };
    req();
    getList();
  }, []);

  return (
    <>
      <FlatList
        data={list}
        onEndReached={getList}
        scrollEventThrottle={2}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: colors.surface, paddingBottom: 50 }}
        renderItem={({ item }) => <TagCard onPress={() => navigation.navigate("ListForTag", { TAG: item })} name={item.title} description={item.description} style={{ marginHorizontal: 20 }} />}
        ListFooterComponent={
          loading && <ActivityIndicator style={{ padding: 10 }} size={"large"} color={colors.primary} />}
        ListHeaderComponent={
          <>
            <View style={{ ...styles.header, backgroundColor: colors.background }}>
              <IconButton
                size={35}
                color={colors.text}
                icon="arrow-left-circle-outline"
                onPress={() => navigation.goBack()}
                style={{ backgroundColor: colors.background, margin: 0 }}
              />
              <Title style={{ fontSize: 20 / ratio }}>TAGs</Title>
              <Pressable onPress={() => navigation.navigate("Profile", { userID: session?._id, user: session })}>
                <Avatar.Text size={40} label={session?.name[0]} labelStyle={{ fontSize: 16 / ratio }} />
              </Pressable>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
              <Text style={{ color: colors.text, textAlign: "center", fontSize: 16 / ratio, paddingTop: 40, paddingBottom: 25 }}>
                As <Text style={span}>TAGs</Text> são ultilizadas
                para categorizar as dúvidas na plataforma.
                Utilizando as TAGS <Text style={span}>corretas</Text> as outras
                pessoas <Text style={span}>encontrarão</Text> e <Text style={span}>responderão</Text> mais facilmente sua dúvida!
              </Text>

              <Divider style={{ marginBottom: 20 }} />

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                <Title style={{ fontSize: 18 / ratio }}>TAGs populares:</Title>
                <Button onPress={() => setOpenCreateTag(true)} icon="plus-circle" labelStyle={{ fontSize: 12 / ratio }} mode="contained">Criar TAG</Button>
              </View>
            </View>
          </>
        }
      />

      <Modal animationType="fade" visible={openCreateTag} transparent onRequestClose={() => setOpenCreateTag(false)}>
        <View style={{ backgroundColor: colors.backModal, flex: 1, alignItems: "center", justifyContent: "center" }}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
            <View style={{ ...styles.modalContent, backgroundColor: colors.background }}>
              <View style={{ position: "relative", marginBottom: 30 }}>
                <Title style={{ textAlign: "center", }} >Criar TAG</Title>
                <IconButton
                  size={30}
                  icon="close-circle-outline"
                  color={colors.error} onPress={() => setOpenCreateTag(false)}
                  style={{ position: "absolute", margin: 0, top: -10, right: 0 }}
                />
              </View>

              <Text style={{ fontSize: 14 / ratio }}>
                Você pode <Text style={span}>criar</Text> TAGs para categorizar
                melhor suas dúvidas. Atenção às observações abaixo:
              </Text>

              <List.Accordion style={{ borderRadius: 8, padding: 0, marginVertical: 10 }} titleStyle={{ fontSize: 14 / ratio }} title="Observações:">
                <View style={{ padding: 10, borderWidth: 2, borderRadius: 8, borderStyle: "dashed", borderColor: colors.surface, marginBottom: 10 }}>
                  <Text style={{ fontSize: 12 / ratio }}>
                    A TAG <Text style={span}>não</Text> pode ter sido criada anteriormente.
                  </Text>
                  <Text style={{ fontSize: 12 / ratio, marginVertical: 10 }}>
                    Seu título deve ser uma <Text style={span}>palavra única</Text> e autodescritiva.
                  </Text>
                  <Text style={{ fontSize: 12 / ratio }}>
                    É necessário ter uma <Text style={span}>descrição</Text> para detalhar sobre seu uso.
                  </Text>
                </View>
              </List.Accordion>

              <View style={{ marginBottom: 20 }}>

                <Controller name="title" control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      value={value}
                      mode="outlined"
                      onBlur={onBlur}
                      label="Título da TAG"
                      onChangeText={onChange}
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
                      multiline
                      value={value}
                      mode="outlined"
                      onBlur={onBlur}
                      label="Descrição da TAG"
                      onChangeText={onChange}
                      error={Boolean(errors.description)}
                      theme={{ colors: { background: colors.surface, primary: colors.text } }}
                    />
                  )}
                />
                <HelperText style={{ marginBottom: 25 }} type="error" visible={Boolean(errors.description)} >
                  Campo obrigatório
                </HelperText>

                <Button loading={loading} disabled={loading} mode="contained" contentStyle={{ height: 45 }} title="Submit" onPress={handleSubmit(onSubmit)} icon="plus">Criar tag</Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
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
  modalContent: {
    padding: 20,
    width: "90%",
    borderRadius: 20,
  }
});