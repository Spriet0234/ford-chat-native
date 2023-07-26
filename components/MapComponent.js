import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
  RootTagContext,
} from "react-native";
import data from "../src/jsons/zipLocations.json";
import dealerToTrim from "../src/jsons/dealerToTrim.json";
import info from "../src/jsons/dealerInfo.json";
export function MapComponent({zip, dist, loc, deal, coords, maintenanceMode, selectedModel, selectedTrim, inf}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dealerships near you</Text>
      {
        inf.map((d,index)=>{
          return <Dealers dealer = {d} ind = {index+1}></Dealers>
        })
      }
    </View>
  );
}

export function Dealers({dealer, ind}) {
  const deal = dealer.split(':');
  const dist = deal[0].split('))');
  const stuff = deal[2].split(" ")
  let str = ""
  for(let j = 1; j < stuff.length-2; j++){
    str += stuff[j]+ " ";
  }
  return (
    <View
      style={{
        height: 80,
        width: "90%",
        backgroundColor: "white",
        borderRadius: 20,
        marginBottom: 10,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ marginRight: 20, marginLeft: 10 }}>
        <Text style={{ color: "#00095B", fontWeight: 500, fontSize: 17 }}>
          {ind}
        </Text>
        <Text
          style={{
            color: "#00095B",
            fontWeight: 400,
            fontSize: 15,
          }}
        >
          {Math.round(dist[0],4)} mi.
        </Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: "start",
            color: "#00095B",
            fontWeight: 500,
            fontSize: 19,
          }}
        >
          {dist[1]}
        </Text>
        <Text
          style={{
            textAlign: "start",
            color: "#00095B",
            fontWeight: 400,
            fontSize: 17,
          }}
        >
          {deal[1]+" " + str}
        </Text>
        <Text
          style={{
            textAlign: "start",
            textAlign: "start",
            color: "#00095B",
            fontWeight: 400,
            fontSize: 17,
          }}
        >
          Open-Closes 7pm
        </Text>
      </View>
      <Image
        source={require("../assets/SqArrow.png")}
        resizeMode="contain" // Add this line
        style={{
          width: 30,
          alignSelf: "center",
          height: 20,
          marginRight: 20,
        }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    height: "auto",
    position: "relative",
    paddingBottom: 15,
  },
  container2: {
    textAlign: "start",
    alignSelf: "center",
    alignItems: "start",
    justifyContent: "start",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    height: "auto",
    position: "relative",
    paddingleft: 140,
  },
  title: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 21,
    alignSelf: "start",
    marginTop: 20,
    marginLeft: "20%",
    marginBottom: 5,
  },
});
