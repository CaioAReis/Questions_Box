import { View, StyleSheet, Image, FlatList, PixelRatio } from "react-native";
import { Avatar, Chip, Divider, FAB, Title, useTheme } from "react-native-paper";
import { QuestionCard } from "../components";

const ratio = PixelRatio.getFontScale();

export const Home = ({ navigation }) => {
  const { colors, logos } = useTheme();

  const list = [
    {
      _id: "1",
      qtdAnsers: 2,
      date: "15/09/2022 - 20:07",
      tags: ["IFS", "Lagarto"],
      title: "Onde fica a CRE do campus Lagarto?",
    },

    {
      _id: "2",
      qtdAnsers: 12,
      tags: ["Cartão", "Clonar"],
      date: "15/09/2022 - 20:07",
      title: "Como clonar um cartão?",
    },

    {
      _id: "3",
      qtdAnsers: 0,
      date: "15/09/2022 - 20:07",
      tags: ["Compra", "Trailer"],
      title: "Onde posso comprar um trailer?",
    },

    {
      _id: "4",
      qtdAnsers: 4,
      date: "15/09/2022 - 20:07",
      tags: ["Pokemon", "Shiny"],
      title: "Como encontrar um pokemon shiny?",
    },

    {
      _id: "5",
      qtdAnsers: 1,
      date: "15/09/2022 - 20:07",
      tags: ["Gato", "Elétrico"],
      title: "Como fazer um gato elétrico sem tomar choque⚡?",
    }

  ];

  const tags = [
    { title: "Java" },
    { title: "SQL" },
    { title: "JavaScript" },
    { title: "HTML" },
    { title: "CSS" },
    { title: "React" },
    { title: "IFS" },
    { title: "NodeJS" },
  ];

  return (
    <View style={{ backgroundColor: colors.background }}>
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={question => question._id}
        contentContainerStyle={{ paddingBottom: 34, backgroundColor: colors.surface }}
        renderItem={({ item }) => <QuestionCard nav={navigation} question={item} ratio={ratio} />}
        ListHeaderComponent={
          <View>
            <View style={{ ...styles.header, backgroundColor: colors.background }}>
              <View style={{ alignItems: "center" }}>
                <Image source={logos[3]} resizeMode="contain" style={{ width: 140, height: 50 }} />
              </View>
              <Avatar.Text size={40} label="CA" labelStyle={{ fontSize: 16 / ratio }} />
            </View>

            <View style={{ padding: 20 }}>
              <Title style={{ fontSize: 20 / ratio }}>Tags populares:</Title>
              <View style={styles.tagsView}>
                {tags.map(tag => (
                  <Chip
                    key={tag.title}
                    textStyle={{ fontSize: 14 / ratio }}
                    onPress={() => console.log('Pressed')}
                    style={{ margin: 4, backgroundColor: colors.background }}>
                    {tag.title}
                  </Chip>
                ))}

                <Chip
                  icon="plus"
                  mode="outlined"
                  onPress={() => navigation.navigate("Tags")}
                  theme={{ colors: { text: colors.primary } }}
                  style={{ margin: 4, borderColor: colors.primary }}>
                  Tags
                </Chip>

                <Divider />
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <Title style={{ fontSize: 20 / ratio }}>Dúvidas recentes:</Title>
            </View>
          </View>
        }
      />
      <FAB
        icon="plus"
        animated={true}
        label="Postar dúvida"
        onPress={() => console.log('Pressed')}
        style={{ ...styles.fab, backgroundColor: colors.primary }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: {
    padding: 20,
  },
  tagsView: {
    flexWrap: "wrap",
    marginVertical: 15,
    flexDirection: "row",
  },
  fab: {
    right: 8,
    margin: 16,
    bottom: 10,
    position: "absolute",
  },
});