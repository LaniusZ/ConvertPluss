import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonName: {
    height: 30,
  },
});

export const RestView = () => {
  const [pokemonList, setPokemon] = useState<string[]>();

  // Carga automática
  // useEffect(() => {
  //   getPokemons();
  // }, []);

  const getPokemons = async () => {
    const pokemonCall = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const pokemonData = await pokemonCall.json();
    setPokemon(pokemonData.results.map((p: any) => p.name));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32 }}>Rest Example</Text>

      {pokemonList?.map((pokemon: any) => {
        return <Text key={pokemon}>{pokemon}</Text>;
      })}

      <Button title="Get Pokemons" onPress={() => getPokemons()} />
    </View>
  );
};
