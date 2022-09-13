import { View, StyleSheet } from "react-native";
import { Avatar, Chip, Divider, Headline, Surface, Text, Title, useTheme } from "react-native-paper";


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

        <Divider />


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
  }
});