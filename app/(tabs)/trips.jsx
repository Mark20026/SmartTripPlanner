import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "./../../constants/Colors.ts";
import { useRouter } from "expo-router";
import UserTripList from "./../../components/MyTrips/UserTripList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Trips() {
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("Welcome");
  const [userTrips, setUserTrips] = useState([]);
  const router = useRouter();

  // Napszak alapú üdvözlés
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning ☀️");
    } else if (currentHour < 18) {
      setGreeting("Good afternoon ☀️");
    } else {
      setGreeting("Good evening 🌑");
    }
  }, []);

  // Trip adatok lekérése
  useEffect(() => {
    const fetchUserTrips = async () => {
      try {
        // Email lekérése az AsyncStorage-ból
        const userEmail = await AsyncStorage.getItem("email");

        if (!userEmail) {
          console.error("No email found in AsyncStorage");
          return;
        }

        // Trip adatok lekérése a backend API-ról
        const response = await fetch(
          `http://192.168.0.112:3000/api/getInfo?email=${userEmail}`
        );
        const data = await response.json();

        if (response.ok) {
          setUserTrips(data);
          console.log(userTrips); // Állapotba mentjük a trip adatokat
        } else {
          console.error("Failed to fetch trips:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user trips:", error);
      }
    };

    fetchUserTrips();
  }, []);

  return (
    <ScrollView style={styles.screen}>
      <View>
        <Text style={styles.heading}>{greeting}</Text>
        <Text style={styles.headingName}>{userName ? userName : "Name"}</Text>
      </View>
      <View style={styles.noTrip}>
        {userTrips.length === 0 ? (
          <>
            <Text style={styles.subText}>
              Your trips will be displayed here.
            </Text>

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
          </>
        ) : (
          <UserTripList userTrips={userTrips} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: width * 0.02,
    paddingTop: height * 0.08,
    backgroundColor: "white",
    height: "100%",
  },
  heading: {
    fontFamily: "montserrat-bold",
    fontSize: height * 0.04,
    color: "black",
  },
  headingName: {
    fontFamily: "montserrat-bold",
    fontSize: height * 0.035,
    color: "black",
  },
  subText: {
    fontFamily: "montserrat",
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
    fontFamily: "montserrat-medium",
    fontSize: height * 0.03,
    color: "black",
    marginTop: "5%",
  },
  subTextNoTrip2: {
    fontFamily: "montserrat",
    fontSize: height * 0.02,
    color: "grey",
    marginTop: "5%",
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "montserrat-bold",
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
