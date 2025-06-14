import { View, Text, Dimensions, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { GetPhotoRef } from "./../../services/GooglePlacesApi";

const { width, height } = Dimensions.get("window");

export default function PlanCard({ activities }) {
  const [photoRef, setPhotoRef] = useState();
  useEffect(() => {
    GetGooglePhotoRef();
  }, []);
  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(activities.activity);
    setPhotoRef(result?.results[0]?.photos[0]?.photo_reference);
  };
  return (
    <View
      style={{
        backgroundColor: "#f0f0f0",
        padding: height * 0.015,
        borderRadius: 10,
        marginBottom: height * 0.01,
      }}
    >
      <Image
        source={
          activities.activity.toLowerCase().includes("arrive")
            ? require("../../assets/images/airport-placeholder.jpg")
            : {
                uri:
                  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                  photoRef +
                  "&key=" +
                  process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
              }
        }
        style={{
          width: "100%",
          height: height * 0.17,
          borderRadius: 15,
          marginBottom: height * 0.01,
          marginTop: height * 0.01,
        }}
      />
      <Text
        style={{
          fontFamily: "montserrat-bold",
          fontSize: height * 0.02,
        }}
      >
        📍 {activities.activity}
      </Text>
      <Text
        style={{
          fontFamily: "montserrat-medium",
          fontSize: height * 0.018,
          color: "gray",
          marginTop: height * 0.01,
        }}
      >
        ℹ️ {activities.details || activities.place_details}
      </Text>
      <Text
        style={{
          fontFamily: "montserrat-bold",
          fontSize: height * 0.018,
          marginTop: height * 0.01,
        }}
      >
        🎫 Ticket Price:{" "}
        {activities.ticket_pricing
          ? activities.ticket_pricing.replace("From", "")
          : "Free"}
      </Text>
    </View>
  );
}
