import * as React from 'react';
import { Button, DataTable } from 'react-native-paper';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

export default function TableModel(props){
    const dynamicSize={height: '100%', width: '33%', justifyContent: 'center', alignItems: 'center'}
  return (
    <ScrollView >
        <DataTable>
            <DataTable.Header>
                {
                    props.header.map((data)=>{
                        return <DataTable.Title style={{alignItems: 'center', justifyContent: 'center'}} key={data}>{data}</DataTable.Title>
                    })
                }
            </DataTable.Header>
            {
                props.table.map((car, index)=>{
                    return <DataTable.Row style={{backgroundColor: index%2==0?'#c7dbfc':'#7faaf5'}} key={car[0].substring(0,car[0].length/2)+car[1].substring(0,car[1].length/2)}>
                        {
                            car.map((data, col)=>{
                                return <Button style={{...dynamicSize}} onPress={()=>{props.onPresses?props.onPresses[col](props.params?props.params[index]:null):alert("Pressed")}} key={data}>
                                    <Text style={{textAlign:'center', width:'80%'}}>{data}</Text>
                                </Button>
                            })
                        }
                    </DataTable.Row>
                })
            }
        </DataTable>
    </ScrollView>
  );
}