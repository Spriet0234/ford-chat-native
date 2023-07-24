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
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => Linking.openURL("https://www.example.com");

  return (
    <View style={styles.container}>
      <Image
        style={{ position: "absolute", top: 20, right: 25 }}
        source={require("../assets/x.png")}
      ></Image>

      <Text
        style={{
          color: "#00095B",
          fontWeight: 500,
          fontSize: 20,
          alignSelf: "center",
          position: "absolute",
          top: 35,
        }}
      >
        Ford Credentials
      </Text>
      <View
        style={{
          position: "absolute",
          top: 75,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../assets/env.png")}
          style={{
            height: 60,
            width: 25,
            marginRight: 10,
            marginLeft: 20,
            marginTop: -15,
          }}
          resizeMode="contain"
        ></Image>

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          top: 115,
        }}
      >
        <Image
          source={require("../assets/key.png")}
          style={{
            height: 60,
            width: 25,
            marginRight: 10,
            marginLeft: 20,
            marginTop: -15,
          }}
          resizeMode="contain"
        ></Image>

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={password}
          placeholder="Password"
        />
      </View>
      <View style={{ position: "absolute", top: 170 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#00095B",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white" }}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handlePress}
        style={{ position: "absolute", top: 205 }}
      >
        <Text style={styles.linkText}>Forgot my password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePress}
        style={{ position: "absolute", top: 225 }}
      >
        <Text style={styles.linkText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    marginTop: 240,
    height: "33%",
    position: "relative",
  },
  input: {
    height: 30,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#444",
    width: "77%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
