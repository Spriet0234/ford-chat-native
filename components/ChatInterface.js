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

  const sendMessage = (optionMessage) => {
    // Add the user's message to the messages list

    if (count === 1) {
      setMessages((prevState) => [
        ...prevState,
        { sender: "User", text: optionMessage },
      ]);
      setCount(2);
    } else {
      setMessages((prevState) => [
        ...prevState,
        { sender: "User", text: message },
      ]);
    }

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
    backgroundColor: isUser ? "#d2f7dc" : "#f0f0f0",
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
