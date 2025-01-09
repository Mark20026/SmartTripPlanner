const mongoose = require("mongoose");

const RevokedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const RevokedToken = mongoose.model("RevokedToken", RevokedTokenSchema);

module.exports = RevokedToken;
