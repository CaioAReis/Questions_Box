import { useRef, useState } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, View, PixelRatio } from "react-native";
import { Button, IconButton, Title, useTheme } from "react-native-paper";

import mancha from "../../assets/mancha.png";
import I1 from "../../assets/Happy.png";
import I2 from "../../assets/Projections.png";
import I3 from "../../assets/Questions.png";
import I4 from "../../assets/Quiz.png";
import I5 from "../../assets/Welcome.png";

const ratio = PixelRatio.getFontScale();

export const Welcome = ({ navigation }) => {
  const imgDimensions = Dimensions.get("window").width / 3.5;
  const { colors, fonts, logos } = useTheme();

  const scrollRef = useRef();
  const [step, setStep] = useState(1);

  const title = { ...fonts.medium, ...styles.title };
  const span = { ...fonts.medium, ...styles.title, color: colors.primary };

  const handleNextStep = () => {
    scrollRef.current.scrollTo({ x: Dimensions.get("screen").width * step, y: 0, animated: true });
    setStep(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Image source={logos[1]} resizeMode="contain" style={{ marginTop: 40, width: imgDimensions, height: imgDimensions }} />

      <ScrollView scrollEnabled={false} ref={scrollRef} showsHorizontalScrollIndicator={false} pagingEnabled horizontal style={{ paddingVertical: 20, flex: 1 }}>
        <View style={styles.step}>
          <ImageBackground imageStyle={{ opacity: 0.7 }} resizeMode="stretch" source={mancha}>
            <Image resizeMode="contain" source={I2} style={styles.img} />
          </ImageBackground>
          <View>
            <Title style={span}>Olá mundo!</Title>
            <Title style={title}>Seja muito bem-vindo(a) ao nosso APP</Title>
          </View>
        </View>

        <View style={styles.step}>
          <ImageBackground imageStyle={{ opacity: 0.7 }} resizeMode="stretch" source={mancha}>
            <Image resizeMode="contain" source={I4} style={styles.img} />
          </ImageBackground>
          <Title style={title}>
            A todo momento possuímos <Title style={span}>dúvidas</Title> sobre algo, não é mesmo?
          </Title>
        </View>

        <View style={styles.step}>
          <ImageBackground imageStyle={{ opacity: 0.7 }} resizeMode="stretch" source={mancha}>
            <Image resizeMode="contain" source={I3} style={styles.img} />
          </ImageBackground>
          <Title style={title}>
            Esperamos que voçê consiga tirar <Title style={span}>todas</Title> elas aqui!
          </Title>
        </View>

        <View style={styles.step}>
          <ImageBackground imageStyle={{ opacity: 0.7 }} resizeMode="stretch" source={mancha}>
            <Image resizeMode="contain" source={I1} style={styles.img} />
          </ImageBackground>
          <Title style={title}>
            Faça <Title style={span}>perguntas</Title> ou tire as dúvidas da galera!
          </Title>
        </View>

        <View style={styles.step}>
          <ImageBackground imageStyle={{ opacity: 0.7 }} resizeMode="stretch" source={mancha}>
            <Image resizeMode="contain" source={I5} style={styles.img} />
          </ImageBackground>
          <Title style={title}>
            <Title style={span}>Entre</Title> ou <Title style={span}>cadastre-se</Title> para começar!
          </Title>
        </View>
      </ScrollView>

      <View style={{ paddingBottom: 20, width: "100%" }}>
        {step < 5 ? (
          <View style={{ alignItems: "center" }}>
            <IconButton size={70} icon="arrow-right-circle" color={colors.primary} onPress={handleNextStep} />
          </View>
        ) : (
          <View style={{ paddingHorizontal: 40, paddingTop: 20 }}>
            <Button contentStyle={{ height: 45 }} style={{ marginBottom: 20 }} icon="login" mode="contained" onPress={() => navigation.navigate("SignIn")}>
              Fazer login
            </Button>

            <Button contentStyle={{ height: 45 }} icon="account-arrow-right" mode="text" onPress={() => navigation.navigate("SignUp")}>
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
    justifyContent: "space-around",
    width: Dimensions.get("screen").width,
  },
  img: {
    width: Dimensions.get("screen").width / 1.9,
    height: Dimensions.get("screen").width / 1.9,
  },
  title: {
    textAlign: "center",
    fontSize: 20 / ratio,
    paddingHorizontal: 40,
    lineHeight: 30 / ratio,
  }
});