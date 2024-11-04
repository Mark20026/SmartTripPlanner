import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "./../../constants/Colors.ts";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Trips() {
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("Welcome");

  const router = useRouter();

  useEffect(() => {
    // Napszak alapú üdvözlés
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning ☀️");
    } else if (currentHour < 18) {
      setGreeting("Good afternoon ☀️");
    } else {
      setGreeting("Good evening 🌑");
    }
  }, []);

  return (
    <View style={styles.screen}>
      <View>
        <Text style={styles.heading}>{greeting}</Text>
        <Text style={styles.headingName}>{userName ? userName : "Name"}</Text>
        <Text style={styles.subText}>Your trips will be displayed here.</Text>
      </View>
      <View style={styles.noTrip}>
        <Text style={styles.subTextNoTrip}>No trips yet!</Text>
        <Text style={styles.subTextNoTrip2}>
          Let AI help you design your perfect trip. Get started now!
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/trip/search")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create My Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: width * 0.06,
    paddingTop: height * 0.08,
    backgroundColor: "white",
    height: "100%",
  },
  heading: {
    fontFamily: "roboto-bold",
    fontSize: height * 0.04,
    color: "black",
  },
  headingName: {
    fontFamily: "roboto-bold",
    fontSize: height * 0.035,
    color: "black",
  },
  subText: {
    fontFamily: "roboto",
    fontSize: height * 0.02,
    color: "grey",
    marginTop: "5%",
  },
  noTrip: {
    alignItems: "center",
    marginTop: "45%",
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1,
  },
  subTextNoTrip: {
    fontFamily: "roboto-medium",
    fontSize: height * 0.03,
    color: "black",
    marginTop: "5%",
  },
  subTextNoTrip2: {
    fontFamily: "roboto",
    fontSize: height * 0.02,
    color: "grey",
    marginTop: "5%",
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "roboto-bold",
    textAlign: "center",
    color: "white",
  },
  button: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: "10%",
    marginHorizontal: "5%",
  },
});
