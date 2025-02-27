import { View, Text, Dimensions, ScrollView, Image } from "react-native";
import React from "react";
import PlanCard from "./../TripDetails/PlanCard";

const { width, height } = Dimensions.get("window");

export default function PlanList({ planList }) {
  return (
    <View>
      <Text
        style={{
          fontFamily: "montserrat-bold",
          fontSize: height * 0.023,
          marginTop: height * 0.025,
        }}
      >
        🏕 Plan Details
      </Text>

      {/* Iterating over the days */}
      {planList && planList.length > 0 ? (
        planList.map((dayPlan) => {
          // Kinyerjük a nap számát a "day1", "day2" stb. szövegből
          const dayIndex =
            parseInt(dayPlan?.day.match(/\d+/)?.[0], 10) - 1 || 0;

          return (
            <View key={dayIndex}>
              {/* Show Days */}
              <Text
                style={{
                  fontFamily: "montserrat-bold",
                  fontSize: height * 0.02,
                  color: "#333",
                  marginTop: height * 0.01,
                  marginBottom: height * 0.01,
                }}
              >
                {dayPlan?.day.charAt(0).toUpperCase() + dayPlan?.day.slice(1)}
              </Text>
              {dayPlan?.activities.map((activity, activitiesIndex) => (
                <PlanCard key={activitiesIndex} activities={activity} />
              ))}
            </View>
          );
        })
      ) : (
        <Text style={{ textAlign: "center", marginTop: height * 0.05 }}>
          No plans available
        </Text>
      )}
    </View>
  );
}
