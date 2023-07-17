import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function HomePage({ navigation }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    // Navigate to Chat-interface screen and pass name as a parameter
    navigation.navigate("Chat-Interface", { name: name });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          alignItems: "center",
          width: "100%",

          padding: 10,
          marginBottom: 50,
        }}
      >
        <Image
          style={styles.img2}
          source={require("../assets/header.png")}
        ></Image>
      </View>
      <View
        style={{
          backgroundColor: "#00095B",
          width: 150,
          height: 150,
          borderRadius: 150 / 2,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Image style={styles.img} source={require("../assets/henrai.png")} />
      </View>
      <View
        style={{
          padding: 40,
        }}
      >
        <Text style={{ fontSize: 23, textAlign: "center" }}>
          Hey there and welcome!
        </Text>
        <Text style={{ fontSize: 23, textAlign: "center" }}>
          I am Henrai, a Ford chatbot to help you on you journey with us.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ fontSize: 20, color: "white" }}>Lets Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#00095B",
    width: 220,
    height: 50,
    padding: 10,
    borderRadius: 20,

    marginTop: 20,
  },
  img: {
    width: 100,
    height: 100,
  },
  img2: {
    width: 100,
    height: 50,
  },
});
