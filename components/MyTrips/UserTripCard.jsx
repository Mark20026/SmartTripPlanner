import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function UserTripCard({ trip, index }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/trip-details",
          params: { tripIndex: index },
        })
      }
      style={{
        marginTop: "5%",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            trip.tripData.locationInfo?.photoRef +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={{
          width: width * 0.3,
          height: height * 0.15,
          objectFit: "cover",
          borderRadius: 15,
        }}
      />
      <View>
        <Text
          style={{ fontFamily: "montserrat-bold", fontSize: height * 0.02 }}
        >
          {trip.response?.trip?.destination}
        </Text>
        <Text
          style={{
            fontFamily: "montserrat-medium",
            fontSize: height * 0.017,
            color: "gray",
          }}
        >
          {moment(trip.tripData?.startDate).format("DD MMM yyyy")}
        </Text>
        <Text
          style={{
            fontFamily: "montserrat-medium",
            fontSize: height * 0.017,
            color: "gray",
          }}
        >
          {trip.tripData?.travelerCount?.icon} Travelling:{" "}
          {trip.tripData?.travelerCount?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
