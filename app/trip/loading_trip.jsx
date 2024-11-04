import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "expo-router";
import { CreateTripContext } from "./../../context/CreateTripContext.js";
import { AI_PROMPT } from "../../constants/options.js";
import { chatSession } from "../../configs/AiModal.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function LoadingTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const [hasGeneratedTrip, setHasGeneratedTrip] = useState(false);
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const emailFetch = await AsyncStorage.getItem("email");
      setEmail(emailFetch);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (tripData && !hasGeneratedTrip && email) {
      // Csak akkor hívod meg, ha az email nem null
      GenerateAiTrip();
      setHasGeneratedTrip(true);
    }
  }, [tripData, hasGeneratedTrip, email]); // Az email is a függőségek között

  const GenerateAiTrip = async () => {
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.locationInfo?.name
    )
      .replace("{totalDays}", tripData?.totalNoDays)
      .replace("{totalNight}", tripData?.totalNoDays - 1)
      .replace("{traveler}", tripData?.travelerCount?.title)
      .replace("{budget}", tripData?.budget?.title);

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripDataJson = result.response.text();

      console.log(tripDataJson);
      console.log(email); // Ez most már nem lesz null

      await sendTripDataToBackend(tripDataJson);
    } catch (error) {
      console.error("Error generating trip:", error);
    } finally {
      setLoading(false);
    }

    router.push("/(tabs)/trips");
  };

  const sendTripDataToBackend = async (tripDataJson) => {
    try {
      const response = await fetch(
        "http://192.168.0.112:3000/api/getTripJson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response: tripDataJson, email }), 
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send trip data to backend");
      }

      const data = await response.json();
      console.log("Trip data saved successfully:", data);
    } catch (error) {
      console.error("Error sending trip data to backend:", error);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>PLEASE WAIT...</Text>
      <Text style={styles.subheading}>
        We're generating the perfect trip for you, it won't take long!
      </Text>
      <Image
        source={require("./../../assets/images/plane.gif")}
        style={styles.logo}
      />
      <Text style={styles.subheading2}>Do not go back!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: width * 0.06,
    paddingTop: height * 0.13,
    backgroundColor: "#8cd2e2",
    height: "100%",
  },
  heading: {
    fontFamily: "montserrat-bold",
    fontSize: height * 0.04,
    color: "white",
    marginBottom: height * 0.03,
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  subheading: {
    fontFamily: "montserrat-medium",
    fontSize: height * 0.025,
    color: "white",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  subheading2: {
    fontFamily: "montserrat-medium",
    fontSize: height * 0.02,
    color: "white",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  logo: {
    width: width * 0.85,
    height: height * 0.3,
    resizeMode: "contain",
    marginTop: "10%",
    marginBottom: height * 0.03,
  },
});
