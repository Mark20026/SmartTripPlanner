import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useState } from "react";
import { CreateTripContext } from "./../context/CreateTripContext.js";

export default function RootLayout() {
  useFonts({
    montserrat: require("./../assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./../assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-bold": require("./../assets/fonts/Montserrat-Bold.ttf"),
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
