import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function HomePage({ navigation }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    // Navigate to Chat-interface screen and pass name as a parameter
    navigation.navigate("Chat-Interface", { name: name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Ford Chatbot</Text>
      <Text style={styles.label}>Please enter your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
