// import { useTheme } from "@react-navigation/native";
import React from "react";
import { Dimensions, PixelRatio, View, StyleSheet } from "react-native";
import { Button, IconButton, Modal, Text, Title, useTheme } from "react-native-paper";

const ratio = PixelRatio.getFontScale();
export const UseInfo = () => {
  const { colors } = useTheme();

  return (
    <Modal visible={true} style={{ alignItems: "center" }}>
      <View style={{ ...styles.container, backgroundColor: colors.background }}>
        <View style={{ ...styles.iconView, backgroundColor: colors.success }}>
          <IconButton size={120} color="white" icon="checkbox-marked-circle-outline" />
        </View>

        <View style={{ padding: 20 }}>
          <Title numberOfLines={3} style={styles.title}>
            Título da informação
          </Title>

          <Text style={styles.text}>
            Algum corpo de informação se necessário
          </Text>
          <Button color={colors.success} contentStyle={{ height: 45 }} mode="contained">Continuar</Button>
        </View>
      </View>
    </Modal>
  );
}

// export const useInfo = () => {
//   const { ConfErrBody, startConfErr } = confErr();
//   return { ConfErrBody, startConfErr };
// }

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
    width: Dimensions.get("window").width / 1.2,
  },
  iconView: { alignItems: "center", justifyContent: "center" },
  title: { textAlign: "center", fontSize: 25 / ratio, marginTop: 40 },
  text: { textAlign: "center", fontSize: 16 / ratio, marginVertical: 60 },
});