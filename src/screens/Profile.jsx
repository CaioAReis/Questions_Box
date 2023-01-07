import { useCallback, useEffect, useState } from "react";
import { FlatList, PixelRatio, View } from "react-native";
import { Avatar, Dialog, IconButton, Portal, Text, Title, useTheme } from "react-native-paper";
import { UserMenu, QuestionCard } from "../components";
import { API } from "../services/api";

const ratio = PixelRatio.getFontScale();

export const Profile = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [list, setList] = useState([]);
  const { userID, user } = route.params;
  const [loading, setLoading] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [userProfile, setUserProfile] = useState(Boolean(user) ? { ...user } : null);

  const requestProfile = useCallback((userID) => {
    setLoading(true);
    API.getUser(userID)
      .then(res => setUserProfile(res))
      .catch(err => setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message }))
      .finally(() => setLoading(false));
  }, []);

  const requestQuestions = useCallback((userID) => {
    setLoading(true);
    API.questionsByUser(userID)
      .then(res => setList(res))
      .catch(err => setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message }))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    !Boolean(user) ? requestProfile(userID) : null;
    requestQuestions(userID);
  }, []);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      !Boolean(user) ? requestProfile(userID) : null;
      requestQuestions(userID);
    });
    return focusHandler;
  }, [navigation]);

  return (
    <>
      <View style={{ backgroundColor: colors.surface, flex: 1 }}>
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
            <>
              <View style={{ padding: 20, backgroundColor: colors.background, marginBottom: 10 }}>
                <View style={{ marginBottom: 20, flexDirection: "row", justifyContent: "space-between" }}>
                  <IconButton
                    size={35}
                    color={colors.text}
                    style={{ margin: 0 }}
                    icon="arrow-left-circle-outline"
                    onPress={() => navigation.goBack()}
                  />
                  {Boolean(user) ? <UserMenu user={user} /> : null}
                </View>

                <View style={{ flexDirection: "row", }}>
                  <Avatar.Text size={80} label={userProfile?.name[0] || ""} labelStyle={{ fontSize: 25 / ratio, fontWeight: "bold" }} />
                  <View style={{ flex: 1, marginLeft: 15, justifyContent: "center" }}>
                    <Title style={{ fontSize: 20 / ratio, lineHeight: 20 / ratio }}>{userProfile?.name || ""}</Title>

                    <Title style={{ fontSize: 12 / ratio, lineHeight: 20 / ratio, color: colors.primary }}>
                      {userProfile?.email}
                    </Title>
                  </View>
                </View>
              </View>

              <View style={{ margin: 20, flexDirection: "row", justifyContent: "space-between" }}>
                <Title style={{ fontSize: 20 / ratio, marginBottom: 20 }}>
                  Dúvidas postadas:
                </Title>
                <Title style={{ color: colors.primary }}>{list?.length}</Title>
              </View>
            </>
          }
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
}