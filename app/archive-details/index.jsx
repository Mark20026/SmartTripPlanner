import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import HotelList from "../../components/TripDetails/HotelList";
import PlanList from "../../components/TripDetails/PlanList";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const { width, height } = Dimensions.get("window");

export default function ArchiveDetails() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);
  const { tripIndex = 0 } = useLocalSearchParams();
  const tripIndexes = parseInt(tripIndex, 10);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

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

    fetchUserTrips();
  }, []);

  const handleDeleteTrip = async (index) => {
    try {
      const tripId = sortedTrips[index]._id;
      const userEmail = await AsyncStorage.getItem("email");

      const response = await fetch("http://192.168.0.112:3000/api/deleteTrip", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, tripId }),
      });

      if (response.ok) {
        const updatedTrips = sortedTrips.filter((_, i) => i !== index);
        setUserTrips(updatedTrips);

        router.push("/(tabs)/trips");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete trip:", errorData.error);
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  if (!userTrips.length) {
    return <Text>Loading...</Text>; // Betöltési állapot megjelenítése
  }

  const sortedTrips = [...userTrips].sort(
    (a, b) => new Date(a.tripData.startDate) - new Date(b.tripData.startDate)
  );

  const LatestTrip = sortedTrips[tripIndexes]?.tripData;

  return (
    <ScrollView>
      {LatestTrip?.locationInfo?.photoRef ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
              LatestTrip?.locationInfo?.photoRef +
              "&key=" +
              process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          }}
          style={{
            width: "100%",
            height: height * 0.35,
            objectFit: "cover",
          }}
        />
      ) : (
        <Image
          source={require("../../assets/images/placeholder.jpeg")}
          style={{
            width: "100%",
            height: height * 0.35,
            objectFit: "cover",
          }}
        />
      )}

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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "montserrat-bold",
              fontSize: height * 0.024,
            }}
          >
            {sortedTrips[tripIndexes]?.response?.trip?.destination}
          </Text>
          <TouchableOpacity onPress={() => handleDeleteTrip(tripIndexes)}>
            <FontAwesome6 name="trash-can" size={24} color="rgb(240, 22, 29)" />
          </TouchableOpacity>
        </View>

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
            {moment(sortedTrips[tripIndexes]?.tripData?.startDate).format(
              "DD MMM yyyy"
            )}
          </Text>
          <Text
            style={{
              fontFamily: "montserrat-medium",
              fontSize: height * 0.02,
              color: "gray",
            }}
          >
            -{" "}
            {moment(sortedTrips[tripIndexes]?.tripData?.endDate).format(
              "DD MMM yyyy"
            )}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: "montserrat-medium",
            fontSize: height * 0.02,
            color: "gray",
          }}
        >
          {sortedTrips[tripIndexes]?.tripData?.travelerCount?.icon}
          {sortedTrips[tripIndexes]?.tripData?.travelerCount?.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: height * 0.02,
          }}
        >
          <Text
            style={{
              fontFamily: "montserrat-bold",
              fontSize: height * 0.02,
              color: "gray",
            }}
          >
            Estimated price:{" "}
          </Text>
          <Text
            style={{
              fontFamily: "montserrat-medium",
              fontSize: height * 0.02,
              color: "green",
            }}
          >
            {sortedTrips[tripIndexes]?.response?.trip?.estimated_total_cost ??
              sortedTrips[tripIndexes]?.response?.trip?.estimated_cost}
          </Text>
        </View>

        <HotelList
          hotelList={sortedTrips[tripIndexes]?.response?.trip?.hotels}
        />
        <PlanList
          planList={sortedTrips[tripIndexes]?.response?.trip?.itinerary}
        />
      </View>
    </ScrollView>
  );
}
