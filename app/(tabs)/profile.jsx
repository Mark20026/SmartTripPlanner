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

const { width, height } = Dimensions.get("window");

export default function Profile() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserName(currentUser.displayName);
    }
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        router.push("/auth/login"); 
      })
      .catch((error) => {
        console.error("Sign out error: ", error);
      });
  };

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
