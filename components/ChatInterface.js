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
} from "react-native";
import data from "../data/zipLocations.json";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Bot",
      text: "Hello, I am a Ford ChatBot here to help you with any questions. Please select one of the following options.",
    },
  ]);
  const [count, setCount] = useState(1);
  const [options, setOptions] = useState([
    "Chatbot",
    "Locations",
    "Payment Calculator",
  ]);
  const [selected, setSelected] = useState("");

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
    if (matches && matches.length > 0) {
      return matches[0];
    }
    return null;
  }
  const findLocations = async () => {
    const zip = extractFiveDigitString(message);

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

  const sendMessage = (optionMessage) => {
    console.log(selected);

    // Add the user's message to the messages list

    if (count === 1) {
      setMessages((prevState) => [
        ...prevState,
        { sender: "User", text: optionMessage },
      ]);

      setSelected(optionMessage);
      //timout

      switch (optionMessage) {
        case "Chatbot":
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              { sender: "Bot", text: "How may I assist you?" },
            ]);
          }, 500);
          break;
        case "Locations":
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              { sender: "Bot", text: "Please enter a zip code" },
            ]);
          }, 500);
          break;
        case "Payment Calculator":
          setTimeout(() => {
            setMessages((prevState) => [
              ...prevState,
              { sender: "Bot", text: "Payment calculator" },
            ]);
          }, 500);
          break;
      }

      setCount(2);
      setOptions([]);
    } else {
      switch (selected) {
        case "Chatbot":
          console.log("to");
          setMessages((prevState) => [
            ...prevState,
            { sender: "User", text: message },
          ]);

          // Remove options after the user sends their first message
          setOptions([]);

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
          break;
        case "Locations":
          setMessages((prevState) => [
            ...prevState,
            { sender: "User", text: message },
          ]);
          //LOCATION FUNCTION
          findLocations().then((loc) => {
            setMessages((prevState) => [
              ...prevState,
              {
                sender: "Bot",
                text: `The closest locations to your Zip code are the following:\n${loc}`,
              },
            ]);

            /*
            const places = loc.split("..");
            console.log(places);
            for (let i = 0; i < places.length - 1; i++) {
              if (i === 0) {
                setMessages((m) => [
                  ...m,
                  { msg: places[i], author: "Ford Chat" },
                ]);
              } else {
                setMessages((m) => [...m, { msg: places[i], author: "" }]);
              }
            } */
            // blockQueries.current = false;
          });
          setMessage("");
          console.log("2");
          break;
        case "Payment Calculator":
          setMessages((prevState) => [
            ...prevState,
            { sender: "User", text: message },
          ]);
          console.log("3");
          break;
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          style={styles.chatList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.message(item.sender === "User")}>
              <View style={styles.messageContent}>
                <Text style={styles.sender}>{item.sender}</Text>
                <Text>{item.text}</Text>
              </View>
            </View>
          )}
        />
        {options.length > 0 && (
          <View style={styles.optionsContainer}>
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
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholder="Enter your message here"
          styles={styles.input}
        />
        <TouchableOpacity style={styles.optionButton2} onPress={sendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  chatContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  chatList: {
    flex: 1,
  },
  message: (isUser) => ({
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: isUser ? "#87e5ed" : "#f0f0f0",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  }),
  messageContent: {
    flexShrink: 1,
  },
  sender: {
    fontWeight: "bold",
    marginRight: 10,
  },
  optionsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 20,
    position: "absolute",
    bottom: "56%",
    left: "3%",
  },
  optionButton: {
    backgroundColor: "#67e4f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  optionButton2: {
    backgroundColor: "#67e4f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 0,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 0,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginTop: -30,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  sendButton: {
    color: "#ccc",
  },
});
export default ChatInterface;
