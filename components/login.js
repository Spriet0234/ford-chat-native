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

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => Linking.openURL("https://www.example.com");

  return (
    <View style={styles.container}>
      <Image
        style={{ position: "absolute", top: 20, right: 25 }}
        source={require("../assets/x.png")}
      ></Image>

      <Text style={styles.title}>Ford Credentials</Text>
      <View
        style={{
          marginTop: 20,
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
          marginTop: 5,
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
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
      </View>
      <View style={{ marginTop: 15, marginBottom: 5 }}>
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
      <TouchableOpacity onPress={handlePress} style={{ marginTop: 10 }}>
        <Text style={styles.linkText}>Forgot my password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePress}
        style={{ marginTop: 5, marginBottom: 10 }}
      >
        <Text style={styles.linkText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}
export function Login2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlePress = () => {
    console.log("pressed");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.text2}>Please enter your email or username.</Text>
      <Text style={styles.text2}>
        We will send you an email with a link to change your password
      </Text>
      <View style={{ marginTop: 15 }}></View>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <View style={{ marginTop: 15, marginBottom: 5 }}>
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
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Text style={styles.linkText}>Back to sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Login3() {
  const [ver, setVer] = useState("");
  const handlePress = () => {
    console.log("pressed");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2-Step verification</Text>
      <Text style={styles.text2}>
        Please enter the 4-digit code sent to the phone number ending in
        (***)-***-1234
      </Text>

      <View style={{ marginTop: 15 }}></View>
      <TextInput
        style={styles.input}
        onChangeText={setVer}
        value={ver}
        placeholder="Verification code"
      />

      <View style={{ marginTop: 15, marginBottom: 5 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#00095B",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 20,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white" }}>Verify</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handlePress}
        style={{ marginTop: 0, marginBottom: 20 }}
      >
        <Text style={styles.linkText}>Back to sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadow: {
      backgroundColor: "#fff", // White for the contrast with the shadow
      borderRadius: 10, // Rounded corners
      padding: 20, // Inner padding
      elevation: 10, // This adds a drop shadow on Android
      shadowColor: "#000", // Shadow color
      shadowOffset: { width: 0, height: 2 }, // The shadow will be on the bottom of the view
      shadowOpacity: 0.25, // Opacity of shadow
      shadowRadius: 3.84, // Blur radius
    },
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
  text2: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "center",
    marginTop: 2,
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
  title: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 21,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
  },

  linkText: {
    textDecorationLine: "underline",
    color: "#00095B",
    fontWeight: 400,
  },
});
