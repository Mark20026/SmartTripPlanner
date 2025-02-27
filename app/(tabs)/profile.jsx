import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "./../../constants/Colors.ts";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Profile() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const fetchUserName = async () => {
    try {
      const storedName = await AsyncStorage.getItem("firstName");
      if (storedName) {
        setUserName(storedName);
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("auth-token");
      const response = await fetch("http://192.168.0.112:3000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (response.ok) {
        await AsyncStorage.removeItem("auth-token");
        router.push("/auth/login");
      } else {
        const data = await response.json();
        console.error("Failed to log out:", data.error);
      }
    } catch (error) {
      console.error("Logout error:", error); // Ez akkor fut le, ha nem sikerül kapcsolódni a backendhez
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <View style={styles.screen}>
      <View>
        <Text style={styles.heading}>Profile</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={styles.imageContainer}>
          <Image
            source={require("./../../assets/images/profile.png")}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.porifleName}>
          <FontAwesome name="user" size={30} color={Colors.PRIMARY} />{" "}
          {userName}
        </Text>

        {/* Kijelentkezés gomb */}
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.settingText}>Logout</Text>
        </TouchableOpacity>

        {/* Jelszó megváltoztatása gomb */}
        <Text style={styles.settingText}>Change password</Text>
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
  profileImage: {
    width: width * 0.35,
    height: height * 0.17,
    borderRadius: height,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.SECONDARY,
    width: width * 0.37,
    height: height * 0.18,
    borderRadius: height,
  },
  heading: {
    fontFamily: "montserrat-bold",
    fontSize: height * 0.04,
    color: "black",
    marginBottom: "10%",
  },
  porifleName: {
    fontFamily: "montserrat-medium",
    fontSize: height * 0.04,
    color: "black",
    marginTop: "5%",
    marginBottom: "15%",
  },
  settingText: {
    fontFamily: "montserrat",
    fontSize: height * 0.03,
    color: "black",
    marginTop: "5%",
  },
});
