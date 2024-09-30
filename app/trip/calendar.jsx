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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

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
      return;
    }
    const totalNoDays = endDate.diff(startDate, "days");
    console.log(totalNoDays + 1);
    setTripData({
      ...tripData,
      startDate: startDate,
      endDate: endDate,
      totalNoDays: totalNoDays + 1,
    });
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

      <TouchableOpacity
        style={styles.button2}
        onPress={OnDateSelectionContinue}
      >
        <Text style={styles.buttonText2}>Log In</Text>
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
    fontFamily: "roboto-bold",
    fontSize: height * 0.04,
    color: "black",
    marginBottom: height * 0.06,
  },
});
