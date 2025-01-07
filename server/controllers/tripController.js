const User = require("../models/Users");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const express = require("express");
const mongoose = require("mongoose");

const tripRouter = express.Router();

const TripSchema = new mongoose.Schema({
  email: { type: String, required: true },
  tripData: { type: Object, required: true },
  response: { type: Object, required: true },
});

const Trip = mongoose.model("Trip", TripSchema);

tripRouter.post("/api/getTripJson", async (req, res) => {
  try {
    const { response, email, tripData } = req.body;

    const parsedResponse =
      typeof response === "string" ? JSON.parse(response) : response;

    try {
      const newTrip = new Trip({ email, tripData, response: parsedResponse });
      await newTrip.save();

      // Csak akkor küldd el a választ, ha a mentés sikerült
      res.status(200).json({ message: "Trip data saved successfully!" });
    } catch (error) {
      console.error("Hiba a trip adatok mentésekor:", error);
      // Ha a mentés nem sikerült, küldj el egy hibaüzenetet
      res.status(500).json({ error: "A trip adatok mentése nem sikerült" });
    }
  } catch (error) {
    console.error("Error saving trip data:", error);
    res.status(500).json({ error: "Failed to save trip data" });
  }
});

tripRouter.get("/api/getInfo", async (req, res) => {
  try {
    const { email } = req.query; // Az email lekérdezési paraméterként érkezik

    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    // Lekérjük az adatokat az adatbázisból az email alapján
    const trips = await Trip.find({ email });

    // Ha nem található adat az adott emailhez
    if (!trips || trips.length === 0) {
      return res
        .status(404)
        .json({ error: "No trip data found for this email" });
    }

    // Sikeres lekérés esetén visszaadjuk a találatokat
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trip data:", error);
    res.status(500).json({ error: "Failed to fetch trip data" });
  }
});

tripRouter.delete("/api/deleteTrip", async (req, res) => {
  const { email, tripId } = req.body;

  try {
    const result = await Trip.deleteOne({ email: email, _id: tripId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Trip not found or already deleted" });
    }

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = tripRouter;
