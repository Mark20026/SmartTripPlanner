import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors.ts";

const { width, height } = Dimensions.get("window");

export default function TravelerCount() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>How many people are traveling</Text>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => router.push("/trip/calendar")}
      >
        <Text style={styles.buttonText2}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: width * 0.06,
    paddingTop: height * 0.15,
    backgroundColor: "white",
    height: "100%",
  },
  heading: {
    fontFamily: "roboto-bold",
    fontSize: height * 0.035,
    color: "black",
  },
  button2: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.35,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 10,
    marginTop: "5%",
    marginHorizontal: "5%",
  },
  buttonText2: {
    fontSize: width * 0.04,
    fontFamily: "roboto-bold",
    textAlign: "center",
    color: "white",
  },
});
