import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Headline, IconButton, Text, useTheme } from "react-native-paper";

import Logo from "../../../assets/Logo.png";

import I1 from "../../../assets/Happy.png";
import I2 from "../../../assets/Projections.png";
import I3 from "../../../assets/Questions.png";
import I4 from "../../../assets/Quiz.png";
import I5 from "../../../assets/Welcome.png";

export const Welcome = () => {
  const { colors, fonts } = useTheme();

  const title = { ...fonts.medium, ...styles.title };
  const span = { ...fonts.medium, ...styles.title, color: colors.warning };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.surface }}>
      {/* <Image resizeMode="contain" source={Logo} style={{ width: 70, height: 70, marginVertical: 10 }} /> */}

      <Headline style={{...title, marginVertical: 20 }}>LOGO</Headline>

      <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal style={{ flex: 1, backgroundColor: colors.surface }}>
        <View style={styles.step}>
          <Image resizeMode="contain" source={I2} style={styles.img} />
          <View>
            <Headline style={span}>Olá mundo!</Headline>
            <Headline style={title}>Seja muito bem-vindo(a) ao nosso APP</Headline>
          </View>
        </View>

        <View style={styles.step}>
          <Image resizeMode="contain" source={I4} style={styles.img} />
          <Headline style={title}>
            A todo momento possuímos <Headline style={span}>dúvidas</Headline> sobre algo, não é mesmo?
          </Headline>
        </View>

        <View style={styles.step}>
          <Image resizeMode="contain" source={I3} style={styles.img} />
          <Headline style={title}>
            Esperamos que voçê consiga tirar <Headline style={span}>todas</Headline> elas aqui!
          </Headline>
        </View>

        <View style={styles.step}>
          <Image resizeMode="contain" source={I1} style={styles.img} />
          <Headline style={title}>
            Faça <Headline style={span}>perguntas</Headline> ou espalhe seu conhecimento na nossa plataforma!
          </Headline>
        </View>

        <View style={styles.step}>
          <Image resizeMode="contain" source={I5} style={styles.img} />
          <Headline style={title}>
            Faça o <Headline style={span}>login</Headline> ou <Headline style={span}>cadastre-se</Headline> para começar!
          </Headline>
        </View>
      </ScrollView>

      <View style={{ alignItems: "center", paddingBottom: 40 }}>
        <IconButton size={70} icon="chevron-right-circle" color={colors.primary} onPress={() => console.log("hi")} />
        <Headline style={{ fontSize: 18 }} >Próximo</Headline>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  step: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    // backgroundColor: "blue"
  },
  img: {
    // borderRadius: 20,
    width: Dimensions.get("screen").width / 1.5,
    height: Dimensions.get("screen").width / 1.5,
  },
  title: {
    textAlign: "center",
    marginHorizontal: 20,
  }
});