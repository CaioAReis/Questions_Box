import { View, StyleSheet, Image, FlatList, PixelRatio, Pressable, RefreshControl } from "react-native";
import { ActivityIndicator, Avatar, Button, Chip, Dialog, Divider, FAB, Portal, Text, Title, useTheme } from "react-native-paper";
import { QuestionCard } from "../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { API } from "../services/api";

const ratio = PixelRatio.getFontScale();

export const Home = ({ navigation }) => {
  const { colors, logos } = useTheme();
  const [list, setList] = useState([]);
  const [session, setSession] = useState(null);
  const [loadList, setLoadList] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [dialogData, setDialogData] = useState(null);

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

  const handleGetProducts = async () => {
    if (pagination >= 0) {
      setLoadList(true);
      API.questions(pagination).then(res => {
        if (Boolean(res.length) && pagination >= 0) {
          setList(prev => prev.concat(res));
          setPagination(prev => prev + 1);
        }
      }).catch(err => {
        setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
      }).finally(() => setLoadList(false));
      setLoadList(false);
    }
  }

  useEffect(() => {
    const x = async () => {
      const value = await AsyncStorage.getItem('QB@user_session_key');
      setSession(JSON.parse(value));
    }
    x();
  }, []);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      // alert('Refreshed');
      // setPagination(0);
      handleGetProducts();
    });
    return focusHandler;
  }, [navigation]);

  return (
    <>
      <View style={{ backgroundColor: colors.surface, height: "100%" }}>
        <FlatList
          data={list}
          // onEndReachedThreshold={0.1}
          onScrollEndDrag={handleGetProducts}
          showsVerticalScrollIndicator={false}
          keyExtractor={question => question?._id}
          contentContainerStyle={{ paddingBottom: 80, backgroundColor: colors.surface }}
          renderItem={({ item }) => <QuestionCard nav={navigation} question={item} ratio={ratio} />}
          refreshControl={<RefreshControl refreshing={loadList} onRefresh={() => handleGetProducts()} tintColor={colors.primary} />}
          ListFooterComponent={
            pagination >= 0 && <ActivityIndicator style={{ padding: 10 }} size={"large"} color={colors.primary} />}
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

      <Portal>
        <Dialog visible={Boolean(dialogData)} onDismiss={() => { Boolean(dialogData?.callback) ? dialogData?.callback() : null; setDialogData(null); }}
          style={{ borderWidth: 4, borderColor: dialogData?.error ? colors.error : colors.success, paddingVertical: 20 }}
        >
          <>
            <Dialog.Title>{dialogData?.title}</Dialog.Title>
            <Dialog.Content>
              <Text>{dialogData?.body}</Text>
            </Dialog.Content>
            <Avatar.Icon icon={dialogData?.error ? "close" : "check"} size={120} style={{ position: "absolute", top: -80, alignSelf: "center", backgroundColor: dialogData?.error ? colors.error : colors.success }} />
          </>
        </Dialog>
      </Portal>
    </>
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