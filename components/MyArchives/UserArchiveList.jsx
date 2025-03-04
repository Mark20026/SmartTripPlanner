import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "./../../constants/Colors.ts";
import UserArchiveCard from "./UserArchiveCard";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function UserArchiveList({ userTrips }) {
  const router = useRouter();

  // Rendezett lista dátum szerint
  const sortedTrips = [...userTrips].sort(
    (a, b) => new Date(a.tripData.startDate) - new Date(b.tripData.startDate)
  );

  const LatestTrip = sortedTrips[0]?.tripData; // Mindig a legelső (legkorábbi) utazás

  return (
    <View>
      <View style={{ marginTop: -140 }}>
        {sortedTrips.map((trip, index) => (
          <UserArchiveCard trip={trip} index={index} key={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "montserrat-bold",
    textAlign: "center",
    color: "white",
  },
  button: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: "5%",
  },
});
