import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useState } from "react";
import { CreateTripContext } from "./../context/CreateTripContext.js";

export default function RootLayout() {
  useFonts({
    roboto: require("./../assets/fonts/Roboto-Regular.ttf"),
    "roboto-medium": require("./../assets/fonts/Roboto-Medium.ttf"),
    "roboto-bold": require("./../assets/fonts/Roboto-Bold.ttf"),
  });
  const [tripData, setTripData] = useState([]);
  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CreateTripContext.Provider>
  );
}
