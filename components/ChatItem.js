import styles from '../styles/ChatStyle.js';
import {
    View,
    Text,
    Image
  } from "react-native";
export default function ChatItem({author, msg}){
    return <View style={styles.message(author === "You")}>
    {author !== "You" && (
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

    <View style={styles.messageContent(author === "You")}>
      <Text style={{ color: "white" }}>{msg}</Text>
    </View>
  </View>
}