import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { CreateTripContext } from "./../../context/CreateTripContext.js";

const { width, height } = Dimensions.get("window");

export default function Calendar() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  const onDateChange = (date, type) => {
    console.log(date, type);
    if (type == "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
  }
  };
  const OnDateSelectionContinue = () => {
    if (!startDate && !endDate) {
      console.log("Please select both start and end dates.");

      return;
    }
    const totalNoDays = endDate.diff(startDate, "days");
    console.log(totalNoDays + 1);
    setTripData({
      ...tripData,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalNoDays: totalNoDays + 1,
    });
    router.push("/trip/budget");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Select Dates</Text>
      <CalendarPicker
        onDateChange={onDateChange}
        allowRangeSelection={true}
        minDate={new Date()}
        selectedRangeStyle={{
          backgroundColor: Colors.PRIMARY,
        }}
        selectedDayTextStyle={{
          color: "white",
        }}
      />
      <TouchableOpacity style={styles.button} onPress={OnDateSelectionContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: width * 0.06,
    paddingTop: height * 0.13,
    backgroundColor: "white",
    height: "100%",
  },
  heading: {
    fontFamily: "montserrat-bold",
    fontSize: height * 0.04,
    color: "black",
    marginBottom: height * 0.06,
  },
  button: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.25,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 10,
    marginTop: height * 0.2,
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "montserrat-bold",
    textAlign: "center",
    color: "white",
  },
});
