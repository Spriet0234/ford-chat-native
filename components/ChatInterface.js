import styles from '../styles/ChatStyle.js';
import React, { useState, useRef, useEffect } from "react";
import ChatItem from './ChatItem.js'
import {View,TextInput,Button,Text,FlatList,StyleSheet,KeyboardAvoidingView,
  Platform,TouchableOpacity,Image,ScrollView} from "react-native";
import Menu from './Menu.js'
import { extractFiveDigitString, findLocations, selectHandlerFn, locateDealershipsFn, locateDealershipsRad, calcButtonHandlerFn, appendSelectFn, changeFindFn } from "../src/modules/mapFunctions";
import { modelOptions, getTrimOptions } from "../src/modules/tableFunctions";
import { handleCarInfo, handleCarComparison, onModelChange, onTrimChange, onCheckBoxSelect, onCompare, onTableBack} from "../src/modules/selectCarFunctions";
import { handleUserInputFn, handleUserFlow } from "../src/modules/userFlowFunctions";
import trims from "../src/jsons/trims.json";
import data from "../data/zipLocations.json";
import carData from "../data/car_data.json";
import {Login} from "./login";
import {ScheduleDrive, ScheduleDrive2} from "./ScheduleDrive.js"
const fixTrimQueryQuotation = (model, query) => {
  if (model !== "Transit Cargo Van" && model !== "E-Transit Cargo Van") {
      return query;
  }
  let trimStartIndex = query.indexOf('trim = "') + 8;
  if (trimStartIndex - 8 !== -1) {
      query = query.slice(0, trimStartIndex) + '\\"' + query.slice(trimStartIndex);
      trimStartIndex += 2;
      let trimName = query.substring(trimStartIndex, query.length - 1);
      let modified = trimName.replace(/"/g, '\\"\\"');
      query = query.replace(trimName, modified);
      query = query.slice(0, query.length - 1) + "\\" + query.slice(query.length - 1);
      query += '"';
  }
  return query;
};

const ChatInterface = () => {
  const [menuButtons, setMenuButtons] = useState([]);
  const [message, setMessage] = useState("");
  const [optionMess, setOptionMess] = useState("");
  const [messages, setMessages] = useState([
    {author: "Ford Chat",msg: "What's your name?"},
  ]);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [queryText, setQueryText] = useState("");
  const [history, setHistory] = useState([]);
  const [response, setResponse] = useState("");
  const [recording, setRecording] = useState(false);
  const toggleTextSize = () => {
    setTextSize((prevSize) => (prevSize === "small" ? "medium" : prevSize === "medium" ? "large" : "small"));
};

const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
};
  // ACCESSIBILITY
  const [textSize, setTextSize] = useState("small");
  const [darkMode, setDarkMode] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [optionButtons, setOptionButtons] = useState("");
  const [choice, changeChoice] = useState("");
  const [forceUpdate, setForceUpdate] = useState(true);
  // which step of the payment calculator the bot is in: [1]model,[2]trim,[3]lease/finance/buy,[4]price
  const [calcStep, setCalcStep] = useState(0);
  const [questionnaireStep, setQuestionnaireStep] = useState(0);
  // [1]lease, [2]finance, [3]buy
  const [calcMode, setCalcMode] = useState(0);
  // [1]down payment, [2]trade-in, [3]months, [4]expected miles
  const [leaseStep, setLeaseStep] = useState(0);
  // [1]down payment, [2]trade-in, [3]months, [4]annual %
  const [financeStep, setFinanceStep] = useState(0);
  const [calcButtons, setCalcButtons] = useState([]);
  const [zipMode, setZipMode] = useState(0);
  const [trimOptions, setTrimOptions] = useState([]);
  const [infoMode, setInfoMode] = useState(0);
  const [vehicle, setVehicle] = useState("");
  const [cat, setCat] = useState("");
  const [showCalcButtons, setShowCalcButtons] = useState(false);
  const [calcHeadingText, setCalcHeadingText] = useState("");
  const [payment, setPayment] = useState(0);
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [selectedCar, setSelectedCar] = useState(0);
  const [compareModel, setCompareModel] = useState("");
  const [compareTrim, setCompareTrim] = useState("");
  const [carInfoData, setCarInfoData] = useState({});
  const [carInfoMode, setCarInfoMode] = useState("single");
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState([]);
  const [tableForceUpdate, setTableForceUpdate] = useState(false);
  const [selectedCars, setSelectedCars] = useState([]);

  const blockQueries = useRef(false);
  const recognition = useRef(null);
  //map functions -------------------------------------------------------->

  const [distance, setDistance] = useState("10");
  const [findMode, setFind] = useState(0);
  const [selectMode, setSelect] = useState(false);
  const s = new Set();
  const [dealerList, setDealers] = useState(s);
  const [selected, changeSelected] = useState({"Bronco": [],"Bronco Sport":[],"E-Transit Cargo Van":[],"Edge":[],"Escape":[],"Expedition":[],"Explorer":[],"F-150":[],"F-150 Lightning":[],"Mustang Mach-E":[],"Ranger":[],"Transit Cargo Van":[]})

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
                setMessages(m=>{return [...m, {msg: "", author: "Login"}]})
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
            <TouchableOpacity key={"back"} style={styles.optionButton} onPress={() => {
                  setMenuButtons([origButtons])
                }}>
                  <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"I"} style={styles.optionButton} onPress={() => {
                  handleUserInput('I');
                  setMenuButtons([]);
                }}>
                  <Text>Info about a specific car</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"A"} style={styles.optionButton} onPress={() => {
                  handleUserInput('A');
                  setMenuButtons([]);
                }}>
                  <Text>Car recommendation</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"D"} style={styles.optionButton} onPress={() => {
                  handleUserInput('D');
                  setMenuButtons([]);
                }}>
                  <Text>Car pricing estimator</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"B"} style={styles.optionButton} onPress={() => {
                  handleUserInput('B');
                  setMenuButtons([]);
                }}>
                  <Text>Find a dealership</Text>
                </TouchableOpacity>
                <TouchableOpacity key={"C"} style={styles.optionButton} onPress={() => {
                  handleUserInput('C');
                  setMenuButtons([]);
                }}>
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
  //map functions -------------------------------------------------------->
  const selectHandler = selectHandlerFn(setQuery, setModel, setCalcButtons, setFind);
  const locateDealerships = locateDealershipsFn(setDealers, setCalcButtons, setSelect, selected, setFind, changeSelected, zipCode, distance, setMessages, setZipMode, setShowCalcButtons);
  const changeFind = changeFindFn(setFind, setSelect, setCalcButtons, selectHandler);
  const appendSelect = appendSelectFn(selected, model, changeSelected);
  const calcButtonHandler = calcButtonHandlerFn(setQuery, setMessages, setCalcButtons,setShowCalcButtons);
  //Car Info functions  -------------------------------------------------------------
  let compareTrimOptions =
      compareModel === "" || compareModel === "no model" ? [{ value: "no trim", label: "Select A Model First" }] : trims[compareModel].map((trim) => ({ value: trim, label: trim }));
  const handleCarInfoButton = handleCarInfo(tableForceUpdate, setTableForceUpdate,model, trim, carInfoMode, compareModel, compareTrim, carInfoData, messages, setCarInfoData, setForceUpdate, forceUpdate, fixTrimQueryQuotation, setSelectedCars);
  const handleCarInfoCompareButton = handleCarComparison(carInfoMode, setCarInfoMode, setSelectedModel, setSelectedTrim);
  const handleModelChange = onModelChange(setSelectedModel, setSelectedTrim, setCompareModel, setCompareTrim, trims);
  const handleTrimChange = onTrimChange(setSelectedTrim, setCompareTrim);
  const handleCheckboxSelect = onCheckBoxSelect(selectedCars, setSelectedCars, carInfoData, setCarInfoData);
  const handleCompareButton = onCompare(setCarInfoMode);
  const handleTableBackButton = onTableBack(setCarInfoMode);

  useEffect(() => {
      setTrimOptions(getTrimOptions(model));
  }, [model]);

  const dropDownOptions = [handleModelChange, handleTrimChange, modelOptions, trimOptions, handleCarInfoButton, handleCarInfoCompareButton, compareTrimOptions];
  const tableFunctions = [handleCheckboxSelect, handleCompareButton, handleTableBackButton];

  const handleUserInput = handleUserInputFn(setMessages,changeChoice,setMenuButtons,buyACarButtons,setCalcButtons,
        model,setModel,calcButtonHandler,setCalcStep,trim,setQuery,blockQueries,setResponse,
        setShowCalcButtons,setCalcHeadingText,setInfoMode,cat,setCat,setOptionButtons);
  const goBack = () => {
    if (infoMode === 0){
      setShowCalcButtons(false)
      setMenuButtons(buyingFordButtons)
    }
    if (infoMode === 1) {
        handleUserInput("I");
        setInfoMode(0);
    } else {
        setQuery(cat);
        setInfoMode(infoMode - 1);
        handleUserFlow(origButtons,tableForceUpdate, setTableForceUpdate,handleMoreInfo,handleCarInfoButton,
          fixTrimQueryQuotation,query,dealerList,carInfoData,setCarInfoData,extractFiveDigitString,findLocations,
          handleUserInput,blockQueries,choice,setQuery,zipMode,setZipCode,messages,setMessages,setZipMode,setDistance,setCalcButtons,calcButtonHandler,
          zipCode,distance,findMode,selectHandler,setFind,appendSelect,setSelect,questionnaireStep,
          setQuestionnaireAnswers,setQuestionnaireStep,questionnaireAnswers,
          setForceUpdate,forceUpdate,calcStep,model,setModel,setCalcStep,trim,
          setTrim,calcMode,setCalcMode,setLeaseStep,
          setFinanceStep,leaseStep,financeStep,changeChoice,history,setHistory,infoMode,setInfoMode,vehicle,
          setVehicle,showCalcButtons,setShowCalcButtons,calcHeadingText,setCalcHeadingText,payment,
          setPayment,setMenuButtons,locateDealershipsFn,changeSelected,setDealers,selected,cat,setCat, setOptionButtons,locateDealershipsRad
        );
    }
}
        useEffect(() => {
  // Check if speech recognition is supported
  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const recognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionInstance.continuous = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = function (event) {
          const recognizedText = event.results[event.results.length - 1][0].transcript;
          setQueryText(recognizedText);
      };

      recognitionInstance.onerror = function (event) {
          console.error("Speech recognition error:", event.error);
      };

      recognition.current = recognitionInstance;
  } else {
      console.error("Speech recognition not supported in this browser.");
  }
}, []);
const toggleRecording = () => {
  if (blockQueries.current) {
      recognition.current.stop();
      setRecording(false);
  } else {
      recognition.current.start();
      setRecording(true);
  }
  blockQueries.current = !blockQueries.current;
};
  //---------------------------------------------
  //SEND MESSAGES
  const handleMoreInfo = () => {
    setMessages((m) => [...m, { msg: "", author: "Table" }]);
  };
  useEffect(() => {
    handleUserFlow(origButtons,tableForceUpdate, setTableForceUpdate,handleMoreInfo,handleCarInfoButton,
      fixTrimQueryQuotation,query,dealerList,carInfoData,setCarInfoData,extractFiveDigitString,findLocations,
      handleUserInput,blockQueries,choice,setQuery,zipMode,setZipCode,messages,setMessages,setZipMode,setDistance,setCalcButtons,calcButtonHandler,
      zipCode,distance,findMode,selectHandler,setFind,appendSelect,setSelect,questionnaireStep,
      setQuestionnaireAnswers,setQuestionnaireStep,questionnaireAnswers,
      setForceUpdate,forceUpdate,calcStep,model,setModel,setCalcStep,trim,
      setTrim,calcMode,setCalcMode,setLeaseStep,
      setFinanceStep,leaseStep,financeStep,changeChoice,history,setHistory,infoMode,setInfoMode,vehicle,
      setVehicle,showCalcButtons,setShowCalcButtons,calcHeadingText,setCalcHeadingText,payment,
      setPayment,setMenuButtons,locateDealershipsFn,changeSelected,setDealers,selected,cat,setCat, setOptionButtons,locateDealershipsRad
    );
}, [query, history, calcStep, calcMode, leaseStep, financeStep, choice, menuButtons, model, trim]);

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
    }
    else{
        setMessages((prevState) => [
        ...prevState,
        { author: "You", msg: message },
      ]);
      setQuery(message);
    }
    // } else if (count === 2 || (optionMessage === "null" && count !== 0)) {
    

    //   // Send a POST request to your API with the user's message
    //   fetch("http://fordchat.franklinyin.com/quer", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ quer: message, debug: true }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       // Add the bot's response to the messages list
    //       setMessages((prevState) => [
    //         ...prevState,
    //         { author: "Ford Chat", msg: data.response },
    //       ]);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });

    //   // Clear the message input
    //   setMessage("");
    //  else if (count === 1) {
    //   setMessages((prevState) => [
    //     ...prevState,
    //     { author: "You", msg: optionMessage },
    //   ]);
    //   setSelected(optionMessage);
    //   //timout
    // }
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
              setOpen1(false);
              setOpen2(false);
              setOpen3(false);
              setOpen4(false);
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
      <ScrollView style={styles.chatList} contentContainerStyle={{ paddingBottom: "50%" }}>
  {messages.map((item, index) => (
    <ChatItem 
      key={index} 
      author={item.author} 
      msg={item.msg}
      darkMode={darkMode}
      textSize={textSize}
      zip={item.zip}
      locs={item.locs}
      dropDownOptions={dropDownOptions}
      carInfoData={carInfoData[""+(index)]?carInfoData[""+(index)]:[[],[]]}
      carInfoMode={carInfoMode}
      setMessages={setMessages}
      setMenuButtons={setMenuButtons}
      handleUserInput={handleUserInput}
      carSpecInfo={item.carInfo}
      selectedCar={selectedCar}
      setSelectedCar={setSelectedCar}
      tableFunctions={tableFunctions}
      messageIndex={index}
      selectedCars={selectedCars}
      setOptionButtons={setOptionButtons}
    />
  ))}
  {
          
          showCalcButtons && 
          (
            infoMode === 0 ? <ScheduleDrive calcButtons = {calcButtons} back = {goBack}></ScheduleDrive>
            : <ScheduleDrive2 calcButtons = {calcButtons} mode = {infoMode-1} back = {goBack}></ScheduleDrive2>
          )
        }
</ScrollView>
        {optionButtons}
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
