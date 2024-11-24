import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import HotelList from "../../components/TripDetails/HotelList";
import PlanList from "../../components/TripDetails/PlanList";

const { width, height } = Dimensions.get("window");

export default function TripDetails() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
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
          console.log(userTrips);
          console.log(userTrips[0]?.response?.trip?.hotel);
          // Állapotba mentjük a trip adatokat
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
    <ScrollView>
      <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            userTrips[0]?.tripData?.locationInfo?.photoRef +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={{
          width: "100%",
          height: height * 0.35,
          objectFir: "cover",
        }}
      />
      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: -30,
          height: "100%",
          padding: width * 0.03,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontFamily: "montserrat-bold",
            fontSize: height * 0.024,
          }}
        >
          {userTrips[0]?.response?.trip?.destination}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "montserrat-medium",
              fontSize: height * 0.02,
              color: "gray",
            }}
          >
            {moment(userTrips[0]?.tripData?.startDate).format("DD MMM yyyy")}
          </Text>
          <Text
            style={{
              fontFamily: "montserrat-medium",
              fontSize: height * 0.02,
              color: "gray",
            }}
          >
            - {moment(userTrips[0]?.tripData?.endDate).format("DD MMM yyyy")}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "montserrat-medium",
            fontSize: height * 0.02,
            color: "gray",
          }}
        >
          {userTrips[0]?.tripData?.travelerCount?.icon}
          {userTrips[0]?.tripData?.travelerCount?.title}
        </Text>

        <HotelList hotelList={userTrips[0]?.response?.trip?.hotels} />

        <PlanList planList={userTrips[0]?.response?.trip?.itinerary} />
      </View>
    </ScrollView>
  );
}
