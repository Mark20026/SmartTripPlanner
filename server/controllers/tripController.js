const User = require("../models/Users");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const express = require("express");
const mongoose = require("mongoose");

const tripRouter = express.Router();

const TripSchema = new mongoose.Schema({
  email: { type: String, required: true },
  response: { type: Object, required: true },
});

const Trip = mongoose.model("Trip", TripSchema);

tripRouter.post("/api/getTripJson", async (req, res) => {
  try {
    const { response, email } = req.body;

    const parsedResponse =
      typeof response === "string" ? JSON.parse(response) : response;

    try {
      const newTrip = new Trip({ email, response: parsedResponse });
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

module.exports = tripRouter;
