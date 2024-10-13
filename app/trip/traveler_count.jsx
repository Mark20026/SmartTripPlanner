import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors.ts";
import { SelectTravelerList } from "../../constants/options.js";
import OptionCard from "../../components/TripOptions/OptionCard";
import { CreateTripContext } from "./../../context/CreateTripContext.js";

const { width, height } = Dimensions.get("window");

export default function TravelerCount() {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedTraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    setTripData({ ...tripData, travelerCount: selectedTraveler });
  }, [selectedTraveler]);

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Traveler Count</Text>

      <Text style={styles.description}>
        Select how many people are travelling
      </Text>

      <FlatList
        data={SelectTravelerList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedTraveler(item);
            }}
            style={{
              marginVertical: 10,
            }}
          >
            <OptionCard option={item} selectedTraveler={selectedTraveler} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/trip/calendar")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: width * 0.06,
    paddingTop: height * 0.15,
    backgroundColor: "white",
    height: "100%",
  },
  heading: {
    fontFamily: "roboto-bold",
    fontSize: height * 0.035,
    color: "black",
  },
  description: {
    marginTop: height * 0.03,
    fontFamily: "roboto-bold",
    fontSize: height * 0.025,
    color: "black",
  },
  button: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.25,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "roboto-bold",
    textAlign: "center",
    color: "white",
  },
});
