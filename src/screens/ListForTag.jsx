import React, { useEffect, useState } from "react";
import { FlatList, PixelRatio, View } from "react-native";
import { ActivityIndicator, Divider, IconButton, Title, useTheme } from "react-native-paper";
import { QuestionCard, TagCard } from "../components";
import { API } from "../services/api";

const ratio = PixelRatio.getFontScale();

export const ListForTag = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { TAG } = route.params;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(0);

  const handleGetList = () => {
    if (loading || pagination < 0) return;
    setLoading(true);
    API.questionsByTag(TAG?._id, pagination).then(res => {
      if (Boolean(res.length) && pagination >= 0) {
        setList(list.concat(res));
        setPagination(pagination + 1);
      } else setPagination(-1);
    }).catch(err => {
      setDialogData({ error: true, title: "Oops! Ocorreu um erro!", body: err.response?.data?.message });
    }).finally(() => setLoading(false));
  };

  useEffect(() => handleGetList(), []);

  return (
    <View style={{ backgroundColor: colors.surface, height: "100%" }}>
      <FlatList
        data={list}
        onEndReached={handleGetList}
        showsVerticalScrollIndicator={false}
        keyExtractor={question => question._id}
        contentContainerStyle={{ paddingBottom: 34, backgroundColor: colors.surface }}
        renderItem={({ item }) => <QuestionCard nav={navigation} question={item} ratio={ratio} />}
        ListFooterComponent={
          loading && <ActivityIndicator style={{ padding: 10 }} size={"large"} color={colors.primary} />}
        ListEmptyComponent={
          <View style={{ padding: 20 }}>
            <Title style={{ color: colors.semiTransparent, textAlign: "center", fontSize: 20 / ratio, marginBottom: 20 }}>
              {"Nenhuma dúvida\npostada com essa TAG!"}
            </Title>
          </View>
        }
        ListHeaderComponent={
          <View style={{ padding: 20 }}>
            <IconButton
              size={35}
              color={colors.text}
              icon="arrow-left-circle-outline"
              onPress={() => navigation.goBack()}
              style={{ margin: 0, marginBottom: 20 }}
            />
            <TagCard description={TAG?.description} name={TAG?.title} />
            <Divider style={{ marginVertical: 20 }} />
            <Title style={{ fontSize: 20 / ratio, marginBottom: 20 }}>
              Dúvidas com: <Title style={{ color: colors.primary }}>{TAG.title}</Title>
            </Title>
          </View>
        }
      />
    </View>
  )
}