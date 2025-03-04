const User = require("../models/Users");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");

const tripRouter = express.Router();

const TripSchema = new mongoose.Schema({
  email: { type: String, required: true },
  tripData: { type: Object, required: true },
  response: { type: Object, required: true },
  status: { type: String, enum: ["active", "archived"], default: "active" },
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

      res.status(200).json({ message: "Trip data saved successfully!" });
    } catch (error) {
      console.error("Hiba a trip adatok mentésekor:", error);
      res.status(500).json({ error: "A trip adatok mentése nem sikerült" });
    }
  } catch (error) {
    console.error("Error saving trip data:", error);
    res.status(500).json({ error: "Failed to save trip data" });
  }
});

tripRouter.get("/api/getInfo", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    // Fetch data from the database based on the email
    const trips = await Trip.find({ email, status: "active" });

    // If no data is found for the provided email
    if (!trips || trips.length === 0) {
      return res
        .status(404)
        .json({ error: "No trip data found for this email" });
    }

    // Return the found trips if successful
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trip data:", error);
    res.status(500).json({ error: "Failed to fetch trip data" });
  }
});
tripRouter.get("/api/getInfoArchived", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    // Fetch data from the database based on the email
    const trips = await Trip.find({ email, status: "archived" });

    // If no data is found for the provided email
    if (!trips || trips.length === 0) {
      return res
        .status(404)
        .json({ error: "No trip data found for this email" });
    }

    // Return the found trips if successful
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

// Scheduling archive
cron.schedule("0 * * * *", async () => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Fetch all active trips
    const tripsToArchive = await Trip.find({ status: "active" });

    if (tripsToArchive.length > 0) {
      console.log("📅 End dates of active trips:");

      tripsToArchive.forEach((trip) => {
        console.log(`EndDate for trip ${trip._id}: ${trip.tripData.endDate}`);
      });

      // Filter trips that are overdue, based on the 'endDate'
      const toArchive = tripsToArchive.filter((trip) => {
        const endDate = new Date(trip.tripData.endDate);
        return endDate < today; // If the endDate is earlier than today
      });

      if (toArchive.length > 0) {
        // Archive trips that are overdue
        await Trip.updateMany(
          { _id: { $in: toArchive.map((trip) => trip._id) } },
          { $set: { status: "archived" } }
        );
        console.log(`✅ Archived ${toArchive.length} trips`);
      } else {
        console.log("⚠️ No trips need to be archived.");
      }
    } else {
      console.log("⚠️ No active trips found.");
    }
  } catch (error) {
    console.error("❌ Error archiving trips:", error);
  }
});

module.exports = tripRouter;
