import { useState } from "react";
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
} from "react-native";
export function ScheduleDrive() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose vehicle category</Text>
      <Text style={styles.text2}>
        Select from the options to specify which cars you are looking for.
      </Text>
      <ScrollView
        horizontal={true}
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 30,
          marginTop: 20,
          width: "90%",
        }}
      >
        <Conts inp={"SUVs and Cars"} />
        <Conts inp={"Trucks and Vans"} />
        <Conts inp={"Electrified"} />
        <Conts inp={"Performance Vehicles"} />
      </ScrollView>
    </View>
  );
}
export function ScheduleDrive2() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a specific model</Text>
      <Text style={styles.text2}>
        Select from the options to specify which cars you are looking for.{" "}
      </Text>
      <ScrollView
        horizontal={true}
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 30,
          marginTop: 20,
          width: "90%",
        }}
      >
        <Conts2 />
        <Conts2 />
        <Conts2 />
        <Conts2 />
      </ScrollView>
    </View>
  );
}
export function Conts({ inp }) {
  return (
    <View
      style={{
        height: 110,
        width: 180,
        backgroundColor: "white",
        borderRadius: 10,
        marginRight: 15,
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
      }}
    >
      <Text style={{ fontSize: 19 }}>{inp}</Text>
    </View>
  );
}
export function Conts2() {
  return (
    <Image
      source={require("../assets/mustang.png")}
      resizeMode="contain" // Add this line
      style={{ width: 180, height: 180, alignSelf: "center", marginRight: 15 }}
    ></Image>
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
    marginTop: 240,
    height: "auto",
    position: "relative",
  },
  title: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 21,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  text2: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "center",
    marginTop: 0,
  },
});
