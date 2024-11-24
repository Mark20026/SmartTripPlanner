import { View, Text, Dimensions, FlatList, Image } from "react-native";
import React from "react";
import { GetPhotoRef } from "./../../services/GooglePlacesApi";
import HotelCard from "./../TripDetails/HotelCard";

const { width, height } = Dimensions.get("window");

export default function HotelList({ hotelList }) {
  return (
    <View>
      <Text
        style={{
          fontFamily: "montserrat-bold",
          fontSize: height * 0.023,
          marginTop: height * 0.025,
        }}
      >
        🏨 Hotel Recommendation
      </Text>
      <FlatList
        data={hotelList}
        style={{ marginTop: height * 0.015 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <HotelCard item={item} />}
      />
    </View>
  );
}
