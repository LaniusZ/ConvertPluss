import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const STORAGE_KEY = "FAVORITE_API";

export const LocalDataView = () => {
  const [currentValue, setCurrentValue] = useState<string | null>();

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
      <Text style={{ fontSize: 32, marginBottom: 30 }}>
        ¿Cuál es tu API Favorita?
      </Text>

      <Pressable onPress={() => setPreference("Rest")}>
        <Text>API Rest</Text>
      </Pressable>

      <Pressable onPress={() => setPreference("GraphQL")}>
        <Text>GraphQL</Text>
      </Pressable>

      <View style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
        {currentValue ? (
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text>{`Tu preferencia es: ${currentValue}`}</Text>

            <Pressable onPress={() => removePreference()}>
              <Text style={{ color: "red", marginTop: 20 }}>Eliminar</Text>
            </Pressable>
          </View>
        ) : (
          <Text>No hay preferencia aún</Text>
        )}
      </View>
    </View>
  );
};
