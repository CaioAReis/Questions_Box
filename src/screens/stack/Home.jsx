import { View, StyleSheet } from "react-native";
import { Avatar, Chip, Divider, Headline, IconButton, Surface, Text, Title, useTheme } from "react-native-paper";

export const Home = () => {
  const { colors } = useTheme();

  return (
    <Surface style={styles.container}>
      <View style={{ ...styles.header, backgroundColor: colors.background }}>
        <Headline>LOGO</Headline>
        <Avatar.Image size={40} source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cgmagonline.com%2Fwp-content%2Fuploads%2F2017%2F03%2Fsuper-bomberman-r-review-not-a-total-bomb.jpg&f=1&nofb=1" }} />
      </View>

      <View style={styles.body}>
        <View>
          <Title>Tags populares:</Title>
          <View style={styles.tagsView}>
            <Chip style={{ margin: 4, backgroundColor: colors.background }} onPress={() => console.log('Pressed')}>Java</Chip>
            <Chip style={{ margin: 4, backgroundColor: colors.background }} onPress={() => console.log('Pressed')}>PHP</Chip>
            <Chip style={{ margin: 4, backgroundColor: colors.background }} onPress={() => console.log('Pressed')}>JavaScript</Chip>
            <Chip style={{ margin: 4, backgroundColor: colors.background }} onPress={() => console.log('Pressed')}>HTML</Chip>
            <Chip style={{ margin: 4, backgroundColor: colors.background }} onPress={() => console.log('Pressed')}>CSS</Chip>
            <Chip style={{ margin: 4, backgroundColor: colors.background }} onPress={() => console.log('Pressed')}>Pokémon</Chip>
            <Chip style={{ margin: 4, backgroundColor: colors.background }} onPress={() => console.log('Pressed')}>One Piece</Chip><Divider />

            <Chip icon="plus" mode="outlined" theme={{ colors: { text: colors.warning } }} style={{ margin: 4, borderColor: colors.warning }} onPress={() => console.log('Pressed')}>Mais tags</Chip><Divider />
          </View>
        </View>

        <Divider style={{ marginVertical: 20 }} />

        <View>
          <Title>Dúvidas recentes:</Title>

          <View style={{ marginTop: 15, position: "relative" }}>
            <Text style={{ fontSize: 10 }} >15/09/2022 - 20:07</Text>
            <View style={{ backgroundColor: colors.background, ...styles.post }}>
              <View style={{ flex: 1, marginRight: 10, paddingTop: 10 }}>
                <Title numberOfLines={2} style={{ fontSize: 14, lineHeight: 22 }}>Como faço da declarar uma variável no HTML?</Title>
                <View style={styles.tagsView}>
                  <Chip mode="outlined" textStyle={{ fontSize: 12 }} style={{ backgroundColor: colors.background, marginRight: 4, marginBottom: 4 }} onPress={() => console.log('Pressed')}>HTML</Chip>
                </View>
              </View>

              <View style={{ width: 2, height: "100%", backgroundColor: colors.surface }} />

              <View style={{ alignItems: "center", marginLeft: 10, }}>
                <Title style={{ fontSize: 16, color: colors.success }}>{true ? "+999" : "0"}</Title>
                <Title style={{ fontSize: 12, color: colors.success }}>{false ? "Resposta" : "Respostas"}</Title>
              </View>
            </View>

            <View style={{ flexDirection: "row", position: "absolute", bottom: -6, right: 38 }}>
              <IconButton
                size={25}
                color={colors.semiWhite}
                icon="thumb-up"
                onPress={() => console.log('Pressed')}
                style={{ backgroundColor: colors.background }}
              />
              <IconButton
                size={25}
                color={colors.error}
                icon="thumb-down"
                onPress={() => console.log('Pressed')}
                style={{ backgroundColor: colors.background }}
              />
            </View>
          </View>

          <View style={{ marginTop: 15, position: "relative" }}>
            <Text style={{ fontSize: 10 }} >15/09/2022 - 20:07</Text>
            <View style={{ backgroundColor: colors.background, ...styles.post }}>
              <View style={{ flex: 1, marginRight: 10, paddingTop: 10 }}>
                <Title numberOfLines={2} style={{ fontSize: 14, lineHeight: 22 }}>Existe a cor branco-escuro?</Title>
                <View style={styles.tagsView}>
                  <Chip mode="outlined" textStyle={{ fontSize: 12 }} style={{ backgroundColor: colors.background, marginRight: 4, marginBottom: 4 }} onPress={() => console.log('Pressed')}>Cores</Chip>
                  <Chip mode="outlined" textStyle={{ fontSize: 12 }} style={{ backgroundColor: colors.background, marginRight: 4, marginBottom: 4 }} onPress={() => console.log('Pressed')}>Filosofia</Chip>

                </View>
              </View>

              <View style={{ width: 2, height: "100%", backgroundColor: colors.surface }} />

              <View style={{ alignItems: "center", marginLeft: 10, }}>
                <Title style={{ fontSize: 16, color: colors.success }}>{!true ? "+999" : "0"}</Title>
                <Title style={{ fontSize: 12, color: colors.success }}>{false ? "Resposta" : "Respostas"}</Title>
              </View>
            </View>

            <View style={{ flexDirection: "row", position: "absolute", bottom: -6, right: 38 }}>
              <IconButton
                size={25}
                icon="thumb-up"
                color={colors.semiWhite}
                onPress={() => console.log('Pressed')}
                style={{ backgroundColor: colors.background }}
              />
              <IconButton
                size={25}
                color={colors.error}
                icon="thumb-down"
                onPress={() => console.log('Pressed')}
                style={{ backgroundColor: colors.background }}
              />
            </View>
          </View>

          <View style={{ marginTop: 15, position: "relative" }}>
            <Text style={{ fontSize: 10 }} >15/09/2022 - 20:07</Text>
            <View style={{ backgroundColor: colors.background, ...styles.post }}>
              <View style={{ flex: 1, marginRight: 10, paddingTop: 10 }}>
                <Title numberOfLines={2} style={{ fontSize: 14, lineHeight: 22 }}>Como faço para roubar uma moto?</Title>
                <View style={styles.tagsView}>
                  <Chip mode="outlined" textStyle={{ fontSize: 12 }} style={{ backgroundColor: colors.background, marginRight: 4, marginBottom: 4 }} onPress={() => console.log('Pressed')}>Zuera</Chip>
                  <Chip mode="outlined" textStyle={{ fontSize: 12 }} style={{ backgroundColor: colors.background, marginRight: 4, marginBottom: 4 }} onPress={() => console.log('Pressed')}>Moto</Chip>
                  <Chip mode="outlined" textStyle={{ fontSize: 12 }} style={{ backgroundColor: colors.background, marginRight: 4, marginBottom: 4 }} onPress={() => console.log('Pressed')}>Drogas</Chip>
                </View>
              </View>

              <View style={{ width: 2, height: "100%", backgroundColor: colors.surface }} />

              <View style={{ alignItems: "center", marginLeft: 10, }}>
                <Title style={{ fontSize: 16, color: colors.success }}>{!true ? "+999" : "2"}</Title>
                <Title style={{ fontSize: 12, color: colors.success }}>{false ? "Resposta" : "Respostas"}</Title>
              </View>
            </View>

            <View style={{ flexDirection: "row", position: "absolute", bottom: -6, right: 38 }}>
              <IconButton
                size={25}
                color={colors.success}
                icon="thumb-up"
                onPress={() => console.log('Pressed')}
                style={{ backgroundColor: colors.background }}
              />
              <IconButton
                size={25}
                color={colors.semiWhite}
                icon="thumb-down"
                onPress={() => console.log('Pressed')}
                style={{ backgroundColor: colors.background }}
              />
            </View>
          </View>

        </View>

      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // borderWidth: 1, borderColor: "red"
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // borderWidth: 1, borderColor: "red"
  },
  body: {
    padding: 20,

    // borderWidth: 1, borderColor: "red",
  },
  tagsView: {
    flexWrap: "wrap",
    marginVertical: 15,
    flexDirection: "row",
  },
  post: {
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});