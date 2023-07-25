import styles from '../styles/ChatStyle.js';
import {
    View,
    Text,
    Image
  } from "react-native";
import {ScheduleDrive3} from './ScheduleDrive.js'
export default function ChatItem({author, msg, line, darkMode, textSize, zip, locs, dropDownOptions, carInfoData, carInfoMode, carSpecInfo, setMessages, setMenuButtons, handleUserInput, selectedCar, setSelectedCar, tableFunctions, messageIndex, selectedCars}){
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
    {
      author === "Info" && (
        <ScheduleDrive3 info = {carSpecInfo} handler = {handleUserInput}></ScheduleDrive3>
      )
    }

    <View style={styles.messageContent(author === "You")}>
      <Text style={{ color: "white" }}>{msg}</Text>
    </View>
  </View>
}