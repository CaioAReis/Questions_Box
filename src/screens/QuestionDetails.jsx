import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, KeyboardAvoidingView, Modal, PixelRatio, Pressable, View } from "react-native";
import { Avatar, Button, Chip, Divider, HelperText, IconButton, Text, TextInput, Title, useTheme } from "react-native-paper";
import { ResponseCard } from "../components";

const ratio = PixelRatio.getFontScale();

export const QuestionDetails = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { question } = route?.params;
  const [sessionID, setSessionID] = useState("");
  const [openAnswer, setOpenAnswer] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { response: "" }
  });
  
  const onSubmit = data => {
    console.warn(data);
  };

  useEffect(() => {
    const getSession = async () => {
      const session = JSON.parse(await AsyncStorage.getItem('QB@user_session_key'));
      setSessionID(session?._id);
    };
    getSession();
  }, []);

  
  return (
    <>
      <View style={{ backgroundColor: colors.surface, flex: 1 }}>
        <FlatList
          data={question?.responses}
          keyExtractor={answer => answer._id}
          contentContainerStyle={{ paddingBottom: 34 }}
          ListEmptyComponent={
            <View style={{ padding: 20 }}>
              <Title style={{ color: colors.semiTransparent, textAlign: "center", fontSize: 20 / ratio, marginBottom: 20 }}>
                {"Nenhuma resposta\npara esta dúvida!"}
              </Title>
            </View>
          }
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

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 18 / ratio, flex: 1 }}>Postado por:</Text>

                <Pressable onPress={() => navigation.navigate("Profile", { userID: question?.user?._id })} style={{ borderRadius: 8, maxWidth: "50%", backgroundColor: colors.background, flexDirection: "row", alignItems: "center", padding: 5, paddingHorizontal: 15 }}>
                  <Avatar.Text size={30} label={question?.user?.name[0]} labelStyle={{ fontSize: 12 / ratio, fontWeight: "bold" }} />
                  <Text numberOfLines={1} style={{ marginLeft: 10, }}>{question?.user?.name}</Text>
                </Pressable>
              </View>

              <Divider style={{ marginVertical: 30 }} />

              <Title style={{ fontSize: 25 / ratio, marginBottom: 45 }}>
                {question?.title}
              </Title>

              <Text style={{ fontSize: 18 / ratio }}>
                {question?.description}
              </Text>

              <View style={{ flexWrap: "wrap", marginVertical: 35, flexDirection: "row" }}>
                {question?.responses?.map(tag => (
                  <Chip
                    textStyle={{ fontSize: 16 / ratio }}
                    onPress={() => navigation.navigate("ListForTag", { TAG: { title: "IFS" } })}
                    style={{ backgroundColor: colors.background, paddingHorizontal: 6, paddingVertical: 2, marginHorizontal: 5 }}
                  >
                    {tag.title}
                  </Chip>
                ))}
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 18 / ratio, color: colors.success }}>{question?.responses?.length === 1 ? question?.responses?.length + " Resposta" : question?.responses?.length + " Respostas"}</Text>

                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                </View> */}
              </View>
              <Divider style={{ marginTop: 20 }} />
            </View>
          }
        />

        {question?.user?._id !== sessionID ? (
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
                Onde fica a CRE do campus Lagarto?
              </Text>

              <View style={{ marginBottom: 20 }}>

                <Controller name="title" control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      multiline
                      value={value}
                      mode="outlined"
                      onBlur={onBlur}
                      label="Sua resposta"
                      onChangeText={onChange}
                      error={Boolean(errors.title)}
                      style={{ height: 150 }}
                      theme={{ colors: { background: colors.surface, primary: colors.text } }}
                    />
                  )}
                />
                <HelperText style={{ marginBottom: 25 }} type="error" visible={Boolean(errors.title)} >
                  Campo obrigatório
                </HelperText>

                <Button mode="contained" contentStyle={{ height: 45 }} title="Submit" onPress={handleSubmit(onSubmit)} icon="bookmark-check">Responder</Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}