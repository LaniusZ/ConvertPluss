import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

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
    color: "#36b449",
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

  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  }
});

const LinkButton = ({ text, link, navigation }: any) => (
  <Pressable
    style={styles.buttonContainer}
    onPress={() => navigation.navigate(link)}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </Pressable>
);

const FakeButton = ({ text }: any) => (
  <Pressable
    style={styles.buttonContainer}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </Pressable>
);

const STORAGE_KEY = "USER_NAME";



export const NameView = ({ navigation }: any) => {

  const [currentValue, setCurrentValue] = useState<string | null>();

  function change(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    removePreference();
    if (e.currentTarget.value != null && e.currentTarget.value != "") {
      setPreference(e.currentTarget.value);
    }
  }

  useEffect(() => {
    getPreference();
  }, []);

  const getPreference = async () => {
    const val = await AsyncStorage.getItem(STORAGE_KEY);
    setCurrentValue(val);
  };

  const setPreference = async (val: string) => {
    await AsyncStorage.setItem(STORAGE_KEY, val);
    getPreference();
  };

  const removePreference = async () => {
    AsyncStorage.removeItem(STORAGE_KEY);
    getPreference();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONOZCAMONOS<br></br>INGRESA TU<br></br> NOMBRE</Text>
      <View style={styles.section}>
        <input type="text" value={currentValue?.toString()} onBlur={change} />
      </View>

      <View style={styles.section}>
        <FakeButton text="GUARDAR" />
      </View>

      <View style={styles.section}>
        {currentValue ? (
          <LinkButton text="CONTINUAR" link="Calcular" navigation={navigation} />
        ) : (<br></br>)}
      </View>
      <Image source={require("../assets/Conocer.png")} style={styles.image} />
    </View>
  );
};
