import React from "react";
import { View } from "react-native";
import { Button, Text, useTheme, TextInput } from "react-native-paper";


export const Home = (props) => {
  const { colors } = useTheme();
  // const c = useTheme();
  // console.warn(c);


  return (
    <View style={{ backgroundColor: colors.surface, padding: 20 }}>

      {/* <Text style={{ color: "white", fontFamily: "WorkSans_400Regular" }} >Com a fonte ll</Text> */}
      <Text>Sem a fonte ll</Text>

      <TextInput
        theme={{
          colors: { background: colors.surface, inverseSurface: "red" },
        }}
        mode="outlined"
        label="Poha do label"
      />

      <TextInput
        theme={{
          colors: { background: colors.surface, inverseSurface: "red" },
        }}
        mode="outlined"
        label="Poha do label"
      />



      <Button labelStyle={{ fontWeight: "bold" }} icon="login" mode="contained">Teste ll</Button>
    </View>
  );
};