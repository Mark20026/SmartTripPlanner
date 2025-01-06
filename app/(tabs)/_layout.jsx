import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "trips") {
            iconName = focused ? "map" : "map-o";
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === "add_trips") {
            iconName = focused ? "plus" : "plus";

            // Wrapping the icon in a circular view
            return (
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: Colors.SECONDARY,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <FontAwesome name={iconName} size={size} color="white" />
              </View>
            );
          } else if (route.name === "profile") {
            iconName = focused ? "user" : "user-o"; // Different icons for focused and unfocused
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: Colors.SECONDARY,
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 12, fontFamily: "montserrat-bold" },
        tabBarStyle: { backgroundColor: Colors.PRIMARY, height: 60 },
        headerShown: false, // Hide header
      })}
    >
      <Tabs.Screen
        name="trips"
        options={{
          tabBarLabel: "My Trips",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
