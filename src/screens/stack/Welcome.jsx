import { useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Headline, IconButton, useTheme } from "react-native-paper";

import I1 from "../../../assets/Happy.png";
import I2 from "../../../assets/Projections.png";
import I3 from "../../../assets/Questions.png";
import I4 from "../../../assets/Quiz.png";
import I5 from "../../../assets/Welcome.png";

export const Welcome = ({ navigation }) => {
  const { colors, fonts } = useTheme();

  // const step = useRef(1);
  const scrollRef = useRef();
  const [step, setStep] = useState(1);

  const title = { ...fonts.medium, ...styles.title };
  const span = { ...fonts.medium, ...styles.title, color: colors.warning };

  const handleNextStep = () => {
    scrollRef.current.scrollTo({ x: Dimensions.get("screen").width * step, y: 0, animated: true });
    // step.current = step.current + 1;
    setStep(prev => prev + 1);
  };

  // console.warn("render!");

  return (
    <View style={styles.container}>
      <Headline style={{ ...title, marginVertical: 20 }}>LOGO</Headline>

      <ScrollView scrollEnabled={false} ref={scrollRef} showsHorizontalScrollIndicator={false} pagingEnabled horizontal style={{ flex: 1 }}>
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

      <View style={{ paddingBottom: 40, width: "100%" }}>
        {step < 5 ? (
          <View style={{ alignItems: "center" }}>
            <IconButton size={70} icon="chevron-right-circle" color={colors.primary} onPress={handleNextStep} />
            <Headline style={{ fontSize: 18 }} onPress={handleNextStep}>Próximo</Headline>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 40, paddingTop: 20 }}>
            <Button contentStyle={{ height: 55 }} style={{ marginBottom: 20 }} icon="login" mode="contained" onPress={() => navigation.navigate("SignIn")}>
              Fazer login
            </Button>

            <Button contentStyle={{ height: 55 }} icon="account-arrow-right" mode="outlined" onPress={() => navigation.navigate("SignUp")}>
              Fazer cadastro
            </Button>
          </View>
        )}
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
    alignItems: "center",
    justifyContent: "space-evenly",
    width: Dimensions.get("screen").width,
  },
  img: {
    width: Dimensions.get("screen").width / 1.5,
    height: Dimensions.get("screen").width / 1.5,
  },
  title: {
    textAlign: "center",
    marginHorizontal: 20,
  }
});