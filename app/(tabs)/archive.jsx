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
import { useRouter, useFocusEffect } from "expo-router";
import UserArchiveList from "./../../components/MyArchives/UserArchiveList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Archive() {
  const [userTrips, setUserTrips] = useState([]);
  const router = useRouter();

  const fetchUserTrips = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("email");

      if (!userEmail) {
        console.error("No email found in AsyncStorage");
        return;
      }

      const response = await fetch(
        `http://192.168.0.112:3000/api/getInfoArchived?email=${userEmail}`
      );
      const data = await response.json();

      if (response.ok) {
        setUserTrips(data);
      } else {
        console.error("Failed to fetch trips:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user trips:", error);
    }
  };

  // Frissítés, amikor a kezdőlap fókuszba kerül
  useFocusEffect(
    React.useCallback(() => {
      fetchUserTrips();
    }, [])
  );

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Your Archives</Text>
      </View>
      <View style={styles.noTrip}>
        {userTrips.length === 0 ? (
          <>
            <Text style={styles.subText}>
              Your archive will be displayed here.
            </Text>
            <Text style={styles.subTextNoTrip}>No archives yet!</Text>
            <Text style={styles.subTextNoTrip2}>
              Your archived trips will appear here once they become outdated.{" "}
            </Text>
          </>
        ) : (
          <UserArchiveList userTrips={userTrips} />
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.01,
  },
  heading: {
    fontFamily: "montserrat-bold",
    fontSize: height * 0.037,
    color: "black",
  },
  noTrip: {
    alignItems: "center",
    marginTop: "45%",
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1,
  },
  subText: {
    fontFamily: "montserrat",
    fontSize: height * 0.02,
    color: "grey",
    marginTop: "5%",
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
});
