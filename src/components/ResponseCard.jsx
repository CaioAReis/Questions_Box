import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Avatar, Button, Dialog, Portal, Text, Title, useTheme } from "react-native-paper";
import { API } from "../services/api";

export const ResponseCard = ({ answer, ratio, owner, answerIndex, questionId }) => {
  const { colors } = useTheme();
  const d = new Date(answer?.createdAt);
  const [dialogData, setDialogData] = useState(null);
  const [bestAnswer, setBestAnswer] = useState(false);

  const handleSubmit = async () => {

    // return console.warn(answerIndex);

    const session = JSON.parse(await AsyncStorage.getItem('QB@user_session_key'));
    API.bestAnswer(questionId, answerIndex, session?.token).then(res => {
      setDialogData({ title: "Melhor resposta definida!", body: "A melhor resposta foi definida!" });
      answer.bestAnswer = true;
      setBestAnswer(false);
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    });
  };

  return (
    <>
      <Pressable style={{ marginBottom: 20, marginHorizontal: 20 }} onPress={owner ? () => setBestAnswer(true) : null}>
        <Text style={{ fontSize: 11 / ratio, marginBottom: 10 }}>{`${d.getUTCDate() < 10 ? "0" + d.getUTCDate() : d.getUTCDate()}/${d.getUTCMonth() + 1 < 10 ? "0" + (d.getUTCMonth() + 1) : d.getUTCMonth() + 1}/${d.getFullYear()} - ${d.getHours() < 10 ? "0" + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}`}</Text>
        <View style={{ backgroundColor: colors.background, padding: 10, borderRadius: 8, borderWidth: 2, borderColor: answer.bestAnswer ? colors.success : colors.background }}>
          <Text style={{ fontSize: 14 / ratio }}>{answer?.answer}</Text>
          <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Text size={40} label={answer?.user?.name[0]} labelStyle={{ fontSize: 16 / ratio }} />
              <Title style={{ fontSize: 14 / ratio, marginLeft: 10 }}>{answer?.user?.name}</Title>
            </View>
            {answer.bestAnswer &&
              <Title style={{ fontSize: 14 / ratio, color: colors.success }}>MELHOR RESPOSTA</Title>
            }
          </View>
        </View>
      </Pressable>

      <Portal>
        <Dialog visible={bestAnswer} onDismiss={() => setBestAnswer(false)}>
          <Dialog.Title>Definir como a melhor resposta?</Dialog.Title>
          <Dialog.Content>
            <Text>{answer?.answer}</Text>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
            <Button labelStyle={{ color: colors.success }} onPress={handleSubmit}>SIM</Button>
            <Button onPress={() => setBestAnswer(false)}>NÃO</Button>
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