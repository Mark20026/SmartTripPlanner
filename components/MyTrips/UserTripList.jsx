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
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function UserTripList({ userTrips }) {
  const LatestTrip = userTrips[0].tripData;
  const router = useRouter();

  return (
    <View>
      <View style={{ marginTop: -140 }}>
        {LatestTrip.locationInfo?.photoRef ? (
          <Image
            source={{
              uri:
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                LatestTrip.locationInfo?.photoRef +
                "&key=" +
                process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            }}
            style={{
              width: width - 15,
              height: height * 0.25,
              objectFir: "cover",
              borderRadius: 15,
            }}
          />
        ) : (
          <Image
            source={require("../../assets/images/placeholder.jpeg")}
            style={{
              width: width - 15,
              height: height * 0.25,
              objectFir: "cover",
              borderRadius: 15,
            }}
          />
        )}
        <View style={{ marginTop: height * 0.01 }}>
          <Text
            style={{
              fontFamily: "montserrat-bold",
              fontSize: height * 0.024,
            }}
          >
            {userTrips[0]?.response?.trip?.destination}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "montserrat-medium",
                fontSize: height * 0.02,
                color: "gray",
              }}
            >
              {moment(userTrips[0]?.tripData?.startDate).format("DD MMM yyyy")}
            </Text>
            <Text
              style={{
                fontFamily: "montserrat-medium",
                fontSize: height * 0.02,
                color: "gray",
              }}
            >
              {userTrips[0]?.tripData?.travelerCount?.icon}
              {userTrips[0]?.tripData?.travelerCount?.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/trip-details",
                params: { trip: JSON.stringify(userTrips[0]) },
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>See your plan</Text>
          </TouchableOpacity>
        </View>
        {userTrips.map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
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
