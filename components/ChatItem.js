import styles from '../styles/ChatStyle.js';
import {
    View,
    Text,
    Image
  } from "react-native";
import {ScheduleDrive3} from './ScheduleDrive.js'
import {MapComponent} from './MapComponent.js'
import CarInfoTable from './CarInfoTable.js';
export default function ChatItem({msg, author, line, darkMode, textSize, zip, locs, dropDownOptions, carInfoData, carInfoMode, carSpecInfo, setMessages, setMenuButtons, handleUserInput, selectedCar, setSelectedCar, tableFunctions, messageIndex, selectedCars, setOptionButtons}){
    return <View>{
      author === "Info" && (
        <ScheduleDrive3 info = {carSpecInfo} handler = {handleUserInput}></ScheduleDrive3>
      )
    }
    {
      author==="Table" && <CarInfoTable data={[{
        "android_auto": "N/A",
        "apple_carplay": "N/A",
        "basic_miles": "36,000 miles",
        "basic_years": "3 years",
        "body_size": "Midsize",
        "body_style": "SUV",
        "combined_fuel_economy": "N/A",
        "curb_weight": "3298 lbs",
        "cylinders": "I3",
        "drivetrain": "FWD",
        "electric_range": "N/A",
        "engine_aspiration": "Turbocharged",
        "full_recharge_time": "N/A",
        "ground_clearance": "N/A",
        "highway_fuel_economy": "N/A",
        "horsepower": "181 hp @ 6000 rpm",
        "id": 127,
        "invoice_price": 27691,
        "make": "Ford",
        "max_cargo_capacity": "65.4 ft³",
        "model": "F-150",
        "msrp": 28845,
        "navigation_system": "N/A",
        "number_of_doors": 4,
        "payload_capacity": "N/A",
        "range": "N/A",
        "seating_capacity": 5,
        "torque": "190 ft-lbs. @ 3000 rpm",
        "towing_capacity": "2000 lbs",
        "transmission": "automatic",
        "trim": "Base",
        "used_new_price": 28845,
        "vehicle_length": "180.1 in.",
        "year": 2023,
        "isChecked": true
    },
    {
        "android_auto": "N/A",
        "apple_carplay": "N/A",
        "basic_miles": "36,000 miles",
        "basic_years": "3 years",
        "body_size": "Midsize",
        "body_style": "SUV",
        "combined_fuel_economy": "N/A",
        "curb_weight": "3474 lbs",
        "cylinders": "I3",
        "drivetrain": "AWD",
        "electric_range": "N/A",
        "engine_aspiration": "Turbocharged",
        "full_recharge_time": "N/A",
        "ground_clearance": "N/A",
        "highway_fuel_economy": "N/A",
        "horsepower": "181 hp @ 6000 rpm",
        "id": 36656,
        "invoice_price": 29486,
        "make": "Ford",
        "max_cargo_capacity": "65.4 ft³",
        "model": "Escape",
        "msrp": 30715,
        "navigation_system": "N/A",
        "number_of_doors": 4,
        "payload_capacity": "N/A",
        "range": "N/A",
        "seating_capacity": 5,
        "torque": "190 ft-lbs. @ 3000 rpm",
        "towing_capacity": "2000 lbs",
        "transmission": "automatic",
        "trim": "Active",
        "used_new_price": 30715,
        "vehicle_length": "181.2 in.",
        "year": 2023,
        "isChecked": true
    }
    ]}/>
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