import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeView } from "./src/HomeView";
import { NameView } from "./src/NameView";
import { CalculateView } from "./src/CalculateView";

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Inicio" component={HomeView} />
          <Stack.Screen name="Nombre" component={NameView} />
          <Stack.Screen name="Calcular" component={CalculateView} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
