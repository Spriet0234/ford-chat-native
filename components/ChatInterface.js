import React, { useState } from "react";
import styles from '../styles/ChatStyle.js';
import ChatItem from './ChatItem.js'
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { Mic } from "react-bootstrap-icons";
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
import Menu from './Menu.js'

const ChatInterface = () => {
  const [menuButtons, setMenuButtons] = useState([]);
  const [message, setMessage] = useState("");
  const [optionMess, setOptionMess] = useState("");
  const [messages, setMessages] = useState([
    {
      author: "Ford Chat",
      msg: "What's your name?",
    },
  ]);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  function handleClicks(clickedButton){
  }
  //buttons-------------------------------------
  const origButtons = (
    <View style={styles.optionsContainer}>
            <ScrollView horizontal={true}>
              <TouchableOpacity key={"buy"} style={styles.optionButton} onPress={() => {
              setMenuButtons(buyingFordButtons)
              setMessages(m=>{return [...m, {msg: "Buying a Ford", author: "You"}]})
              setMessages(m=>{return [...m, {msg: "What info would you like to know?", author: "Ford Chat"}]})
              }}>
                  <Text>Buying a Ford</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"exist"} style={styles.optionButton} onPress={() => {
                setMessages(m=>{return [...m, {msg: "I'm an Existing Owner", author: "You"}]})
                // setMessages(m=>{return [...m, {msg: "", author: "Login"}]})
                }}>
                  <Text>I'm an existing owner</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"info"} style={styles.optionButton} onPress={() => {
                setMessages(m=>{return [...m, {msg: "Info about Ford", author: "You"}]})
                }}>
                  <Text>Info about Ford</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"negotiate"} style={styles.optionButton} onPress={() => {
                setMessages(m=>{return [...m, {msg: "Negotiation Assistance", author: "You"}]})
                }}>
                  <Text>Negotiation Assistance</Text>
                </TouchableOpacity>
            </ScrollView>
            </View>
  );
  const buyingFordButtons = (
    <View style={styles.optionsContainer}>
            <ScrollView horizontal={true}>
                <TouchableOpacity key={"I"} style={styles.optionButton} onPress={() => {}}>
                  <Text>Info about a specific car</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"A"} style={styles.optionButton} onPress={() => {}}>
                  <Text>Car recommendation</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"D"} style={styles.optionButton} onPress={() => {}}>
                  <Text>Car pricing estimator</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"B"} style={styles.optionButton} onPress={() => {}}>
                  <Text>Find a dealership</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"C"} style={styles.optionButton} onPress={() => {}}>
                  <Text>Schedule a test drive</Text>
                </TouchableOpacity>
            </ScrollView>
    </View>)
  const buyACarButtons = (
    <View style={styles.optionsContainer}>
            <ScrollView horizontal={true}>
            <TouchableOpacity key={""} style={styles.optionButton} onPress={() => {
            setMessages(m=>{return [...m, {msg: "Great! What kind of car are you looking for?", author: "Ford Chat"}]});
            setMenuButtons([])
            }}>
                  <Text>Find a dealership</Text>
                </TouchableOpacity>
            <TouchableOpacity key={""} style={styles.optionButton} onPress={() => {
            setMessages((m) => [...m,{ msg: "Take questionnaire", author: "You", line: true }]);
            setMessages(m=>{return [...m, {msg: "Great! What is your budget range for purchasing a car?", author: "Ford Chat"}]});
            setMenuButtons([])
            }}>
                  <Text>Find a dealership</Text>
             </TouchableOpacity>
            </ScrollView>
      </View>
  );
  //---------------------------------------------
  //SEND MESSAGES

  const sendMessage = (optionMessage) => {
    // Add the user's message to the messages list
    if (count === 0) {
      setMessages((prevState) => [
        ...prevState,
        { author: "You", msg: message },
      ]);
      setName(message);
      setTimeout(() => {
        setMessages((prevState) => [
          ...prevState,
          {
            author: "Ford Chat",
            msg: `Welcome, ${message}! What would you like help with today?`,
          },
        ]);
        setMenuButtons(origButtons);
        // code to run after 1 second
      }, 500);
      setMessage("");
      setCount(1);
    } else if (count === 2 || (optionMessage === "null" && count !== 0)) {
      setOptions([]);
      setMessages((prevState) => [
        ...prevState,
        { author: "You", msg: message },
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
            { author: "Ford Chat", msg: data.response },
          ]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Clear the message input
      setMessage("");
    } else if (count === 1) {
      setMessages((prevState) => [
        ...prevState,
        { author: "You", msg: optionMessage },
      ]);
      setSelected(optionMessage);
      //timout
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {menuVisible && <Menu handleClick = {handleClicks}></Menu>}
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
            } else {
              setMenuVisible(false);
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
            <ChatItem author = {item.author} msg = {item.msg}></ChatItem>
          )}
        />
        {menuButtons}
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
