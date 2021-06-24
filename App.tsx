import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { HomeView } from "./src/HomeView";
import { RestView } from "./src/RestView";
import { GraphqlView } from "./src/GraphqlView";
import { LocalDataView } from "./src/LocalDataView";

const Stack = createStackNavigator();

const graphqlClient = new ApolloClient({
  uri: "https://graphql-weather-api.herokuapp.com/",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={graphqlClient}>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeView} />
          <Stack.Screen name="Rest" component={RestView} />
          <Stack.Screen name="Graphql" component={GraphqlView} />
          <Stack.Screen name="LocalData" component={LocalDataView} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
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
