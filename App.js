import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatInterface from "./components/ChatInterface";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ford Chat Bot</Text>

      <ChatInterface />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 100,
    marginBottom: 20,
  },
});
