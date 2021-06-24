import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";

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
    fontSize: 32,
    fontWeight: "300",
    marginBottom: 30,
    color: "#3F3D56",
  },

  buttonContainer: {
    backgroundColor: "#6C63FF",
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 12,
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

export const HomeView = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demo App</Text>
      <Image source={require("../assets/home.png")} style={styles.image} />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <LinkButton text="RESTful" link="Rest" navigation={navigation} />
        <LinkButton text="GraphQL" link="Graphql" navigation={navigation} />
        <LinkButton
          text="Local Data"
          link="LocalData"
          navigation={navigation}
        />
      </View>
    </View>
  );
};
