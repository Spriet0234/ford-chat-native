import { View } from "react-native";

import TableModel from "./TableModel";
import Popup from "./Popup";
import { useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";

import images from "../src/images/image_link.json";
import { Image } from "react-native";
const tables = {};
const tableHead = ["Make", "Model", "MSRP"];
let onPresses = [];

//import '../src/styles/Table.css'

export default function CarInfoTable({ data, num }) {
  //Array which will be used to generate table
  console.log("I  FIRST", num)
  console.log("THE DATA", data)
  const [tableData, setTableData] = useState([]);
  console.log("I RECEIVED", tableData)
  const [visible, setVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Info about...");
  const [popupContent, setPopupContent] = useState(
    <View>
      <h1>Hello</h1>
    </View>
  );

  useEffect(()=>{
    setTableData(data[0].map((car) => [car.model, car.trim, car.msrp]))
  }, [data])

  const showDialog = (dt) => {
    setPopupTitle("Info about this Ford " + dt.model);
    setPopupContent(
      <View>
        <Image
          source={{uri:`${images[dt.model][dt.trim]}`}}
          style={{ alignSelf: "center", width: 300, height: 200 }}
        ></Image>
        <Text>
          Trim: {dt.trim} {"\n"}
          MSRP: {dt.msrp} {"\n"}
          Body Size: {dt.body_size} {"\n"}
          Body Style: {dt.body_style} {"\n"}
          Seating Capacity: {dt.seating_capacity} {"\n"}
          Drivetrain {dt.drivetrain} {"\n"}
          Transmission: {dt.transmission} {"\n"}
          Horsepower: {dt.horsepower} {"\n"}
        </Text>
      </View>
    );
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  return (
    <View>
        <Popup title={popupTitle} visible={visible} content={popupContent} dismiss={hideDialog} actions={(<Button onPress={()=>{hideDialog()}}>Done</Button>)}/>
        <Text style={{textAlign: 'center', fontSize: 15, margin: '2%'}}>Tap on a specific row for more information about that model.</Text>
        <TableModel header={tableHead} table={tableData} onPresses={[showDialog, showDialog, showDialog]} params={data[0]}/>
    </View>
  );
}
