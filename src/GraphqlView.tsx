import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";

import { gql, useQuery } from "@apollo/client";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const GET_CITY = gql`
  query getCityByName($name: String!) {
    getCityByName(name: $name) {
      name
      country
      coord {
        lat
        lon
      }
    }
  }
`;

export const GraphqlView = () => {
  const { data, loading, error } = useQuery(GET_CITY, {
    variables: { name: "La Paz" },
  });

  if (loading) <Text>Loading...</Text>;
  if (error) <Text>{error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32 }}>GraphQL Example</Text>
      <Text style={{ fontSize: 16 }}>{data?.getCityByName.name}</Text>
      <Text style={{ fontSize: 16 }}>{data?.getCityByName.country}</Text>
      <Text style={{ fontSize: 16 }}>{data?.getCityByName.coord.lat}</Text>
      <Text style={{ fontSize: 16 }}>{data?.getCityByName.coord.lon}</Text>
    </View>
  );
};
