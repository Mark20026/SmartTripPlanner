import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef } from "./../../services/GooglePlacesApi";

const { width, height } = Dimensions.get("window");

export default function HotelCard({ item }) {
  const [photoRef, setPhotoRef] = useState();
  useEffect(() => {
    GetGooglePhotoRef();
  }, []);
  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(item.hotelName || item.name);
    setPhotoRef(result?.results[0]?.photos[0]?.photo_reference);
  };
  return (
    <View style={{ marginRight: width * 0.05, width: width * 0.4 }}>
      <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            photoRef +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={{
          width: width * 0.4,
          height: height * 0.15,
          borderRadius: 15,
        }}
      />
      <View>
        <Text
          style={{
            fontFamily: "montserrat-medium",
            fontSize: height * 0.019,
            marginTop: height * 0.01,
          }}
        >
          {item.name || item.hotelName}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "montserrat-medium", color: "black" }}>
            ⭐ {item.rating.replace(" stars", "")}
          </Text>
          <Text style={{ fontFamily: "montserrat-medium", color: "black" }}>
            💰 {item.price.replace("Starting from", "").replace("per", "/")}
          </Text>
        </View>
      </View>
    </View>
  );
}
