import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors.ts";
import OptionCard from "../../components/TripOptions/OptionCard";
import { SelectBudgetList } from "../../constants/options.js";
import { CreateTripContext } from "./../../context/CreateTripContext.js";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default function TripReview() {
  const navigation = useNavigation();
  const [selectedBudget, setSelectedBudget] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Trip Review</Text>
      <Text style={styles.subheading}>
        Review the details of your upcoming trip. Make sure everything is
        correct before finalizing!
      </Text>
      {/* Location info review */}
      <View style={styles.infoBox}>
        <Text style={{ fontSize: height * 0.05, marginRight: width * 0.04 }}>
          📌
        </Text>
        <View>
          <Text style={styles.title}>Destination</Text>
          <Text style={styles.travelInfo}>{tripData?.locationInfo?.name}</Text>
        </View>
      </View>
      {/* Traveler info review */}
      <View style={styles.infoBox}>
        <Text style={{ fontSize: height * 0.05, marginRight: width * 0.04 }}>
          {tripData?.travelerCount?.icon}
        </Text>
        <View>
          <Text style={styles.title}>Traveler</Text>
          <Text style={styles.travelInfo}>
            {tripData?.travelerCount?.title}
          </Text>
        </View>
      </View>
      {/* Calendar info review */}
      <View style={styles.infoBox}>
        <Text style={{ fontSize: height * 0.05, marginRight: width * 0.04 }}>
          🗓️
        </Text>
        <View>
          <Text style={styles.title}>Travel Date</Text>
          <Text style={styles.travelInfo}>
            {moment(tripData?.startDate).format("DD MMM") +
              " To " +
              moment(tripData?.endDate).format("DD MMM") +
              " ( " +
              tripData?.totalNoDays +
              " Days )"}
          </Text>
        </View>
      </View>
      {/* Budget info review */}
      <View style={styles.infoBox}>
        <Text style={{ fontSize: height * 0.05, marginRight: width * 0.04 }}>
          {tripData?.budget?.icon}
        </Text>
        <View>
          <Text style={styles.title}>Budget</Text>
          <Text style={styles.travelInfo}>{tripData?.budget?.title}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/trip/loading_trip")}
      >
        <Text style={styles.buttonText}>Generate Trip</Text>
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
    marginBottom: height * 0.02,
  },
  subheading: {
    fontFamily: "montserrat",
    fontSize: height * 0.02,
    color: "gray",
    marginBottom: height * 0.06,
  },
  button: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.25,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 10,
    marginTop: height * 0.05,
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "montserrat-bold",
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: height * 0.02,
    color: "gray",
    fontFamily: "montserrat",
  },
  travelInfo: {
    fontSize: height * 0.024,
    fontFamily: "montserrat-medium",
  },
  infoBox: {
    flexDirection: "row",
    display: "flex",
    marginBottom: height * 0.05,
  },
});
