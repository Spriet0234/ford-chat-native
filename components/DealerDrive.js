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
  const handlePress = () => Linking.openURL("https://www.example.com");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Wayne Ford</Text>
      </View>
      <Image
        source={require("../assets/deal.png")}
        resizeMode="contain" // Add this line
        style={{
          alignSelf: "flex-end",

          width: 220,
          height: 180,
          alignSelf: "flex-start",
          marginRight: 20,
          marginTop: 0,
        }}
      ></Image>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center",
          }}
        >
          <Image
            source={require("../assets/maps.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 22,
              marginRight: 20,
              marginTop: -7,
            }}
          ></Image>
          <TouchableOpacity
            onPress={handlePress}
            style={{ alignSelf: "center" }}
          >
            <Text style={styles.linkText}>Forgot my password</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Image
            source={require("../assets/1.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -7,
            }}
          ></Image>

          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            444 Rte 46, Wayne, NJ 07470
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "start",
            alignContent: "center",
          }}
        >
          {" "}
          <Image
            source={require("../assets/2.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -5,
            }}
          ></Image>
          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            (888)349-6957
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "start",
            alignContent: "center",
          }}
        >
          {" "}
          <Image
            source={require("../assets/3.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -5,
            }}
          ></Image>
          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            waynefordcars.com
          </Text>
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
              marginTop: -5,
            }}
          ></Image>
          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            Open-closes at 8pm
          </Text>
        </View>
      </View>
      <TouchableOpacity style={{ flexDirection: "row", marginTop: 15 }}>
        <Image
          source={require("../assets/arrow.png")}
          resizeMode="contain"
          style={{
            width: 30,
            height: 20,
          }}
        />
        <Text> Back</Text>
      </TouchableOpacity>
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
    marginBottom: 0,
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
  linkText: {
    textDecorationLine: "underline",
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
  },
});
