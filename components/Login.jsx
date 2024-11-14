import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

export default function Logins() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <Image
        source={require("./../assets/images/landing_page_pic.png")}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Smart Trip Planner</Text>

        <Text style={styles.subtitle}>
          Easily create personalized travel itineraries, discover top
          destinations, and explore hidden gems. Start planning your perfect
          trip today!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("auth/login")}
        >
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
  image: {
    width: "100%",
    height: height * 0.55,
  },
  container: {
    marginTop: -25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: "4%",
  },
  title: {
    fontSize: width * 0.08,
    fontFamily: "montserrat-bold",
    color: "white",
    textAlign: "center",
    paddingTop: 50,
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  subtitle: {
    fontSize: width * 0.045,
    fontFamily: "montserrat",
    color: "#dbdee1",
    textAlign: "center",
    paddingTop: 30,
  },
  button: {
    paddingVertical: height * 0.02,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: "20%",
    marginHorizontal: "5%",
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "montserrat-bold",
    textAlign: "center",
  },
});
