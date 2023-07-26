import { View } from 'react-native';

import TableModel from "./TableModel";
import Popup from "./Popup";
import { useState } from 'react';
import { Button, Text } from 'react-native-paper';

const tables={}
const tableHead=["Make", "Model", "MSRP"]
let onPresses=[]

import '../src/styles/Table.css'

export default function CarInfoTable({data}){
    //Array which will be used to generate table
  const [tableData, setTableData] = useState(data.map(car=>[car.model, car.trim, car.msrp]))
  const [visible, setVisible] = useState(false)
  const [popupTitle, setPopupTitle] = useState("Info about...")
  const [popupContent, setPopupContent] = useState(<View>
    <h1>Hello</h1>
  </View>)

  const showDialog=(dt)=>{
    setPopupTitle("Info about this Ford "+dt.model)
    setPopupContent(<View>
        <p>Trim: {dt.trim} <br/>
        MSRP: {dt.msrp} <br/>
        Body Size: {dt.body_size} <br/>
        Body Style: {dt.body_style} <br/>
        Seating Capacity: {dt.seating_capacity} <br/>
        Drivetrain {dt.drivetrain} <br/>
        Transmission: {dt.transmission} <br/>
        Horsepower: {dt.horsepower} <br/>
        </p>
    </View>)
    setVisible(true)
   }

  const hideDialog=()=>{
    setVisible(false)
    }

  return (
    <View>
        <Popup title={popupTitle} visible={visible} content={popupContent} dismiss={hideDialog} actions={(<Button onPress={()=>{hideDialog()}}>Done</Button>)}/>
        <Text style={{textAlign: 'center', fontSize: 15, margin: '2%'}}>Tap on a specific row for more information about that model.</Text>
        <TableModel header={tableHead} table={tableData} onPresses={[showDialog, showDialog, showDialog]} params={data}/>
    </View>
  )
}