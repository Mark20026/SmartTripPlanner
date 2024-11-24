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
        planList.map((dayPlan, dayIndex) => (
          <View>
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
            {dayPlan?.activities.map((activities, activitiesIndex) => (
              <PlanCard activities={activities} />
            ))}
          </View>
        ))
      ) : (
        <Text style={{ textAlign: "center", marginTop: height * 0.05 }}>
          No plans available
        </Text>
      )}
    </View>
  );
}
