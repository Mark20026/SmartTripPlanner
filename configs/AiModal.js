const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las vegas, for 3 days and 2 Night for Family with Luxury budget\nwith a Flight details, Flight Price with Booking url, Hotels options list with HotelName. Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName. Place\nDetails, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 3 days and 2 night with each day plan with best time to visit in JSON format. Get the Image urls from wikimedia",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "trip": {\n    "destination": "Las Vegas, Nevada",\n    "duration": "3 days and 2 nights",\n    "budget": "Luxury",\n    "travelers": "Family",\n    "flight": {\n      "details": "Round trip from [your departure city] to McCarran International Airport (LAS)",\n      "price": "Please replace with your desired price range",\n      "booking_url": "https://www.skyscanner.com/transport/flights/"\n    },\n    "hotel": [\n      {\n        "name": "The Venetian Resort Las Vegas",\n        "address": "3355 Las Vegas Blvd S, Las Vegas, NV 89109, USA",\n        "price": "Starting from $250 per night",\n        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/The_Venetian_Resort_Hotel_Casino_Las_Vegas.jpg/1280px-The_Venetian_Resort_Hotel_Casino_Las_Vegas.jpg",\n        "geo_coordinates": "36.1004, -115.1742",\n        "rating": "5 stars",\n        "description": "A luxurious resort with a Venetian theme, offering world-class dining, shopping, and entertainment.",\n        "places_nearby": [\n          {\n            "name": "The Grand Canal Shoppes",\n            "details": "A luxurious indoor shopping mall with a Venetian theme.",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Grand_Canal_Shoppes_at_The_Venetian_Las_Vegas.jpg/1280px-Grand_Canal_Shoppes_at_The_Venetian_Las_Vegas.jpg",\n            "geo_coordinates": "36.1001, -115.1749",\n            "ticket_pricing": "Free",\n            "time_to_travel": "5 minutes walk"\n          }\n        ]\n      },\n      {\n        "name": "The Bellagio",\n        "address": "3600 Las Vegas Blvd S, Las Vegas, NV 89109, USA",\n        "price": "Starting from $300 per night",\n        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Bellagio_Hotel_and_Casino_Las_Vegas.jpg/1280px-Bellagio_Hotel_and_Casino_Las_Vegas.jpg",\n        "geo_coordinates": "36.1015, -115.1741",\n        "rating": "5 stars",\n        "description": "A luxurious resort with a stunning fountain show and world-class entertainment.",\n        "places_nearby": [\n          {\n            "name": "The Conservatory & Botanical Garden",\n            "details": "A beautiful botanical garden with themed displays.",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bellagio_Conservatory_and_Botanical_Garden_Las_Vegas_01.jpg/1280px-Bellagio_Conservatory_and_Botanical_Garden_Las_Vegas_01.jpg",\n            "geo_coordinates": "36.1013, -115.1743",\n            "ticket_pricing": "Free",\n            "time_to_travel": "2 minutes walk"\n          }\n        ]\n      },\n      {\n        "name": "The Wynn Las Vegas",\n        "address": "3131 Las Vegas Blvd S, Las Vegas, NV 89109, USA",\n        "price": "Starting from $400 per night",\n        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Wynn_Las_Vegas_2011.jpg/1280px-Wynn_Las_Vegas_2011.jpg",\n        "geo_coordinates": "36.1097, -115.1729",\n        "rating": "5 stars",\n        "description": "A luxurious resort with a focus on elegance and sophistication.",\n        "places_nearby": [\n          {\n            "name": "Encore at Wynn Las Vegas",\n            "details": "A luxurious sister resort to Wynn Las Vegas with its own unique style.",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Encore_at_Wynn_Las_Vegas_2011.jpg/1280px-Encore_at_Wynn_Las_Vegas_2011.jpg",\n            "geo_coordinates": "36.1102, -115.1727",\n            "ticket_pricing": "Free",\n            "time_to_travel": "5 minutes walk"\n          }\n        ]\n      }\n    ],\n    "itinerary": [\n      {\n        "day": "Day 1",\n        "activities": [\n          {\n            "time": "Morning",\n            "activity": "Arrive at McCarran International Airport (LAS)",\n            "details": "Transfer to your hotel and check in."\n          },\n          {\n            "time": "Afternoon",\n            "activity": "Pool time and relaxation",\n            "details": "Enjoy the luxurious pool facilities at your hotel."\n          },\n          {\n            "time": "Evening",\n            "activity": "Dinner at a fine dining restaurant",\n            "details": "Experience a world-class dining experience at one of Las Vegas\'s renowned restaurants."\n          },\n          {\n            "time": "Late Night",\n            "activity": "Attend a show",\n            "details": "See a spectacular show on the Las Vegas Strip."\n          }\n        ]\n      },\n      {\n        "day": "Day 2",\n        "activities": [\n          {\n            "time": "Morning",\n            "activity": "Visit the High Roller Observation Wheel",\n            "details": "Enjoy panoramic views of the city from the world\'s tallest observation wheel.",\n            "place_details": "3545 Las Vegas Blvd S, Las Vegas, NV 89109, USA",\n            "geo_coordinates": "36.1046, -115.1730",\n            "ticket_pricing": "From $30",\n            "time_to_travel": "15 minutes drive",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/High_Roller_at_night_Las_Vegas.jpg/1280px-High_Roller_at_night_Las_Vegas.jpg"\n          },\n          {\n            "time": "Afternoon",\n            "activity": "Explore the LINQ Promenade",\n            "details": "Enjoy shopping, dining, and entertainment at this outdoor promenade.",\n            "place_details": "3545 Las Vegas Blvd S, Las Vegas, NV 89109, USA",\n            "geo_coordinates": "36.1046, -115.1730",\n            "ticket_pricing": "Free",\n            "time_to_travel": "15 minutes drive",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/The_LINQ_Promenade_at_night.jpg/1280px-The_LINQ_Promenade_at_night.jpg"\n          },\n          {\n            "time": "Evening",\n            "activity": "Dinner at a casual restaurant",\n            "details": "Enjoy a delicious meal at one of Las Vegas\'s many casual dining options."\n          },\n          {\n            "time": "Late Night",\n            "activity": "Explore the nightlife",\n            "details": "Experience the vibrant nightlife scene of Las Vegas."\n          }\n        ]\n      },\n      {\n        "day": "Day 3",\n        "activities": [\n          {\n            "time": "Morning",\n            "activity": "Visit the Bellagio Conservatory & Botanical Garden",\n            "details": "Admire the stunning floral displays.",\n            "place_details": "3600 Las Vegas Blvd S, Las Vegas, NV 89109, USA",\n            "geo_coordinates": "36.1013, -115.1743",\n            "ticket_pricing": "Free",\n            "time_to_travel": "5 minutes drive",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bellagio_Conservatory_and_Botanical_Garden_-_Winter_2019.jpg/1280px-Bellagio_Conservatory_and_Botanical_Garden_-_Winter_2019.jpg"\n          },\n          {\n            "time": "Afternoon",\n            "activity": "Shop at the Forum Shops at Caesars",\n            "details": "Indulge in luxury shopping at this upscale mall.",\n            "place_details": "3500 Las Vegas Blvd S, Las Vegas, NV 89109, USA",\n            "geo_coordinates": "36.1021, -115.1744",\n            "ticket_pricing": "Free",\n            "time_to_travel": "10 minutes drive",\n            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Forum_Shops_at_Caesars_interior.jpg/1280px-Forum_Shops_at_Caesars_interior.jpg"\n          },\n          {\n            "time": "Evening",\n            "activity": "Dinner at a fine dining restaurant",\n            "details": "Enjoy a delicious meal at one of Las Vegas\'s renowned restaurants."\n          },\n          {\n            "time": "Late Night",\n            "activity": "Depart from McCarran International Airport (LAS)",\n            "details": "Head to the airport for your flight back home."\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\n**Important Notes:**\n\n* I\'ve included image URLs from Wikimedia Commons for each hotel and attraction. I searched for the most relevant and visually appealing images for each location.\n* Flight prices are subject to change and availability, and hotel prices are estimates.  Remember to check current pricing and availability on travel websites.\n* Remember to replace `[your departure city]` with your actual departure city.\n* This is a sample itinerary. Feel free to adjust it based on your family\'s interests and budget.\n\nI hope this enhanced travel plan helps you plan an amazing trip to Las Vegas! \n',
        },
      ],
    },
  ],
});

