import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Chip, Text, Title, useTheme } from "react-native-paper";

export const QuestionCard = ({ question, ratio, nav }) => {
  const { colors } = useTheme();
  const d = new Date(question?.createdAt);

  return (
    <TouchableOpacity activeOpacity={.5} onPress={() => nav.navigate("QuestionDetails", { question: question })}>
      <Card.Content style={{ position: "relative", marginBottom: 20 }}>
        <Text style={{ fontSize: 10 / ratio }}>{`${d.getUTCDate()}/${d.getUTCMonth()+1}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`}</Text>
        <View style={{ backgroundColor: colors.background, ...styles.post }}>
          <View style={{ flex: 1, marginRight: 10, paddingTop: 10 }}>
            {/* <Title numberOfLines={2} style={{ fontSize: 14 / ratio, lineHeight: 22 }}>{question?._id}</Title> */}
            <Title numberOfLines={2} style={{ fontSize: 14 / ratio, lineHeight: 22 }}>{question?.title}</Title>
            <View style={styles.tagsView}>
              {question?.tags.map(tag =>
                <Chip
                  key={tag.title}
                  mode="outlined"
                  textStyle={{ fontSize: 12 / ratio }}
                  onPress={() => nav.navigate("ListForTag", { TAG: tag?._id })}
                  style={{ backgroundColor: colors.background, marginRight: 4, marginBottom: 4 }}>
                  {tag.title}
                </Chip>
              )}
            </View>
          </View>
          <View style={{ width: 2, height: "100%", backgroundColor: colors.surface }} />
          <View style={{ alignItems: "center", marginLeft: 10, justifyContent: "center" }}>
            <Title style={{ fontSize: 16 / ratio, color: colors.success }}>{question.qtdAnsers > 1000 ? "+999" : question?.responses?.length}</Title>
            <Title style={{ fontSize: 12 / ratio, lineHeight: 12, color: colors.success }}>{question.qtdAnsers === 1 ? "Resposta" : "Respostas"}</Title>

            {/* <View style={{ flexDirection: "row", }}>
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
            </View> */}
          </View>
        </View>
      </Card.Content>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
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
});