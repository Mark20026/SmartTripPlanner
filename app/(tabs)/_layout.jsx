import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome"; // Import FontAwesome icons
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "trips") {
            iconName = focused ? "map" : "map-o"; // Different icons for focused and unfocused
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === "add_trips") {
            iconName = focused ? "plus" : "plus"; // Different icons for focused and unfocused

            // Wrapping the icon in a circular view
            return (
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: Colors.SECONDARY, // Background color for the circle
                  borderRadius: 30, // Half of width/height to make it a perfect circle
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20, // To elevate the icon above the others
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
        tabBarActiveTintColor: Colors.SECONDARY, // Custom color when tab is active
        tabBarInactiveTintColor: "white", // Color when tab is inactive
        tabBarLabelStyle: { fontSize: 12, fontFamily: "roboto-bold" }, // Custom label font and size
        tabBarStyle: { backgroundColor: Colors.PRIMARY, height: 60 }, // Customize the tab bar background and height
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
        name="add_trips"
        options={{
          tabBarLabel: "Add Trip",
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
