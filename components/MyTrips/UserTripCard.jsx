import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default function UserTripCard({ trip }) {
  return (
    <View
      style={{
        marginTop: "5%",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/placeholder.jpeg")}
        style={{
          width: width * 0.3,
          height: height * 0.15,
          objectFir: "cover",
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
    </View>
  );
}
