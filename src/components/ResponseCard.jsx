import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Avatar, Button, Dialog, Divider, HelperText, IconButton, Menu, Modal, Portal, Text, TextInput, Title, useTheme } from "react-native-paper";
import { API } from "../services/api";

export const ResponseCard = ({ answer, reload, session, ratio, owner, answerIndex, questionId }) => {
  const { colors } = useTheme();
  const d = new Date(answer?.createdAt);
  const [ loading, setLoading ] = useState(false);
  const [ openAnswer, setOpenAnswer ] = useState(false);
  const [ dialogData, setDialogData ] = useState(null);
  const [ bestAnswer, setBestAnswer ] = useState(false);
  const [ isOpenMenu, setIsOpenMenu ] = useState(false);
  const [ isOpenDeleteAnswer, setIsOpenDeleteAnswer ] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { answer: answer?.answer }
  });

  const handleBestAnswer = async () => {
    const body = { currentState: answer?.bestAnswer }

    API.bestAnswer(questionId, answerIndex, body, session?.token).then(res => {
      answer?.bestAnswer
        ? setDialogData({ title: "Melhor resposta retirada", body: "Marcação de melhor resposta foi retirada!" })
        : setDialogData({ title: "Melhor resposta definida!", body: "A melhor resposta foi definida!" });
      answer.bestAnswer = !answer.bestAnswer;
      setBestAnswer(false);
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    })
  };

  const handleDeleteAnswer = () => {
    setIsOpenDeleteAnswer(false);
    setLoading(true);
    API.deleteAnswer(questionId, answer?._id, session?.token).then(res => {
      setDialogData({ title: "Resposta removida!", body: "Resposta removida com sucesso!", callback: () => reload(questionId) });
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => { setLoading(false); });
  };

  const onSubmit = data => {
    setLoading(true);
    API.editAnswer(questionId, answer._id, data, session?.token).then(res => {
      answer.answer = data?.answer;
      setOpenAnswer(false);
      setDialogData({ title: "Resposta editada!", body: "Resposta editada com sucesso!" });
    }).catch(err => {
      setOpenAnswer(false);
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => { setLoading(false); });
  };

  return (
    <>
      <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 11 / ratio, marginBottom: 10 }}>{`${d.getUTCDate() < 10 ? "0" + d.getUTCDate() : d.getUTCDate()}/${d.getUTCMonth() + 1 < 10 ? "0" + (d.getUTCMonth() + 1) : d.getUTCMonth() + 1}/${d.getFullYear()} - ${d.getHours() < 10 ? "0" + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}`}</Text>
        <View style={{ backgroundColor: colors.background, padding: 10, borderRadius: 8, borderWidth: 2, borderColor: answer.bestAnswer ? colors.success : colors.background }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 14 / ratio, flex: 1 }}>{answer?.answer}</Text>
            <Menu
              visible={isOpenMenu}
              onDismiss={() => setIsOpenMenu(false)}
              contentStyle={{ borderWidth: 1, borderColor: colors.placeholder }}
              anchor={
                (answer?.user?._id === session?._id) || owner ?
                  <IconButton
                    size={25}
                    icon="dots-vertical"
                    color={colors.text}
                    style={{ margin: 0 }}
                    onPress={() => setIsOpenMenu(true)}
                  />
                  : null
              }>
              <Menu.Item icon="clipboard-edit-outline" onPress={() => { setIsOpenMenu(false); setOpenAnswer(true); }} title="Editar resposta" />
              {owner ? (
                <Menu.Item icon="checkbox-marked-circle" onPress={() => { setIsOpenMenu(false); setBestAnswer(true); }} title="Melhor resposta" />
              ) : null}
              <Divider />
              <Menu.Item titleStyle={{ color: colors.error }} icon="trash-can-outline" onPress={async () => { setIsOpenMenu(false); setIsOpenDeleteAnswer(true); }} title="Apagar resposta" />
            </Menu>

          </View>
          <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Text size={40} label={answer?.user?.name[ 0 ]} labelStyle={{ fontSize: 16 / ratio }} />
              <Title style={{ fontSize: 14 / ratio, marginLeft: 10 }}>{answer?.user?.name}</Title>
            </View>
            {answer.bestAnswer &&
              <Title style={{ fontSize: 14 / ratio, color: colors.success }}>MELHOR RESPOSTA</Title>
            }
          </View>
        </View>
      </View>

      <Portal>
        <Dialog visible={bestAnswer} onDismiss={() => setBestAnswer(false)}>
          {answer?.bestAnswer
            ? <Dialog.Title>Remover marcação de melhor resposta?</Dialog.Title>
            : <Dialog.Title>Definir como a melhor resposta?</Dialog.Title>
          }
          <Dialog.Content>
            <Text>{answer?.answer}</Text>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
            <Button labelStyle={{ color: colors.success }} onPress={handleBestAnswer}>SIM</Button>
            <Button onPress={() => setBestAnswer(false)}>NÃO</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={isOpenDeleteAnswer} onDismiss={() => setIsOpenDeleteAnswer(false)}>
          <Dialog.Title>Apagar resposta?</Dialog.Title>
          <Dialog.Content>
            <Text>Você realmente deseja apagar sua resposta?</Text>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
            <Button color={colors.error} onPress={handleDeleteAnswer}>SIM</Button>
            <Button color={colors.text} onPress={() => setIsOpenDeleteAnswer(false)}>NÃO</Button>
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

      <Portal>
        <Modal visible={openAnswer} onDismiss={() => setOpenAnswer(false)}>
          <KeyboardAvoidingView style={{ alignItems: "center", justifyContent: "center" }} behavior={Platform.OS === "ios" ? "padding" : ""}>
            <View style={{ padding: 20, width: "90%", borderRadius: 20, backgroundColor: colors.background }}>
              <View style={{ position: "relative", marginBottom: 30 }}>
                <Title style={{ textAlign: "center", }}>Editar Resposta</Title>
                <IconButton
                  size={30}
                  icon="close-circle-outline"
                  color={colors.error} onPress={() => setOpenAnswer(false)}
                  style={{ position: "absolute", margin: 0, top: -10, right: 0 }}
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <Controller name="answer" control={control}
                  rules={{ required: "Campo obrigatório" }}
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
                {Boolean(errors.answer) ? (
                  <HelperText style={{ marginBottom: 25 }} type="error" visible={Boolean(errors.answer)}>{errors.answer.message}</HelperText>
                ) : null}

                <Button loading={loading} disabled={loading} style={{ marginTop: 20 }} mode="contained" contentStyle={{ height: 45 }} title="Submit" onPress={handleSubmit(onSubmit)} icon="bookmark-check">Salvar alteração</Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </Portal>
    </>
  );
}