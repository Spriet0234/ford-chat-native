import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ChatInterface from "./components/ChatInterface";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Login2, Login3 } from "./components/login";
import { MapComponent } from "./components/MapComponent";
import {
  ScheduleDrive,
  ScheduleDrive2,
  ScheduleDrive3,
  ScheduleDrive4,
} from "./components/ScheduleDrive";
import Home from "./components/Home";
import { DealerDrive } from "./components/DealerDrive";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chat-Interface" headerMode="none">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat-Interface"
          component={ChatInterface}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Schedule"
          component={ScheduleDrive4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dealer"
          component={DealerDrive}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
