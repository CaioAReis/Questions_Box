import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, KeyboardAvoidingView, Modal, PixelRatio, Pressable, View } from "react-native";
import { Avatar, Button, Chip, Dialog, Divider, HelperText, IconButton, Menu, Portal, Text, TextInput, Title, useTheme } from "react-native-paper";
import { ResponseCard } from "../components";
import { API } from "../services/api";

const ratio = PixelRatio.getFontScale();

export const QuestionDetails = ({ route, navigation }) => {
  const { colors } = useTheme();
  const q = route?.params.question;
  const [session, setSession] = useState("");
  const [question, setQuestion] = useState(q);
  const [loading, setLoading] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { answer: "" }
  });

  const onSubmit = async data => {
    setLoading(true);
    API.createAnswer(question?._id, data, session?.token).then(res => {
      setDialogData({ title: "Resposta enviada!", body: "Sua resposta foi enviada com sucesso!" });
      question?.responses?.push(res.data);
      setOpenAnswer(false);
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    API.deleteQuestion(question?._id, session?.token).then(res => {
      setDialogData({ title: "Dúvida apagada!", body: "Sua dúvida foi apagada com sucesso!", callback: () => navigation.goBack() });
      setIsOpenDelete(false);
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => { setLoading(false); });
  };

  const handleGetQuestion = useCallback((id) => {
    setLoading(true);
    API.getQuestion(id).then(res => {
      setQuestion(res);
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => { setLoading(false); });
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const res = JSON.parse(await AsyncStorage.getItem('QB@user_session_key'));
      setSession(res);
    };
    getSession();
  }, []);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      handleGetQuestion(question?._id);
    });
    return focusHandler;
  }, [navigation]);

  return (
    <>
      <View style={{ backgroundColor: colors.surface, flex: 1 }}>
        <FlatList
          data={question?.responses}
          keyExtractor={(answer, i) => answer?._id}
          contentContainerStyle={{ paddingBottom: 34 }}
          ListEmptyComponent={
            <View style={{ padding: 20 }}>
              <Title style={{ color: colors.semiTransparent, textAlign: "center", fontSize: 20 / ratio, marginBottom: 20 }}>
                {"Nenhuma resposta\npara esta dúvida!"}
              </Title>
            </View>
          }
          renderItem={({ item, index }) =>
            <ResponseCard key={index} session={session} questionId={question?._id} answerIndex={index} owner={session?._id === question?.user?._id} answer={item} ratio={ratio} />}
          ListHeaderComponent={
            <View style={{ backgroundColor: colors.surface, flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <IconButton
                  size={35}
                  color={colors.text}
                  style={{ margin: 0 }}
                  icon="arrow-left-circle-outline"
                  onPress={() => navigation.goBack()}
                />

                {session?._id === question?.user?._id ? (
                  <Menu
                    visible={isOpenMenu}
                    contentStyle={{ borderWidth: 1, borderColor: colors.placeholder }}
                    onDismiss={() => setIsOpenMenu(false)}
                    anchor={
                      <IconButton
                        size={35}
                        color={colors.text}
                        style={{ margin: 0 }}
                        icon="circle-edit-outline"
                        onPress={() => setIsOpenMenu(true)}
                      />
                    }>
                    <Menu.Item icon="circle-edit-outline" onPress={() => { setIsOpenMenu(false); navigation.navigate("CreateQuestion", { question: question }); }} title="Editar dúvida" />
                    <Divider />
                    <Menu.Item icon="close" onPress={() => { setIsOpenMenu(false); setIsOpenDelete(true); }} title="Apagar dúvida" />
                  </Menu>
                ) : null}
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 18 / ratio, flex: 1 }}>Postado por:</Text>
                <Pressable onPress={() => navigation.navigate("Profile", { userID: question?.user?._id, user: session?._id === question?.user?._id ? session : null })} style={{ borderRadius: 8, maxWidth: "50%", backgroundColor: colors.background, flexDirection: "row", alignItems: "center", padding: 5, paddingHorizontal: 15 }}>
                  <Avatar.Text size={30} label={question?.user?.name[0]} labelStyle={{ fontSize: 12 / ratio, fontWeight: "bold" }} />
                  <Text numberOfLines={1} style={{ marginLeft: 10, flex: 1 }}>{question?.user?.name}</Text>
                </Pressable>
              </View>

              <Divider style={{ marginVertical: 30 }} />

              <Title style={{ fontSize: 25 / ratio, marginBottom: 45 }}>{question?.title}</Title>
              <Text style={{ fontSize: 18 / ratio }}>{question?.description}</Text>

              <View style={{ flexWrap: "wrap", marginVertical: 35, flexDirection: "row" }}>
                {question?.tags?.map(tag => (
                  <Chip key={tag._id}
                    textStyle={{ fontSize: 16 / ratio }}
                    onPress={() => navigation.navigate("ListForTag", { TAG: tag })}
                    style={{ backgroundColor: colors.background, marginVertical: 5, paddingHorizontal: 6, paddingVertical: 2, marginHorizontal: 5 }}
                  >
                    {tag.title}
                  </Chip>
                ))}
              </View>
              <Text style={{ fontSize: 18 / ratio, color: colors.success }}>{question?.responses?.length === 1 ? question?.responses?.length + " Resposta" : question?.responses?.length + " Respostas"}</Text>
              <Divider style={{ marginTop: 20 }} />
            </View>
          }
        />

        {question?.user?._id !== session?._id ? (
          <Button
            mode="contained"
            icon="clipboard-check"
            style={{ marginBottom: 20, marginHorizontal: 20 }}
            contentStyle={{ height: 45 }}
            onPress={() => setOpenAnswer(true)}
          >
            Responder
          </Button>
        ) : null}
      </View>

      <Modal animationType="fade" visible={openAnswer} transparent onRequestClose={() => setOpenAnswer(false)}>
        <View style={{ backgroundColor: colors.backModal, flex: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1, alignItems: "center", justifyContent: "center" }} behavior={Platform.OS === "ios" ? "padding" : ""}>
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
                {question?.title}
              </Text>

              <View style={{ marginBottom: 20 }}>
                <Controller name="answer" control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      multiline
                      value={value}
                      mode="outlined"
                      onBlur={onBlur}
                      label="Sua resposta"
                      onChangeText={onChange}
                      style={{ height: 150 }}
                      error={Boolean(errors.answer)}
                      theme={{ colors: { background: colors.surface, primary: colors.text } }}
                    />
                  )}
                />
                <HelperText style={{ marginBottom: 25 }} type="error" visible={Boolean(errors.answer)} >
                  Campo obrigatório
                </HelperText>

                <Button loading={loading} disabled={loading} mode="contained" contentStyle={{ height: 45 }} title="Submit" onPress={handleSubmit(onSubmit)} icon="bookmark-check">Responder</Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <Portal>
        <Dialog visible={isOpenDelete} onDismiss={() => setIsOpenDelete(false)}>
          <Dialog.Title>Você realmente deseja apagar esta dúvida?</Dialog.Title>
          <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
            <Button labelStyle={{ color: colors.error }} onPress={handleDelete}>SIM</Button>
            <Button labelStyle={{ color: colors.text }} onPress={() => setIsOpenDelete(false)}>NÃO</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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