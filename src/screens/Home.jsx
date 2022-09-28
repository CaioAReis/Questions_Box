import { View, StyleSheet, Image, FlatList, PixelRatio } from "react-native";
import { Avatar, Chip, Divider, FAB, IconButton, Surface, Text, Title, useTheme } from "react-native-paper";

const ratio = PixelRatio.getFontScale();

export const Home = () => {
  const { colors, logos } = useTheme();

  const list = [
    {
      _id: "1",
      qtdAnsers: 2,
      date: "15/09/2022 - 20:07",
      tags: ["IFS", "CRE", "Lagarto"],
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
    { title: "Flutter" },
    { title: "NodeJS" },
  ];

  return (
    <Surface style={styles.container}>
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={question => question._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <View>
            <View style={{ ...styles.header, backgroundColor: colors.background }}>
              <View style={{ alignItems: "center" }}>
                <Image source={logos[3]} resizeMode="contain" style={{ width: 140, height: 50 }} />
              </View>
              <Avatar.Image size={40} source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cgmagonline.com%2Fwp-content%2Fuploads%2F2017%2F03%2Fsuper-bomberman-r-review-not-a-total-bomb.jpg&f=1&nofb=1" }} />
            </View>

            <View style={{ padding: 20 }}>
              <Title style={{ fontSize: 20 / ratio }}>Tags populares:</Title>
              <View style={styles.tagsView}>
                {tags.map(tag => (
                  <Chip key={tag.title} textStyle={{ fontSize: 14 / ratio }} style={{ margin: 4, backgroundColor: colors.background }} onPress={() => console.log('Pressed')}>{tag.title}</Chip>
                ))}
               
                <Chip icon="plus" mode="outlined" theme={{ colors: { text: colors.primary } }} style={{ margin: 4, borderColor: colors.primary }} onPress={() => console.log('Pressed')}>Mais tags</Chip><Divider />
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <Title style={{ fontSize: 20 / ratio }}>Dúvidas recentes:</Title>
            </View>
          </View>
        }

        renderItem={({ item }) => (
          <View style={{ position: "relative", marginHorizontal: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 10 / ratio }}>{item?.date}</Text>
            <View style={{ backgroundColor: colors.background, ...styles.post }}>
              <View style={{ flex: 1, marginRight: 10, paddingTop: 10 }}>
                <Title numberOfLines={2} style={{ fontSize: 14 / ratio, lineHeight: 22 }}>{item?.title}</Title>
                <View style={styles.tagsView}>
                  {item?.tags.map(tag =>
                    <Chip key={tag} mode="outlined" textStyle={{ fontSize: 12 / ratio }} style={{ backgroundColor: colors.background, marginRight: 4, marginBottom: 4 }} onPress={() => console.log('Pressed')}>{tag}</Chip>
                  )}
                </View>
              </View>

              <View style={{ width: 2, height: "100%", backgroundColor: colors.surface }} />

              <View style={{ alignItems: "center", marginLeft: 10 }}>
                <Title style={{ fontSize: 16 / ratio, color: colors.success }}>{item.qtdAnsers > 1000 ? "+999" : item?.qtdAnsers}</Title>
                <Title style={{ fontSize: 12 / ratio, lineHeight: 12, color: colors.success }}>{item.qtdAnsers === 1 ? "Resposta" : "Respostas"}</Title>

                <View style={{ flexDirection: "row", }}>
                  <IconButton
                    size={20}
                    icon="thumb-up"
                    color={colors.semiTransparent}
                    onPress={() => console.log('Pressed')}
                    style={{ backgroundColor: colors.background }}
                  />
                  <IconButton
                    size={20}
                    icon="thumb-down"
                    color={colors.semiTransparent}
                    onPress={() => console.log('Pressed')}
                    style={{ backgroundColor: colors.background }}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <FAB
        icon="plus"
        animated={true}
        label="Postar dúvida"
        onPress={() => console.log('Pressed')}
        style={{ ...styles.fab, backgroundColor: colors.primary }}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  post: {
    marginTop: 5,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  fab: {
    right: 10,
    margin: 16,
    bottom: 20,
    position: "absolute",
  },
});