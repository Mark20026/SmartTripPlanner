export const SelectTravelerList = [
  {
    id: 1,
    title: "Just Me",
    desc: "For solo explorers.",
    icon: "🧍",
    people: "1 Person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Perfect for romantic getaways.",
    icon: "🛫",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "Great for family bonding.",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Group",
    desc: "For fun with friends.",
    icon: "🎉",
    people: "4 to 10 People",
  },
];

export const SelectBudgetList = [
  {
    id: 1,
    title: "Cheap",
    desc: "Budget-friendly options for saving money.",
    icon: "👛",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "A balance between cost and comfort.",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium choices for a lavish experience.",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {totalDays} days and {totalNight} Night for {traveler} with {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName. Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName. Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format";
