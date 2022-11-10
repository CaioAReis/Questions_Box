import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet, PixelRatio, ScrollView, Modal, Dimensions, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { Avatar, Text, Button, Divider, IconButton, Title, useTheme, TextInput, List, HelperText } from 'react-native-paper';
import { TagCard } from '../components';

const ratio = PixelRatio.getFontScale();

export const Tags = ({ navigation }) => {
  const { colors, fonts } = useTheme();
  const span = { ...fonts.medium, color: colors.primary };
  const [openCreateTag, setOpenCreateTag] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { title: "", description: "" }
  });
  const onSubmit = data => {
    console.warn(data);
  };

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.surface }}>
        <View style={{ ...styles.header, backgroundColor: colors.background }}>
          <IconButton
            size={35}
            color={colors.text}
            icon="arrow-left-circle-outline"
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: colors.background, margin: 0 }}
          />
          <Title style={{ fontSize: 20 / ratio }}>TAGs</Title>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Avatar.Text size={40} label="CA" labelStyle={{ fontSize: 16 / ratio }} />
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          <Text style={{ color: colors.text, textAlign: "center", fontSize: 16 / ratio, paddingTop: 40, paddingBottom: 25 }}>
            As <Text style={span}>TAGs</Text> são ultilizadas
            para categorizar as dúvidas na plataforma.
            Utilizando as TAGS <Text style={span}>corretas</Text> as outras
            pessoas <Text style={span}>encontrarão</Text> e <Text style={span}>responderão</Text> mais facilmente sua dúvida!
          </Text>

          <Divider style={{ marginBottom: 20 }} />

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 25 }}>
            <Title style={{ fontSize: 18 / ratio }}>TAGs populares:</Title>
            <Button onPress={() => setOpenCreateTag(true)} icon="plus-circle" labelStyle={{ fontSize: 12 / ratio }} mode="contained">Criar TAG</Button>
          </View>

          <TagCard name="Java" description="Aaushd ia aiushda hsda isudiausd iaus d" qtdQuestions={12} />
          <TagCard name="HTML" description="Aaushd ia aiushda hsda isudiausd iaus d" qtdQuestions={12} />
          <TagCard name="CSS" description="Aaushd ia aiushda hsda isudiausd iaus d" qtdQuestions={12} />

        </View>
      </ScrollView>

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

                <Button mode="contained" contentStyle={{ height: 45 }} title="Submit" onPress={handleSubmit(onSubmit)} icon="plus">Criar tag</Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
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