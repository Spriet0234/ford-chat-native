import * as React from 'react';
import { Dialog, Portal } from 'react-native-paper';

export default function Popup(props){
    return(
            <Portal>
            <Dialog visible={props.visible} onDismiss={()=>{props.dismiss()}}>
              <Dialog.Title>{props.title}</Dialog.Title>
              <Dialog.Content>
                {props.content}
              </Dialog.Content>
              <Dialog.Actions>
                {props.actions}
              </Dialog.Actions>
            </Dialog>
          </Portal>)
}