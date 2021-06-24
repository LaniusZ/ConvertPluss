import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 300,
    height: 200,
    marginBottom: 50,
  },

  title: {
    fontSize: 40,
    fontWeight: "400",
    marginBottom: 30,
    color: "#da962b",
    textAlign: "center",
  },

  buttonContainer: {
    padding: 0,
    borderRadius: 0,
    margin: 0,
  },

  buttonText: {
    color: "#36b449",
    fontSize: 25,
  },
});

const LinkButton = ({ text, link, navigation }: any) => (
  <Pressable
    style={styles.buttonContainer}
    onPress={() => navigation.navigate(link)}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </Pressable>
);

const STORAGE_KEY = "USER_NAME";

export const HomeView = ({ navigation }: any) => {

  const [currentValue, setCurrentValue] = useState<string | null>();

  useEffect(() => {
    getPreference();
  }, []);

  const getPreference = async () => {
    const val = await AsyncStorage.getItem(STORAGE_KEY);
    setCurrentValue(val);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BIENVENIDOS<br></br>A<br></br>CONVERTPLUSS</Text>

      <Image source={require("../assets/home.png")} style={styles.image} />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >

        {currentValue == null || currentValue.length == 0 ? (
          <LinkButton text="CONTINUAR" link="Nombre" navigation={navigation} />
        ) : (
          <LinkButton text="CONTINUAR" link="Calcular" navigation={navigation} />
        )}
      </View>
    </View>
  );
};
