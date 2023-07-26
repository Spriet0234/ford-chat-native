import styles from '../styles/ChatStyle.js';
import {
    View,
    Text,
    Image
  } from "react-native";
import {ScheduleDrive3} from './ScheduleDrive.js'
import {MapComponent} from './MapComponent.js'
export default function ChatItem({msg, author, line, darkMode, textSize, zip, locs, dropDownOptions, carInfoData, carInfoMode, carSpecInfo, setMessages, setMenuButtons, handleUserInput, selectedCar, setSelectedCar, tableFunctions, messageIndex, selectedCars, setOptionButtons}){
    return <View>{
      author === "Info" && (
        <ScheduleDrive3 info = {carSpecInfo} handler = {handleUserInput}></ScheduleDrive3>
      )
    }
    {
        author === "Ford Chat." && (
          <MapComponent zip={zip.zipcode} dist={zip.dist} loc={locs} deal = {zip.deal} coords = {zip.coordinates} maintenanceMode={zip.maintenanceMode} selectedModel={zip.model} selectedTrim={zip.trim} inf = {zip.inf}></MapComponent>
        )
    }
    {author !== "Ford Chat." && author !== "Info" && <View style={styles.message(author === "You")}>
    {author === "Ford Chat" && (
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
  </View>
}