import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

export function DealerDrive() {
  const handlePress = () => Linking.openURL("https://www.example.com");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Wayne Ford</Text>
      </View>
      <Image
        source={require("../assets/deal.png")}
        resizeMode="contain" // Add this line
        style={{
          alignSelf: "flex-end",

          width: 220,
          height: 180,
          alignSelf: "flex-start",
          marginRight: 20,
          marginTop: 0,
        }}
      ></Image>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center",
          }}
        >
          <Image
            source={require("../assets/maps.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 22,
              marginRight: 20,
              marginTop: -7,
              marginBottom: 5,
              marginLeft: -1,
            }}
          ></Image>
          <TouchableOpacity
            onPress={handlePress}
            style={{ alignSelf: "center" }}
          >
            <Text style={styles.linkText}>View on Google Maps</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Image
            source={require("../assets/1.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -7,
            }}
          ></Image>

          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            444 Rte 46, Wayne, NJ 07470
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "start",
            alignContent: "center",
          }}
        >
          {" "}
          <Image
            source={require("../assets/2.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -5,
            }}
          ></Image>
          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            (888)349-6957
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "start",
            alignContent: "center",
          }}
        >
          {" "}
          <Image
            source={require("../assets/3.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -5,
            }}
          ></Image>
          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            waynefordcars.com
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/clock.png")}
            resizeMode="contain" // Add this line
            style={{
              width: 30,
              alignSelf: "center",
              height: 20,
              marginRight: 20,
              marginTop: -5,
            }}
          ></Image>
          <Text
            style={{
              color: "#00095B",
              fontWeight: 400,
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            Open-closes at 8pm
          </Text>
        </View>
      </View>
      <TouchableOpacity style={{ flexDirection: "row", marginTop: 15 }}>
        <Image
          source={require("../assets/arrow.png")}
          resizeMode="contain"
          style={{
            width: 30,
            height: 20,
          }}
        />
        <Text> Back</Text>
      </TouchableOpacity>
    </View>
  );
}
export function DealerDrive2() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.title2}>Models & Trims Available</Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignSelf: "flex-end" }}
        >
          <Text> View More</Text>
          <Image
            source={require("../assets/RArrow.png")}
            resizeMode="contain"
            style={{
              width: 30,
              height: 20,
              marginLeft: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.text22}>Based on your selection</Text>
      <View style={{ flexDirection: "row" }}>
        <Conts2 />
        <Conts2 />
      </View>
    </View>
  );
}

