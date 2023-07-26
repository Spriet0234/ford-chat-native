import trims from "../jsons/trims.json";
import vehicles from "../jsons/vehicleCategories.json";
import { sendBotResponse, sendRecommendRequestToServer } from "./botResponseFunctions";
import handleDealerFlow from "./user_flows/handleDealerFlow";
import handlePaymentFlow from "./user_flows/handlePaymentFlow";
import handleInfoFlow from "./user_flows/handleInfoFlow";
import images from "../images/image_link.json";
import {View,TextInput,Button,Text,FlatList,StyleSheet,KeyboardAvoidingView,
    Platform,TouchableOpacity,Image,ScrollView} from "react-native";



export function handleUserInputFn(setMessages,changeChoice,setMenuButtons,buyACarButtons,setCalcButtons,model,setModel,calcButtonHandler,setCalcStep,trim,setQuery,blockQueries,setResponse,setShowCalcButtons,setCalcHeadingText,setInfoMode,cat,setCat, setOptionButtons) {
    return (option) => {
        // Outputs a response to based on input user selects
        if(option.includes("SCHED")){
            setMessages((m) => [...m, { msg: option.replace("SCHED", "").split("MODEL")[0], author: "You" }]);
            setMessages((m) => [...m, { msg: "Please enter your zipcode below:", author: "Ford Chat", line: true, zip: {} }]);
            setMenuButtons([])
            setOptionButtons([])
            changeChoice(option);
        }
        else
        switch (option) {
            case "I":
              setInfoMode(0);
                if (cat === "") {
                    setMessages((m) => [...m, { msg: "Info on a specific car", author: "You", line: true, zip: {} }]);
                    setMessages((m) => [...m, { msg: "Please select a model/trim of the specific car you're looking for", author: "Ford Chat", line: true, zip: "" }]);
                }
                setCalcHeadingText("Choose vehicle category");
                setShowCalcButtons(true);
                setCalcButtons(
                    Object.keys(vehicles).map((vehicle) => (
                        <Conts
                            key={vehicle}
                            value={vehicle}
                            onPress={() => {
                                setQuery(vehicle);
                                setInfoMode(1);
                                setCat(vehicle);
                            }}
                            inp = {vehicle}/>
                    ))
                );
                changeChoice("I");
                blockQueries.current = false;
                break;
            case "A":
                setMessages((m) => [...m, { msg: "Car recommendation", author: "You" }]);
                setMessages((m) => [
                    ...m,
                    {
                        msg: "Happy to help! Do you have specific needs in mind, or would you like to fill out our questionnaire?",
                        author: "Ford Chat",
                        line: true,
                        zip: {},
                    },
                ]);
                setMenuButtons([buyACarButtons]);
                break;
            case "B":
                setMessages((m) => [...m, { msg: "Find a dealership", author: "You" }]);
                setMessages((m) => [...m, { msg: "Please enter your zipcode below:", author: "Ford Chat", line: true, zip: {} }]);
                changeChoice("B");
                break;
            case "C":
                setMessages((m) => [...m, { msg: "Schedule a test drive", author: "You" }]);
                setMessages((m) => [...m, { msg: "Please enter your zipcode or enable location to continue:", author: "Ford Chat", line: true, zip: {} }]);
                changeChoice("C");
                blockQueries.current = false;
                break;
            case "D":
                setMessages((m) => [...m, { msg: "Car pricing estimator", author: "You" }]);
                if (model === "") {
                    setMessages((m) => [...m, { msg: "What model are you interested in?", author: "Ford Chat" }]);
                    setCalcHeadingText("Choose specific model");
                    setShowCalcButtons(true);
                    setCalcButtons(
                        Object.keys(trims).map((model) => (
                            <Conts2
                            key={model}
                            value={model}
                            onPress = {() => {
                                setQuery(model);
                                setModel(model);
                                setMessages((m) => [...m, { msg: model, author: "You" }]);
                                setCalcButtons([]);
                                setShowCalcButtons(false);
                            }}
                            inp = {model}
                            imag = {images["Default"][model]}
                            />
                        ))
                    );
                    setCalcStep(1);
                } else if (trim === "") {
                    setQuery(model);
                    setCalcStep(1);
                    blockQueries.current = false;
                } else {
                    setQuery(trim);
                    setCalcStep(2);
                    blockQueries.current = false;
                }
                changeChoice("D");
                //setMenuButtons([]);
                break;
            case "maintenanceQuestions":
                changeChoice("maintenanceQuestions");
                break;
            default:
                setResponse("Invalid input. Please select one of the options (A, B, C, or D).");
                break;
        }
    };
}

