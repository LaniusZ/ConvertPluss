import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, StyleSheet, Text, TextInputChangeEventData, Image } from "react-native";

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
    marginLeft: 20,
    fontWeight: "400",
    color: "#da962b",
    textAlign: "center",
  },

  image: {
    width: 50,
    height: 50,
    position: "relative",
    top: 20,
    right:20,
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
    <div className="row">
      <div className="col-12">
        <Text style={styles.title}>BIENVENIDO</Text>
<div className="float-right">
      <Image source={require("../assets/calculate.png")} style={styles.image} />  
      </div>
      </div>
      <div className="col-12">
        <div className="float-left">
          <Text style={{ color: "#da962b", fontSize: 30, marginLeft: 20, }}>{currentValue}</Text>
        </div>
        <div className="float-left">
          <Pressable onPress={() => { removePreference(); navigation.navigate("Inicio") }}>
            <Text style={{ color: "red", marginTop: 10, marginLeft: 20 }}>Eliminar</Text>
          </Pressable>
        </div>
      </div>

      <div className="row mb10 mt30">
        <div className="col-3">&nbsp;</div>
        <div className="col-3 text-center coin">
          <Text>US</Text>
        </div>
        <div className="col-6">
          <input type="number" name="US" value={currentUS} onChange={change} />
        </div>
      </div>

      <div className="row mb10">
        <div className="col-3">&nbsp;</div>
        <div className="col-3 text-center coin">
          <Text>BTC</Text>
        </div>
        <div className="col-6">
          <input type="number" name="BTC" value={currentBTC} onChange={change} />
        </div>
      </div>

      <div className="row mb10">
        <div className="col-3">&nbsp;</div>
        <div className="col-3 text-center coin">
          <Text>€</Text>
        </div>
        <div className="col-6">
          <input type="number" name="E" value={currentE} onChange={change} />
        </div>
      </div>

      <div className="row mb10">
        <div className="col-3">&nbsp;</div>
        <div className="col-3 text-center coin">
          <Text>UF</Text>
        </div>
        <div className="col-6">
          <input type="number" name="UF" value={currentUF} onChange={change} />
        </div>
      </div>

      <div className="row mb10">
        <div className="col-3">&nbsp;</div>
        <div className="col-3 text-center coin">
          <Text>UTM</Text>
        </div>
        <div className="col-6">
          <input type="number" name="UTM" value={currentUTM} onChange={change} />
        </div>
      </div>

      <div className="row mb10">
        <div className="col-3">&nbsp;</div>
        <div className="col-3 text-center coin">
          <Text>CLP</Text>
        </div>
        <div className="col-6">
          <input type="number" name="CLP" value={currentCLP} onChange={change} />
        </div>
      </div>
    </div>
  );
};

