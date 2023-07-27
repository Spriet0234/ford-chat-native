import { useState } from "react";
import data from "../src/images/image_link.json";
import dealerships from "../src/jsons/trimToDealer.json";
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
//choose vehicle category
export function ScheduleDrive({ calcButtons }) {
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
        {calcButtons}
      </ScrollView>
    </View>
  );
}
//model with back button
export function ScheduleDrive2({ calcButtons, mode, back }) {
  return (
    <View style={styles.container}>
      {mode === 0 ? (
        <Text style={styles.title}>Choose a specific model</Text>
      ) : (
        <Text style={styles.title}>Choose a specific trim</Text>
      )}

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
        {calcButtons}
      </ScrollView>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          alignSelf: "flex-start",
          marginLeft: 20,
          marginBottom: 20,
        }}
        onPress={back}
      >
        <Image
          source={require("../assets/arrow.png")}
          resizeMode="contain" // Add this line
          style={{
            width: 30,
            height: 20,
            alignSelf: "flex-start",
            marginRight: 0,
          }}
        ></Image>
        <Text> Back</Text>
      </TouchableOpacity>
    </View>
  );
}
//specific car display
export function ScheduleDrive3({ info, handler }) {
  return (
    <View style={styles.container2}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "space-between",
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        <View style={{ marginLeft: 30, marginBottom: 20 }}>
          <View>
            <Text style={styles.title2}>
              {info.model}&#x24C7;{" " + info.trim + " model"}
            </Text>
            <View>
              <Image
                source={{ uri: data[info.model][info.trim] }}
                resizeMode="contain" // Add this line
                style={{
                  alignSelf: "center",

                  width: 220,
                  height: 180,
                  alignSelf: "center",
                  marginRight: 20,
                  marginTop: 10,
                }}
              ></Image>
            </View>
            <Text
              style={{
                color: "#00095B",
                fontWeight: 400,
                fontSize: 17,
                alignSelf: "flex-start",
                marginTop: 0,
                marginBottom: 10,
                marginLeft: 10,
              }}
            >
              Estimated net price $36,630
            </Text>
            <Text
              style={{
                color: "#00095B",
                fontWeight: 400,
                fontSize: 17,
                alignSelf: "flex-start",
                marginTop: 0,
                marginBottom: 10,
                marginLeft: 10,
              }}
            >
              Available at{" "}
              {" " +
                dealerships[info.model][info.trim][0] +
                ", " +
                dealerships[info.model][info.trim][1]}
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.title2}>Your Vehicle </Text>
            <Text style={styles.text22}>
              Engine {" " + info["engine_aspiration"]}
            </Text>
            <Text style={styles.text22}>
              Drivetrain {" " + info["drivetrain"]}
            </Text>
            <Text style={styles.text22}>
              Tramsmission {" " + info["transmission"]}
            </Text>
            <Text style={styles.text22}>
              Body Style {" " + info["body_style"]}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 20,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/arrow.png")}
            resizeMode="contain"
            style={{
              width: 30,
              height: 20,
              marginRight: 0,
            }}
          />
          <Text> Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text> Detailed info</Text>
          <Image
            source={require("../assets/RArrow.png")}
            resizeMode="contain"
            style={{
              width: 30,
              height: 20,
              marginLeft: 5, // you might want a little space between the text and the icon
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
//Selecting trim
export function ScheduleDrive4({ calcButtons, locate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose specific trim</Text>
      <Text style={styles.text2}>Select 1-3 cars below</Text>
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
        {calcButtons}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%", // The parent View takes the entire width of the screen
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../assets/arrow.png")}
            resizeMode="contain"
            style={{
              width: 30,
              height: 20,
              marginLeft: 20,
            }}
          />
          <Text> Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#00095B",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 20,
            marginBottom: 10,
            marginLeft: -20,
          }}
          onPress={locate}
        >
          <Text style={{ color: "white", fontSize: 17 }}>
            Locate my closest dealerships
          </Text>
        </TouchableOpacity>
        <View></View> {/* This is the empty View acting as a spacer */}
      </View>
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
    <View>
      <Image
        source={require("../assets/mustang.png")}
        resizeMode="contain" // Add this line
        style={{
          width: 180,
          height: 180,
          alignSelf: "center",
          marginRight: 10,
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
  },
  container2: {
    textAlign: "flex-start",
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  title2: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 24,
    alignSelf: "flex-start",
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
    alignSelf: "flex-start",
    marginTop: -4,
    marginBottom: 0,
    padding: 0,
  },
});
