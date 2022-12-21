import { View, StyleSheet, Image, FlatList, PixelRatio, Pressable } from "react-native";
import { Avatar, Button, Chip, Divider, FAB, Title, useTheme } from "react-native-paper";
import { QuestionCard } from "../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

const ratio = PixelRatio.getFontScale();

export const Home = ({ navigation }) => {
  const { colors, logos } = useTheme();
  const [session, setSession] = useState(null);

  const list = [
    {
      _id: "1",
      qtdAnsers: 2,
      date: "15/09/2022 - 20:07",
      tags: [{ title: "IFS" }, { title: "Lagarto" }],
      title: "Onde fica a CRE do campus Lagarto?",
    },

    {
      _id: "2",
      qtdAnsers: 12,
      tags: [{ title: "Cartão" }, { title: "Clonar" }],
      date: "15/09/2022 - 20:07",
      title: "Como clonar um cartão?",
    },

    {
      _id: "3",
      qtdAnsers: 0,
      date: "15/09/2022 - 20:07",
      tags: [{ title: "Compra" }, { title: "Trailer" }],
      title: "Onde posso comprar um trailer?",
    },

    {
      _id: "4",
      qtdAnsers: 4,
      date: "15/09/2022 - 20:07",
      tags: [{ title: "Pokemon" }, { title: "Shiny" }],
      title: "Como encontrar um pokemon shiny?",
    },

    {
      _id: "5",
      qtdAnsers: 1,
      date: "15/09/2022 - 20:07",
      tags: [{ title: "Gato" }, { title: "Elétrico" }],
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

  useEffect(() => {
    const x = async () => {
      const value = await AsyncStorage.getItem('QB@user_session_key');
      setSession(JSON.parse(value));
    }
    x();
  }, []);

  return (
    <View style={{ backgroundColor: colors.surface, height: "100%" }}>
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={question => question._id}
        contentContainerStyle={{ paddingBottom: 34, backgroundColor: colors.surface }}
        renderItem={({ item }) => <QuestionCard nav={navigation} question={item} ratio={ratio} />}
        ListEmptyComponent={
          <View style={{ padding: 20 }}>
            <Title style={{ color: colors.semiTransparent, textAlign: "center", fontSize: 20 / ratio, marginBottom: 20 }}>
              Nenhuma dúvida postada!
            </Title>
          </View>
        }
        ListHeaderComponent={
          <View>
            <View style={{ ...styles.header, backgroundColor: colors.background }}>
              <View style={{ alignItems: "center" }}>
                <Image source={logos[3]} resizeMode="contain" style={{ width: 140, height: 50 }} />
              </View>
              <Pressable onPress={() => navigation.navigate("Profile", { userID: session?._id, user: session })}>
                <Avatar.Text size={40} label={Boolean(session) ? session?.name[0]?.toUpperCase() : "QB"} labelStyle={{ fontSize: 16 / ratio }} />
              </Pressable>
            </View>

            <View style={{ padding: 20 }}>
              <Title style={{ fontSize: 20 / ratio }}>Tags populares:</Title>
              <View style={styles.tagsView}>
                {tags.map(tag => (
                  <Chip
                    key={tag.title}
                    textStyle={{ fontSize: 14 / ratio }}
                    style={{ margin: 4, backgroundColor: colors.background }}
                    onPress={() => navigation.navigate("ListForTag", { TAG: tag })}>
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
        onPress={() => navigation.navigate("CreateQuestion")}
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