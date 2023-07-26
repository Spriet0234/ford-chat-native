import data from "../../jsons/data.json";
import styles from "../../styles/ChatStyle.js"
import {View,TextInput,Button,Text,FlatList,StyleSheet,KeyboardAvoidingView,
    Platform,TouchableOpacity,Image,ScrollView} from "react-native";
export default function handleInfoFlow(
    handleMoreInfo,
    tableForceUpdate,
    setTableForceUpdate,
    forceUpdate,
    setForceUpdate,
    handleCarInfoButton,
    model,
    trim,
    setMessages,
    setModel,
    setQuery,
    setInfoMode,
    setCalcButtons,
    setMenuButtons,
    handleUserInput,
    setShowCalcButtons,
    setCarInfoData,
    infoMode,
    selected,
    changeSelected,
    setDealers,
    locateDealershipsFn,
    setSelect,
    setFind,
    query,
    setZipMode
) {
    if (infoMode === 2) {
        if (trim === "All Trims") {
          setMessages((m) => [...m, { msg: "Here are all the trims", author: "", line: true, zip: "" }]);
          setMessages((m) => [...m, { msg: "You can select which ones to compare", author: "", line: true, zip: "" }]);
          setShowCalcButtons(false);
          handleCarInfoButton(model, trim);
          handleMoreInfo();
          setInfoMode(5);
          return;
        }
        let arr = {};
        for (let i = 0; i < data.length; i++) {
            if (data[i]["model"] === model && data[i]["trim"] === trim) {
                setMessages((m) => [...m, { msg: "", author: "Info", line: true, zip: "", carInfo: data[i] }]);
                arr = data[i];
                break;
            }
        }
        setMessages((m) => [...m, { msg: "What other information/services would you like for this car?", author: "", line: true, zip: "" }]);
        setShowCalcButtons(false);
        setMenuButtons(
            <View style={styles.optionsContainer}>
            <ScrollView horizontal={true}>
              <TouchableOpacity key={"schedule"} style={styles.optionButton} onPress={() =>{ 
                setMenuButtons([]);
                setInfoMode(3);
              }}>
                  <Text>Schedule a test drive</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"price"} style={styles.optionButton} onPress={() =>{
                    setMenuButtons([]);
                    setInfoMode(10);
                 }}>
                  <Text>Pricing estimation</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"exist"} style={styles.optionButton} onPress={() => {
                    setMenuButtons([]);
                    handleCarInfoButton(model, trim);
                    setForceUpdate(!forceUpdate);
                    handleMoreInfo();
                }}>
                  <Text>More information</Text>
                </TouchableOpacity>
            </ScrollView>
            </View>);
        return;
    } else if (infoMode === 3) {
        setShowCalcButtons(false);
        setMessages((m) => [...m, { msg: "Please enter your zipcode or enable location to continue:", author: "Ford Chat", line: true, zip: {} }]);
        setInfoMode(4);
    } else if (infoMode === 5){
        return;
    } else {
        const selectedCopy = selected;
        selectedCopy[model].push(trim);
        changeSelected(selectedCopy);
        locateDealershipsFn(setDealers, setCalcButtons, setSelect, selected, setFind, changeSelected, query, 20, setMessages, setZipMode)();
        setShowCalcButtons(false);
    }
}
