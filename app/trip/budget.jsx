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

const { width, height } = Dimensions.get("window");

export default function Budget() {
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

  useEffect(() => {
    setTripData({ ...tripData, budget: selectedBudget });
  }, [selectedBudget]);
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Budget</Text>
      <Text style={styles.subheading}>
        Choose your preferred spending level for the trip.
      </Text>
      <FlatList
        data={SelectBudgetList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedBudget(item);
            }}
            style={{
              marginVertical: 10,
            }}
          >
            <OptionCard option={item} selectedOption={selectedBudget} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/trip/trip_review")}
      >
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
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "montserrat-bold",
    textAlign: "center",
    color: "white",
  },
});
