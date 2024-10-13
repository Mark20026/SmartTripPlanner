import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

export default function OptionCard({ option, selectedTraveler }) {
  const isSelected = selectedTraveler?.id === option?.id;
  return (
    <View
      style={[
        {
          padding: height * 0.015,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors.THIRD,
          borderRadius: height * 0.015,
          borderWidth: isSelected ? 2 : 0, // Conditionally apply border width
          borderColor: isSelected ? Colors.SECONDARY : "transparent", // Set border color
        },
      ]}
    >
      <View>
        <Text
          style={{
            fontSize: height * 0.025,
            fontFamily: "roboto-bold",
          }}
        >
          {option?.title}
        </Text>
        <Text
          style={{
            fontSize: height * 0.02,
            fontFamily: "roboto",
            color: "gray",
          }}
        >
          {option?.desc}
        </Text>
      </View>
      <Text
        style={{
          fontSize: height * 0.04,
        }}
      >
        {option?.icon}
      </Text>
    </View>
  );
}