import React, { useState } from "react";
import { Dimensions, PixelRatio, View, StyleSheet } from "react-native";
import { Button, IconButton, Modal, Text, Title, useTheme } from "react-native-paper";

const ratio = PixelRatio.getFontScale();
export const useInfo = () => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({ title: "", body: "", type: "" });

  const infoTypes = {
    error: { color: colors.error, icon: "close-circle-outline" },
    warn: { color: colors.warning, icon: "alert-circle-outline" },
    success: { color: colors.success, icon: "checkbox-marked-circle-outline" },
  }

  const showInfo = ( title, body, type ) => {
    setInfo({ 
      body: body?.toLocaleLowerCase() ?? "", 
      type: type?.toLocaleLowerCase() ?? "",
      title: title?.toLocaleLowerCase() ?? "", 
    });
    setIsOpen(true);
  }

  const InfoContainer = () => (
    <Modal visible={isOpen} style={{ alignItems: "center" }} onDismiss={() => setIsOpen(false)}>
      <View style={{ ...styles.container, backgroundColor: colors.background }}>
        <View style={{ ...styles.iconView, backgroundColor: infoTypes[info.type]?.color ?? infoTypes["warn"]?.color }}>
          <IconButton size={120}  icon={infoTypes[info.type]?.icon ?? infoTypes["warn"]?.icon} />
        </View>

        <View style={{ padding: 20 }}>
          <Title numberOfLines={3} style={styles.title}>{Boolean(info.title) ? info.title : ""}</Title>
          <Text style={styles.text}>{Boolean(info.body) ? info.body : ""}</Text>
          <Button
            mode="contained"
            contentStyle={{ height: 45 }}
            onPress={() => {
              setInfo({ title: "", body: "", type: "" });
              setIsOpen(false);
            }}
            color={infoTypes[info.type]?.color ?? infoTypes["warn"]?.color }
          >
            Continuar
          </Button>
        </View>
      </View>
    </Modal>
  );

  return { InfoContainer, showInfo };
}

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