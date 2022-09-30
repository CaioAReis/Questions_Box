import React from 'react'
import { View, StyleSheet, PixelRatio } from "react-native";
import { Avatar, Text, Button, Divider, IconButton, Surface, Title, useTheme } from 'react-native-paper';
import { TagCard } from '../components';

const ratio = PixelRatio.getFontScale();

export const Tags = ({ navigation }) => {
  const { colors, fonts } = useTheme();

  const span = { ...fonts.medium, color: colors.primary };

  return (
    <Surface style={{ flex: 1 }}>
      <View style={{ ...styles.header, backgroundColor: colors.background }}>
        <IconButton
          size={35}
          icon="arrow-left-circle-outline"
          color={colors.text}
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: colors.background, margin: 0 }}
        />
        <Title style={{ fontSize: 20 / ratio }}>TAGs</Title>
        <Avatar.Text size={40} label="CA" labelStyle={{ fontSize: 16 / ratio }} />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ color: colors.text, textAlign: "center", fontSize: 16 / ratio, paddingTop: 40, paddingBottom: 25 }}>
          As <Text style={span}>TAGs</Text> são ultilizadas
          para categorizar as dúvidas na plataforma.
          Utilizando as TAGS <Text style={span}>corretas</Text> as outras
          pessoas <Text style={span}>encontrarão</Text> e <Text style={span}>responderão</Text> mais facilmente sua dúvida!
        </Text>

        <Divider style={{ marginBottom: 20 }} />

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 25 }}>
          <Title style={{ fontSize: 18 / ratio }}>TAGs populares:</Title>
          <Button icon="plus-circle" labelStyle={{ fontSize: 12 / ratio }} mode="contained">Criar TAG</Button>
        </View>

        <TagCard />
        <TagCard />
        <TagCard />

      </View>
    </Surface>
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
});