export function DealerDrive3() {
  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.title}>Next Appointments Available</Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignSelf: "flex-end" }}
        >
          <Text> View More</Text>
          <Image
            source={require("../assets/RArrow.png")}
            resizeMode="contain"
            style={{
              width: 30,
              height: 20,
              marginLeft: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "white",
              height: 150,
              width: 150,
              padding: 10,
              borderRadius: 15,
            }}
          >
            <Text style={{ fontWeight: 500, fontSize: 17 }}>
              Click here to select date and time to find closest appointments
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: 10,
          }}
        >
          <Times />
          <Times />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: 10,
          }}
        >
          <Times />
          <Times />
        </View>
      </View>
    </View>
  );
}
export function DealerDrive4() {
  const a = [1, 2, 3];
  const b = [4, 5, 6];
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title2}>Schedule a Test Drive Appointment</Text>
      <Text style={styles.text23}>Look up date and time</Text>

      <DatePicker selected={date} onChange={(date) => setDate(date)} />

      <Text style={styles.text23}> Appointments available</Text>

      <View
        style={{
          alignSelf: "center",
          alignContent: "center",
          flexDirection: "row",
        }}
      >
        {" "}
        <View
          style={{
            flexDirection: "column",
            height: 250,
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          {a.map(() => {
            return <Times />;
          })}
        </View>
        <View
          style={{
            flexDirection: "column",
            height: 250,
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          {b.map(() => {
            return <Times />;
          })}
        </View>
      </View>
    </View>
  );
}
export function DealerDrive5() {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const handlePress = () => Linking.openURL("https://www.example.com");

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>Schedule Test Drive Appointment</Text>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          marginTop: 8,
          width: "90%",
          padding: 2,
        }}
      >
        <Text style={styles.text2}>Wayne Ford - Thursday, 7/13@ 12:00pm</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View>
          <View>
            <Text style={styles.text23}>Trims to test drive</Text>
            <Text>Limited to 2 cars to test drive during your appointment</Text>
            <Image
              source={require("../assets/mustang.png")}
              resizeMode="contain" // Add this line
              style={{
                width: 180,
                height: 180,
                alignSelf: "center",
                marginRight: 10,
                marginBottom: -30,
              }}
            ></Image>
          </View>
          <Text style={styles.text23}>Guest Information</Text>
          <TouchableOpacity onPress={handlePress} style={{ marginBottom: 10 }}>
            <Text style={styles.linkText}>Or Login/Create Ford account</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPhone(text)}
            value={phone}
            placeholder="Phone number"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNotes(text)}
            value={notes}
            placeholder="Notes/Requests"
          />
        </View>
      </View>
    </View>
  );
}
export function DealerDrive6() {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const handlePress = () => Linking.openURL("https://www.example.com");

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>Your appointment is confirmed</Text>
      <Text style={{ marginTop: 10 }}>
        A confirmation email has been sent. Please arrive 15 minutes before your
        scheduled appointment time.
      </Text>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          marginTop: 8,
          width: "90%",
          padding: 2,
        }}
      >
        <Text style={styles.text2}>Wayne Ford - Thursday, 7/13@ 12:00pm</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View>
          <View>
            <Text style={styles.text23}>Trims to test drive</Text>
            <Image
              source={require("../assets/mustang.png")}
              resizeMode="contain" // Add this line
              style={{
                width: 180,
                height: 180,
                alignSelf: "center",
                marginRight: 10,
                marginBottom: 0,
              }}
            ></Image>
          </View>

          <View style={styles.input2}>
            <Text style={{ alignSelf: "center" }}>Name</Text>
          </View>
          <View style={styles.input2}>
            <Text style={{ alignSelf: "center" }}>Email</Text>
          </View>
          <View style={styles.input2}>
            <Text style={{ alignSelf: "center" }}>Phone number</Text>
          </View>
          <View style={styles.input2}>
            <Text style={{ alignSelf: "center" }}>Notes/Requests</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export function Conts2() {
  return (
    <Image
      source={require("../assets/mustang.png")}
      resizeMode="contain" // Add this line
      style={{ width: 180, height: 180, alignSelf: "center", marginRight: 10 }}
    ></Image>
  );
}
export function Times() {
  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          paddingHorizontal: 20,
          paddingVertical: 5,
          margin: 5,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 400 }}>Thursday, 7/13</Text>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>12:00pm</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    marginTop: 240,
    height: "auto",
    position: "relative",
    padding: 20,
    paddingTop: 0,
  },
  container2: {
    textAlign: "start",
    alignSelf: "center",
    alignItems: "start",
    justifyContent: "start",
    backgroundColor: "#113B7A1A",
    width: "90%",
    borderRadius: 30,
    marginTop: 240,
    height: "auto",
    position: "relative",
    paddingleft: 140,
  },
  title: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 21,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 0,
  },
  title2: {
    color: "#00095B",
    fontWeight: 700,
    fontSize: 24,
    alignSelf: "start",
    marginTop: 20,

    alignContent: "flex-end",
    alignSelf: "center",
  },
  text2: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "center",
    marginTop: 0,
  },
  text22: {
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "start",
    marginTop: -4,
    marginBottom: 1,
    marginLeft: 0,
    padding: 0,
    alignContent: "flex-end",
    textAlign: "left",
  },
  linkText: {
    textDecorationLine: "underline",
    color: "#00095B",
    fontWeight: 400,
    fontSize: 17,
    alignSelf: "center",
    marginTop: -6,
    marginBottom: 6,
  },
  text23: {
    color: "#00095B",
    fontWeight: 500,
    fontSize: 19,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    height: 30,
    marginBottom: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#444",
    width: "77%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input2: {
    height: 30,
    marginBottom: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#444",
    width: "77%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
