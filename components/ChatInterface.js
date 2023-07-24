import React, { useState } from "react";
import styles from '../styles/ChatStyle.js';
// import {calculateDistance, findLatLong, extractFiveDigitString, findLocations} from '../mapFunctions.js'
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
  const [menuVisible, setMenuVisible] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  function handleClicks(clickedButton){
    switch(clickedButton){
      case 'I':
        console.log('I');
        setMessages((prevState) => [...prevState, { sender: "User", text: "Info on a specific Ford" },]);
        break;
      case 'A':
        console.log('A')
        setMessages((prevState) => [
          ...prevState,
          { sender: "User", text: "Car recommendation" },
        ]);
        break;
      case 'B':
        console.log('B')
        setMessages((prevState) => [
          ...prevState,
          { sender: "User", text: "Car pricing estimator" },
        ]);
        break;
      case 'C':
        console.log('C')
        setMessages((prevState) => [
          ...prevState,
          { sender: "User", text: "Find a dealership" },
        ]);
        break;
      case 'D':
        console.log('D')
        setMessages((prevState) => [
          ...prevState,
          { sender: "User", text: "Schedule a test drive" },
        ]);
        break;
    }
    setMenuVisible(false);
  }
  //SEND MESSAGES

  const sendMessage = (optionMessage) => {
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
      {menuVisible && (
        <View
          style={{
            backgroundColor: "white",
            position: "absolute",
            right: 17,
            top: 110,
            zIndex: 100,
            width: "92%",
            height: "auto",
            opacity: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#113B7A1A",
              flex: 1,
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View
              style={{
                marginBottom: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500 }}>HenrAI Menu</Text>
              <TouchableOpacity
                onPress={() => {
                  if (!menuVisible) {
                    setMenuVisible(true);
                    console.log("1");
                  } else {
                    setMenuVisible(false);
                    console.log("2");
                  }
                }}
              >
                <Image source={require("../assets/x.png")}></Image>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (open1) {
                    setOpen1(false);
                  } else {
                    setOpen1(true);
                  }
                }}
                style={{
                  backgroundColor: "#00095B",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 0,
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
                  Buying a Ford
                </Text>
              </TouchableOpacity>
              {open1 && (
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      color: "#00095B",
                      borderRadius: 5,
                      padding: 10,
                      marginBottom: 0,
                      borderColor: "#00095B",
                      borderWidth: 1,
                      marginTop: 0,
                    }}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }} onPress = {() => {handleClicks('I')}}
                    >
                      Info on a specific Ford
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }} onPress = {() => {handleClicks('A')}}
                    >
                      Car recommendation
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }} onPress = {() => {handleClicks('D')}}
                    >
                      Car pricing estimator{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }} onPress = {() => {handleClicks('B')}}
                    >
                      Find a dealership{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }} onPress = {() => {handleClicks('C')}}
                    >
                      Schedule a test drive{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#00095B",
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  if (open2) {
                    setOpen2(false);
                  } else {
                    setOpen2(true);
                  }
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
                  Existing Owner
                </Text>
              </TouchableOpacity>
              {open2 && (
                <View>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Maintenance request{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Car resale{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#00095B",
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  if (open3) {
                    setOpen3(false);
                  } else {
                    setOpen3(true);
                  }
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
                  Info About Ford
                </Text>
              </TouchableOpacity>
              {open3 && (
                <View>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Innovation and sustainability{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#00095B",
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  if (open4) {
                    setOpen4(false);
                  } else {
                    setOpen4(true);
                  }
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
                  Know my car's price
                </Text>
              </TouchableOpacity>
              {open4 && (
                <View>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Electric vehicles{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchOpacityStyle}
                  >
                    <Text
                      style={{
                        color: "#00095B",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Dealer vehicles{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
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
        <TouchableOpacity
          style={{ position: "absolute", right: 30 }}
          onPress={() => {
            if (!menuVisible) {
              setMenuVisible(true);
              console.log("1");
            } else {
              setMenuVisible(false);
              console.log("2");
            }
          }}
        >
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
export default ChatInterface;
