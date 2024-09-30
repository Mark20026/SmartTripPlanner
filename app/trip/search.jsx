import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useContext } from "react";
import { useNavigation, useRouter } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "./../../context/CreateTripContext.js";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");


export default function Search() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <View style={styles.screen}>
      <GooglePlacesAutocomplete
        placeholder="Search for a destination"
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(data.description);
          console.log(details?.geometry.location);
          console.log(details?.photos[0]?.photo_reference);
          console.log(details?.url);
          setTripData({
            locationInfo: {
              name: data.description,
              coordinates: details?.geometry.location,
              photoRef: details?.photos[0]?.photo_reference,
              url: details?.url,
            },
          });

          router.push("/trip/traveler_count");
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: "en",
        }}
        styles={{
          textInputContainer: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 15,
          },
          textInput: {
            height: 50,
            color: "#5d5d5d",
            fontSize: 18,
            borderRadius: 10,
            borderColor: "black",
            borderWidth: 2,
            paddingHorizontal: 15,
          },
          listView: {
            backgroundColor: "white",
            borderRadius: 10,
            elevation: 2,
          },
          description: {
            fontSize: 16,
          },
          row: {
            padding: 15,
            height: 60,
          },
        }}
      />
      <TouchableOpacity
        style={styles.button2}
        onPress={() => router.push("/trip/traveler_count")}
      >
        <Text style={styles.buttonText2}>Continue</Text>
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
  button2: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.35,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 10,
    marginTop: "5%",
    marginHorizontal: "5%",
  },
  buttonText2: {
    fontSize: width * 0.03,
    fontFamily: "roboto-bold",
    textAlign: "center",
    color: "white",
  },
});
