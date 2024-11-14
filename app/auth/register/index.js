import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const router = useRouter();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const OnCreateAccount = () => {
    if (!fullName || !email || !password || !passwordRepeat) {
      ToastAndroid.show("Please fill out all fields", ToastAndroid.SHORT);
      return;
    }

    if (!validateEmail(email)) {
      ToastAndroid.show("Invalid email format", ToastAndroid.SHORT);
      return;
    }

    if (password !== passwordRepeat) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
      return;
    }

    if (password.length < 6) {
      ToastAndroid.show(
        "Password must be at least 6 characters",
        ToastAndroid.SHORT
      );
      return;
    }

    // API hívás a saját backendhez
    axios
      .post("http://192.168.0.112:3000/api/signup", {
        email,
        password,
        firstName: fullName.split(" ")[0], // Az első név kiválasztása
        lastName: fullName.split(" ").slice(1).join(" "), // A többi név összeillesztése
      })
      .then((response) => {
        // Sikeres regisztráció
        ToastAndroid.show("Account created successfully!", ToastAndroid.SHORT);
        router.push("/trips"); // Navigálás az "Trips" oldalra
      })
      .catch((error) => {
        console.log("Error:", error); // Írd ki az Axios hibát a konzolba
        console.log("Error response:", error.response); // Ha van válasz, írd ki
        console.log("Error message:", error.message);
        const errorMessage = error.response?.data?.msg || "Registration failed";
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.welcome}>Create New Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#dbdee1"
        value={fullName}
        onChangeText={(value) => setFullName(value)}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#dbdee1"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#dbdee1"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        placeholderTextColor="#dbdee1"
        value={passwordRepeat}
        onChangeText={setPasswordRepeat}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity onPress={OnCreateAccount} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => router.push("auth/login")}
      >
        <Text style={styles.buttonText2}>Log In</Text>
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
  welcome: {
    padding: width * 0.06,
    fontFamily: "montserrat-bold",
    fontSize: height * 0.04,
    color: "white",
    marginTop: "30%",
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
    fontFamily: "montserrat",
    fontSize: height * 0.02,
  },
  button: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.33,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: "10%",
    marginHorizontal: "5%",
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "montserrat-bold",
    textAlign: "center",
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
    fontFamily: "montserrat-bold",
    textAlign: "center",
    color: "white",
  },
});
