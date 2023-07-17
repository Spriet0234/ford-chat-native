import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import data from "../data/zipLocations.json";
import carData from "../data/car_data.json";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [optionMess, setOptionMess] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Bot",
      text: "What's your name?",
    },
  ]);

  const [count, setCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("");

  //MAP CODE--------------------------
  function calculateDistance(lat1, lon1, lat2, lon2) {
    function toRadians(degrees) {
      return degrees * (Math.PI / 180);
    }
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  }
  //finds the longitude and latitude of the user
  const findLatLong = (zip) => {
    const s =
      "http://api.weatherapi.com/v1/current.json?key=c722ececb1094322a31191318231606&q=" +
      zip;
    return fetch(s)
      .then((response) => response.json())
      .then((data) => {
        let latitude = data.location.lat;
        let longitude = data.location.lon;
        const res = { latitude, longitude };

        return res;
      });
  };
  //extracts the zip code from the user input for map
  function extractFiveDigitString(inputString) {
    const regex = /\b\d{5}\b/g;
    const matches = inputString.match(regex);
    console.log("matches:" + matches);
    if (matches && matches.length > 0) {
      return matches[0];
    }
    return null;
  }
  const findLocations = async () => {
    const zip = extractFiveDigitString(message);
    console.log("zip: " + zip);
    if (zip === null) return null;

    try {
      const result = await findLatLong(zip);
      const distances = {};
      const l = [result.latitude, result.longitude];
      for (const coords in data) {
        const [lat, lon] = coords.split(" ");
        const address =
          data[coords].name +
          ": " +
          data[coords].address +
          ", " +
          data[coords].city +
          " " +
          lat +
          " " +
          lon;
        const distance = calculateDistance(
          l[0],
          l[1],
          parseFloat(lat),
          parseFloat(lon)
        );

        distances[address] = distance;
      }
      const sortedLocations = Object.entries(distances).sort(
        (a, b) => a[1] - b[1]
      );
      const closestLocations = sortedLocations.slice(0, 5);
      let string = "";
      for (let i = 0; i < closestLocations.length - 2; i++) {
        const arr = closestLocations[i][0].split(", ");
        //console.log("arr: " + arr);
        let shortStr = "";
        shortStr += i + 1 + ") ";
        for (let i = 0; i < arr.length - 1; i++) {
          // console.log("arr2:" + arr[i]);
          shortStr += arr[i] + " ";
        }
        console.log(shortStr);
        string += shortStr + "\n";
        // const location = arr[arr.length-1].split(" ");
        // topLatLongs.push([location[1],location[2]]);
      }
      console.log("string: " + string);
      return string;
    } catch (err) {
      return "Invalid zip";
    }
  };

  //MAP CODE--------------------------

  //SEND MESSAGES

  const sendMessage = (optionMessage) => {
    if (optionMessage === null) {
      console.log("niull");
    }
    console.log("here");
    console.log(optionMessage);
    let m = String(optionMessage);
    m = m.trim();
    if (m === null || m === "") {
      console.log("empty");
    }

    if (m.length === 0) {
      console.log("empty");
    }

    console.log(selected);

    // Add the user's message to the messages list

    if (count === 0) {
      setMessages((prevState) => [
        ...prevState,
        { sender: "User", text: message },
      ]);
      setName(message);
      setTimeout(() => {
        setMessages((prevState) => [
          ...prevState,
          {
            sender: "Bot",
            text: `Welcome, ${message}! What would you like help with today?`,
          },
        ]);
        setOptions([
          "Buying a Ford",
          "I'm an existing owner",
          "Info about Ford",
          "Negotiation Assistance",
        ]);
        // code to run after 1 second
      }, 500);
      setMessage("");
      setCount(1);
    } else if (count === 2 || (optionMessage === "null" && count !== 0)) {
      setOptions([]);
      console.log("to");
      setMessages((prevState) => [
        ...prevState,
        { sender: "User", text: message },
      ]);

      // Remove options after the user sends their first message
      //  setOptions([]);

      // Send a POST request to your API with the user's message
      fetch("http://fordchat.franklinyin.com/quer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quer: message, debug: true }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Add the bot's response to the messages list
          setMessages((prevState) => [
            ...prevState,
            { sender: "Bot", text: data.response },
          ]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Clear the message input
      setMessage("");
      /*
        case "Locations":
          setMessages((prevState) => [
            ...prevState,
            { sender: "User", text: message },
          ]);
          //LOCATION FUNCTION
          findLocations().then((loc) => {
            if (loc === null) {
              setMessages((prevState) => [
                ...prevState,
                {
                  sender: "Bot",
                  text: `Incorrect Input`,
                },
              ]);
            } else {
              setMessages((prevState) => [
                ...prevState,
                {
                  sender: "Bot",
                  text: `The closest locations to your Zip code are the following:\n${loc}`,
                },
              ]);
            }
          });
          setMessage("");
          console.log("2");
          break;
        case "Payment Calculator":
          console.log("a");
          setMessages((prevState) => [
            ...prevState,
            { sender: "User", text: message },
          ]);
          //console.log(carData.list);
          let uniqueModels = [
            ...new Set(carData.list.map((item) => item.model)),
          ];
          uniqueModels.forEach((item) => {
            console.log(`Model: ${item}`);
          });
          break;
      } */
    } else if (count === 1) {
      console.log(count);
      setMessages((prevState) => [
        ...prevState,
        { sender: "User", text: optionMessage },
      ]);

      setSelected(optionMessage);
      //timout

      switch (optionMessage) {
        case "Buying a Ford":
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              {
                sender: "Bot",
                text: `What info would you like to know ${name}?`,
              },
            ]);
            setOptions([
              "Info about a specific car",
              "Car recommendation",
              "Car pricing estimator",
              "Find a dealership",
              "Schedule a test drive",
            ]);
          }, 500);

          break;
        case "I'm an existing owner":
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              {
                sender: "Bot",
                text: "Please enter your Ford credentials in the login page below:",
              },
            ]);
          }, 500);
          break;
        case "Info about Ford":
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              { sender: "Bot", text: "Please select a car model" },
            ]);
          }, 500);
          break;
        case "Negotiation Assistance":
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              { sender: "Bot", text: "Please select a car model" },
            ]);
          }, 500);
          break;
        case "Info about a specific car":
          setOptions([]);
          break;
        case "Car recommendation":
          setOptions([]);
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              {
                sender: "Bot",
                text: "Do you have specific needs in mind, or would you like to fill out our questionnaire?",
              },
            ]);
            setOptions(["Ask my own questions", "Take Questionnaire"]);
          }, 500);
          break;
        case "Take Questionnaire":
          setOptions([]);
          setMessages((prevState) => [
            ...prevState,
            {
              sender: "Bot",
              text: "Alright, let's get started!",
            },
          ]);
          setMessages((prevState) => [
            ...prevState,
            {
              sender: "Bot",
              text: "What is the budget for your dream car?",
            },
          ]);
          break;
        case "Ask my own questions":
          setOptions([]);
          setMessages((prevState) => [
            ...prevState,
            {
              sender: "Bot",
              text: "Alright, what are you wondering / Looking for?",
            },
          ]);
          setCount(3);
          break;
        case "Find a dealership":
          setOptions([]);
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              {
                sender: "Bot",
                text: "Please enter your zipcode below:",
              },
            ]);
          }, 500);
          break;
        case "Find a dealership2":
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              {
                sender: "Bot",
                text: "Please enter your zipcode below:",
              },
            ]);
          }, 500);
          break;
        default:
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              {
                sender: "Bot",
                text: "Default",
              },
            ]);
          }, 500);
          break;
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          right: 17,
          top: 1110,
          zIndex: 100,
          width: "92%",
          height: 300,
          opacity: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#113B7A1A",
            flex: 1,
          }}
        >
          <View>
            <Text>HenrAI Menu</Text>
          </View>
          <View>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          alignItems: "center",
          width: "100%",

          padding: 10,
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Image
          style={styles.img2}
          source={require("../assets/header.png")}
        ></Image>
        <TouchableOpacity style={{ position: "absolute", right: 30 }}>
          <Image source={require("../assets/sand.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          style={styles.chatList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.message(item.sender === "User")}>
              {item.sender !== "User" && (
                <View
                  style={{
                    backgroundColor: "#00095B",
                    width: 55,
                    height: 55,
                    borderRadius: 150 / 2,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                    marginRight: 10,
                    marginLeft: -5,
                  }}
                >
                  <Image
                    style={styles.botImage}
                    source={require("../assets/henrai.png")}
                  />
                </View>
              )}

              <View style={styles.messageContent(item.sender === "User")}>
                <Text style={{ color: "white" }}>{item.text}</Text>
              </View>
            </View>
          )}
        />
        {options.length > 0 && (
          <View style={styles.optionsContainer}>
            <ScrollView horizontal={true}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.optionButton}
                  onPress={() => {
                    sendMessage(option);
                  }}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWithButton}>
          <TextInput
            style={styles.input}
            onChangeText={setMessage}
            value={message}
            placeholder="Enter your message here"
          />
          {message ? (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => sendMessage("null")}
            >
              <Text>Send</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 40,
    backgroundColor: "white",
  },
  chatContainer: {
    flex: 1,
    padding: 0,
    margin: 10,
    backgroundColor: "#fff",
    marginBottom: 0,
  },
  chatList: {},
  message: (isUser) => ({
    flexDirection: "row",
    justifyContent: isUser ? "flex-end" : "flex-start",
    marginBottom: 10,
    padding: 10,
  }),
  messageContent: (isUser) => ({
    backgroundColor: isUser ? "#1D74F5" : "#00095B",
    borderTopLeftRadius: isUser ? 20 : 3,
    borderBottomLeftRadius: isUser ? 20 : 30,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxWidth: "70%",
  }),
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: "#00095B",
    marginBottom: 0,
  },
  inputWithButton: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#eee",
    alignItems: "center",
    paddingRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    padding: 10,
    color: "#ccc",
  },
  img2: {
    width: 100,
    height: 50,
  },
  botImage: {
    height: 38,
    width: 38,
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  optionButton: {
    marginRight: 10,
    backgroundColor: "#E7EBF2",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
export default ChatInterface;
