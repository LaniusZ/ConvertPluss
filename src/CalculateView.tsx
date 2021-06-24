import React, { useEffect, useState } from "react";
import { Button, NativeSyntheticEvent, Pressable, StyleSheet, Text, TextInput, TextInputChangeEventData, TextInputComponent, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 40,
    fontWeight: "400",
    marginBottom: 30,
    color: "#da962b",
    textAlign: "center",
  },
});

const STORAGE_KEY = "USER_NAME";

export const CalculateView = ({ navigation }: any) => {

  const [currentUS, setCurrentUS] = useState<Int32Array | null>();
  const [currentBTC, setCurrentBTC] = useState<Int32Array | null>();
  const [currentE, setCurrentE] = useState<Int32Array | null>();
  const [currentUF, setCurrentUF] = useState<Int32Array | null>();
  const [currentUTM, setCurrentUTM] = useState<Int32Array | null>();
  const [currentCLP, setCurrentCLP] = useState<Int32Array | null>();

  const [us, setUS] = useState<Int32Array | null>();
  const [btc, setBTC] = useState<Int32Array | null>();
  const [euro, setE] = useState<Int32Array | null>();
  const [uf, setUF] = useState<Int32Array | null>();
  const [utm, setUTM] = useState<Int32Array | null>();
  const [fecha, setFecha] = useState<string | null>();

  function change(e: NativeSyntheticEvent<TextInputChangeEventData>) {

    let newUS = 0;
    let newBTC = 0;
    let newE = 0;
    let newUF = 0;
    let newUTM = 0;
    let newCLP = 0;

    switch (e.currentTarget.name) {
      default:
        console.log("Error de seleccion");
        break;
      case "US":
        newUS = e.currentTarget.value;
        newCLP = newUS * us;
        newE = newCLP / euro;
        newUF = newCLP / uf;
        newUTM = newCLP / utm;
        newBTC = newUS / btc;
        break;
      case "BTC":
        newBTC = e.currentTarget.value;
        newUS = newBTC * btc;
        newCLP = newUS * us;
        newE = newCLP / euro;
        newUF = newCLP / uf;
        newUTM = newCLP / utm;
        break;
      case "E":
        newE = e.currentTarget.value;
        newCLP = newE * euro;
        newUS = newCLP / us;
        newUF = newCLP / uf;
        newUTM = newCLP / utm;
        newBTC = newUS / btc;
        break;
      case "UF":
        newUF = e.currentTarget.value;
        newCLP = newUF * uf;
        newUS = newCLP / us;
        newE = newCLP / euro;
        newUTM = newCLP / utm;
        newBTC = newUS / btc;
        break;
      case "UTM":
        newUTM = e.currentTarget.value;
        newCLP = newUTM * utm;
        newUS = newCLP / us;
        newUF = newCLP / uf;
        newE = newCLP / euro;
        newBTC = newUS / btc;
        break;
      case "CLP":
        newCLP = e.currentTarget.value;
        newUS = newCLP / us;
        newE = newCLP / euro;
        newUF = newCLP / uf;
        newUTM = newCLP / utm;
        newBTC = newUS / btc;
        break;
    }

    setCurrentUS(newUS);
    setCurrentBTC(newBTC);
    setCurrentE(newE);
    setCurrentUF(newUF);
    setCurrentUTM(newUTM);
    setCurrentCLP(newCLP);
  }

  const [currentValue, setCurrentValue] = useState<string | null>();

  useEffect(() => {
    getPreference();
    fetchApiCall();
  }, []);

  const getPreference = async () => {
    const val = await AsyncStorage.getItem(STORAGE_KEY);
    setCurrentValue(val);
  };

  const removePreference = async () => {
    AsyncStorage.removeItem(STORAGE_KEY);
    getPreference();
  };

  const fetchApiCall = () => {
    fetch("https://mindicador.cl/api", {
      "method": "GET"
    }).then(response => response.json())
      .then(response => {
        setBTC(response.bitcoin.valor);
        setUS(response.dolar.valor);
        setE(response.euro.valor);
        setFecha(response.fecha);
        setUF(response.uf.valor);
        setUTM(response.utm.valor);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BIENVENIDO</Text>

      <Text style={styles.title}>{currentValue}</Text>
      <Pressable onPress={() => { removePreference(); navigation.navigate("Inicio") }}>
        <Text style={{ color: "red", marginTop: 20 }}>Eliminar</Text>
      </Pressable>
      <Text>US</Text>

      <input type="number" name="US" value={currentUS} onChange={change} />

      <Text>BTC</Text>
      <input type="number" name="BTC" value={currentBTC} onChange={change} />

      <Text>E</Text>
      <input type="number" name="E" value={currentE} onChange={change} />

      <Text>UF</Text>
      <input type="number" name="UF" value={currentUF} onChange={change} />

      <Text>UTM</Text>
      <input type="number" name="UTM" value={currentUTM} onChange={change} />

      <Text>CLP</Text>
      <input type="number" name="CLP" value={currentCLP} onChange={change} />
    </View>
  );
};