export function handleUserFlow(origButtons,tableForceUpdate,setTableForceUpdate,handleMoreInfo,handleCarInfoButton,fixTrimQueryQuotation,query,dealerList,carInfoData,setCarInfoData,extractFiveDigitString,findLocations,handleUserInput,blockQueries,choice,setQuery,zipMode,setZipCode,messages,setMessages,setZipMode,setDistance,
    setCalcButtons,calcButtonHandler,zipCode,distance,findMode,selectHandler,setFind,appendSelect, setSelect,questionnaireStep,
    setQuestionnaireAnswers,setQuestionnaireStep,questionnaireAnswers,setForceUpdate,forceUpdate,calcStep,model,setModel,setCalcStep, trim,setTrim,calcMode,setCalcMode,setLeaseStep,setFinanceStep,leaseStep,financeStep,
    changeChoice,history,setHistory,infoMode,setInfoMode,vehicle,setVehicle,showCalcButtons,setShowCalcButtons,calcHeadingText,setCalcHeadingText,payment,setPayment,setMenuButtons,locateDealershipsFn,changeSelected,setDealers,selected,cat,setCat,setOptionButtons
) {
    if (!blockQueries.current && query.length > 0) {
        blockQueries.current = true;
        setForceUpdate(!forceUpdate);
        if(choice.includes("SCHED")){
            const maintenanceMode=choice.replace("SCHED", "")
            const model=maintenanceMode.split("MODEL:")[1].split("TRIM:")[0]
            const trim=maintenanceMode.split("MODEL:")[1].split("TRIM:")[1]
            handleDealerFlow(zipMode, dealerList, setZipCode, query, setMessages, extractFiveDigitString, setZipMode, setDistance, findLocations, zipCode, distance, maintenanceMode.split("MODEL:")[0], model, trim);
            blockQueries.current = false;
        }
        else
        switch (choice) {
            case "maintenanceQuestions":
                sendBotResponse("I am looking to schedule maintenance for my Ford car and I have a question about maintenance. Here it is: " + query, history, "maint").then((res) => {
                    setMessages((m) => [...m, { msg: res, author: "Ford Chat", line: true, zip: {} }]);
                    blockQueries.current = false;
                });
                break;
            
            case "I":
            if (infoMode === 1) {
                setCalcHeadingText("Choose specific model");
                setCalcButtons(
                    Object.keys(vehicles[cat]).map((model) => (
                        <Conts2
                            key={model}
                            value={model}
                            onPress = {() => {
                                setQuery(model);
                                setInfoMode(2);
                                setModel(model);
                            }}
                            inp = {model}
                            imag = {images["Default"][model]}
                            >
                        </Conts2>
                    )));
                setVehicle(query);
                blockQueries.current = false;
                break;}
            else if(infoMode === 2){
                setCalcHeadingText(query + ": Choose specific trim");
                setCalcButtons(
                    vehicles[vehicle][model].map((trim) => (
                        <Conts2
                            key={trim}
                            value={trim}
                            onPress = {() => {
                                handleInfoFlow(handleMoreInfo,tableForceUpdate,setTableForceUpdate,forceUpdate,setForceUpdate,handleCarInfoButton,model,trim,setMessages,
                                    setModel,setQuery,setInfoMode,setCalcButtons,setMenuButtons,handleUserInput,setShowCalcButtons,setCarInfoData,
                                    infoMode,selected,changeSelected,setDealers,locateDealershipsFn,setSelect,setFind,query,setZipMode,setOptionButtons
                                );
                                setTrim(trim);
                            }}
                            inp = {trim}
                            imag = {images[model][trim]}
                            >
                        </Conts2>)
                    ));
                      blockQueries.current = false;
                      break;
            }
            else if(infoMode === 3){
              handleInfoFlow(handleMoreInfo,tableForceUpdate,setTableForceUpdate,forceUpdate,setForceUpdate,handleCarInfoButton,model,trim,setMessages,
                setModel,setQuery,setInfoMode,setCalcButtons,setMenuButtons,handleUserInput,setShowCalcButtons,setCarInfoData,
                infoMode,selected,changeSelected,setDealers,locateDealershipsFn,setSelect,setFind,query,setZipMode,setOptionButtons);
              blockQueries.current = false;
            break;
            }
            else if(infoMode === 4){
              handleInfoFlow(handleMoreInfo,tableForceUpdate,setTableForceUpdate,forceUpdate,setForceUpdate,handleCarInfoButton, model,trim, setMessages, setModel, setQuery, setInfoMode, setCalcButtons, setMenuButtons, handleUserInput, setShowCalcButtons, setCarInfoData, infoMode, selected, changeSelected, setDealers, locateDealershipsFn, setSelect, setFind, query, setZipMode);
              blockQueries.current = false;
              break;
            }
            else if(infoMode === 10){
                setCalcStep(2);
                changeChoice('D');
                handlePaymentFlow(calcStep,model,setModel,query,setQuery,
                    setMessages,setMenuButtons,setCalcButtons,blockQueries,setCalcStep,trim,setTrim,calcMode,
                    setCalcMode,setLeaseStep,setFinanceStep,leaseStep,financeStep,changeChoice,
                    setShowCalcButtons,setCalcHeadingText,payment,setPayment,origButtons,setOptionButtons
                );
                blockQueries.current = false;
                break;
            }
          case 'A':
            setQuery("");
            sendRecommendRequestToServer(query, history, carInfoData, messages, forceUpdate, blockQueries, setCarInfoData, setMessages, setForceUpdate, setHistory, fixTrimQueryQuotation);
            break;
          case "B": {
            setZipMode(1);
            handleDealerFlow(zipMode, dealerList, setZipCode, query, setMessages, extractFiveDigitString, setZipMode, setDistance, findLocations, zipCode, distance);
            blockQueries.current = false;
            break;
          }
          case "C":
            {
              if(findMode === 0){
                const numberRegex = /\d+/g;
                if(extractFiveDigitString(query)===null || query.match(numberRegex)[0].length != 5){
                  setMessages((m)=>[...m,{msg: "Please input a valid zipcode", author: "Ford Chat", line:false,zip:""}]);
                }
                else{
                    setZipCode(query);
                    setMessages((m) => [...m, { msg: "Please select 1-3 models/trims you are looking for.", author: "Ford Chat", line: true, zip: "" }]);
                    setShowCalcButtons(true);
                    setCalcButtons(
                        Object.keys(trims).map((model) => (
                            <TouchableOpacity className="model-button" key={model} value={model} onClick={selectHandler}>
                                <br />
                                {model}
                            </TouchableOpacity>
                        )));
                    setFind(1);
                }
            }
              else if(findMode === 1){
                  setShowCalcButtons(true);
                  setCalcButtons(trims[query].map(trim => (
                    <TouchableOpacity className='model-button' key={trim} value={trim} onClick={appendSelect}>{trim}</TouchableOpacity>
                  )))
                  setSelect(true);
              }
              blockQueries.current = false;
              break;
          }
            case "Q":
                switch (questionnaireStep) {
                    case 1:
                        setMessages((m) => [...m, { msg: "Are you interested in a specific type of vehicle, such as a cargo van, SUV, hatchback, or pickup truck?", author: "Ford Chat" }]);
                        setQuestionnaireAnswers((q) => [...q, query]);
                        setQuestionnaireStep(2);
                        blockQueries.current = false;
                        break;
                    case 2:
                        setMessages((m) => [...m, { msg: "How do you plan to use the car? Will it be primarily for commuting, family use, off-roading, or business purposes?", author: "Ford Chat" }]);
                        setQuestionnaireAnswers((q) => [...q, query]);
                        setQuestionnaireStep(3);
                        blockQueries.current = false;
                        break;
                    case 3:
                        setMessages((m) => [...m, { msg: "How many passengers do you need to accommodate regularly? ", author: "Ford Chat" }]);
                        setQuestionnaireAnswers((q) => [...q, query]);
                        setQuestionnaireStep(4);
                        blockQueries.current = false;
                        break;
                    case 4:
                        //setQuestionnaireAnswers(q=>[...q, query])
                        let questionnaireAnswersCopy = [...questionnaireAnswers, query];
                        setForceUpdate(!forceUpdate);
                        const ultimateQueryString =
                            "Here is my budget: " +
                            questionnaireAnswersCopy[0] +
                            ". I am looking for a " +
                            questionnaireAnswersCopy[1] +
                            ". I will primarily use it for the following: " +
                            questionnaireAnswersCopy[2] +
                            ". I need a seating capacity of at least: " +
                            questionnaireAnswersCopy[3];
                        sendRecommendRequestToServer(
                            ultimateQueryString,
                            history,
                            carInfoData,
                            messages,
                            forceUpdate,
                            blockQueries,
                            setCarInfoData,
                            setMessages,
                            setForceUpdate,
                            setHistory,
                            fixTrimQueryQuotation
                        );
                }
                break;
            case "D":
                setQuery("");
                handlePaymentFlow(
                    calcStep,
                    model,
                    setModel,
                    query,
                    setQuery,
                    setMessages,
                    setMenuButtons,
                    setCalcButtons,
                    blockQueries,
                    setCalcStep,
                    trim,
                    setTrim,
                    calcMode,
                    setCalcMode,
                    setLeaseStep,
                    setFinanceStep,
                    leaseStep,
                    financeStep,
                    changeChoice,
                    setShowCalcButtons,
                    setCalcHeadingText,
                    payment,
                    setPayment,
                    origButtons,
                    setOptionButtons
                );
                break;
            default:
                setQuery("");
                sendBotResponse(query, history, "chat").then((res) => {
                    setMessages((m) => [...m, { msg: res, author: "Ford Chat", line: true, zip: {} }]);
                    setHistory((h) => [...h.slice(-4), { q: query, a: res }]);
                    blockQueries.current = false;
                });
                break;
        }
    }
  }
  export function Conts({ inp, onPress }) {
    return (
      <TouchableOpacity
        style={{
          height: 110,
          width: 180,
          backgroundColor: "white",
          borderRadius: 10,
          marginRight: 15,
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
        }}
        onPress = {onPress}
      >
        <Text style={{ fontSize: 19 }}>{inp}</Text>
      </TouchableOpacity>
    );
  }
  export function Conts2({inp,imag, onPress}) {
    return (
        <TouchableOpacity onPress = {onPress}>
      <Image
        source={imag}
        resizeMode="contain" // Add this line
        style={{ width: 120, height: 120, alignSelf: "center", marginRight: 10 }}
      ></Image>
      <Text>{inp}</Text>
      </TouchableOpacity>
    );
  }
