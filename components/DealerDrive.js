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

export function DealerDrive() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Wayne Ford</Text>
      </View>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/1.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
            }}
          ></Image>
          <Text>abc</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/2.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
            }}
          ></Image>
          <Text>abc</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/3.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
            }}
          ></Image>
          <Text>abc</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/clock.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
            }}
          ></Image>
          <Text>abc</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "start",
    justifyContent: "center",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    marginTop: 240,
    height: "auto",
    position: "relative",
    padding: 20,
  },
  container2: {
    textAlign: "start",
    alignSelf: "center",
    alignItems: "start",
    justifyContent: "start",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    marginTop: 240,
    height: "auto",
    position: "relative",
    paddingleft: 140,
  },
  title: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 21,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  title2: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 24,
    alignSelf: "start",
    marginTop: 20,
    marginBottom: 20,
  },
  text2: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "center",
    marginTop: 0,
  },
  text22: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "start",
    marginTop: -4,
    marginBottom: 0,
    padding: 0,
  },
});
