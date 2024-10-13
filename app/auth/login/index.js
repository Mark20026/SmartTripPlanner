import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import axios from "axios"; // Axios importálása

// Get screen dimensions
const { width, height } = Dimensions.get("window");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Helper function to validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const onSignIn = () => {
    // Check if email and password fields are filled
    if (!email || !password) {
      ToastAndroid.show("Please fill out all fields", ToastAndroid.SHORT);
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      ToastAndroid.show("Invalid email format", ToastAndroid.SHORT);
      return;
    }

    // API call to the backend
    axios
      .post("http://192.168.0.112:3000/api/login", {
        email,
        password,
      })
      .then((response) => {
        // Successful login
        const { token, userId } = response.data;
        console.log("Login successful", response.data);
        ToastAndroid.show("Login successful!", ToastAndroid.SHORT);

        // Store the token (if needed)
        // You can use AsyncStorage or any state management library here
        // Example: AsyncStorage.setItem("userToken", token);

        // Navigate to trips
        router.push("/trips");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.msg || "Login failed";
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        console.log("Login error:", error.message);
      });
  };

  return (
    <View style={styles.screen}>
      <Image
        source={require("../../../assets/images/logo-app.png")}
        style={styles.logo}
      />

      <Text style={styles.welcome}>Welcome back!</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email address..."
        placeholderTextColor="#dbdee1"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password..."
        placeholderTextColor="#dbdee1"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity onPress={onSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => router.push("auth/register")}
      >
        <Text style={styles.buttonText2}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: width * 0.6,
    height: height * 0.3,
    resizeMode: "contain",
    marginTop: "10%",
  },
  welcome: {
    fontFamily: "roboto-bold",
    fontSize: height * 0.05,
    color: "white",
    marginTop: "5%",
    marginBottom: "10%",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  input: {
    width: width * 0.8,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: "5%",
    color: Colors.PRIMARY,
    fontFamily: "roboto",
    fontSize: height * 0.02,
  },
  button: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.35,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: "10%",
    marginHorizontal: "5%",
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "roboto-bold",
    textAlign: "center",
  },
  button2: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.265,
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
