const jwt = require("jsonwebtoken");
const RevokedToken = require("../models/RevokedToken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No auth token, access denied" });

    // Ellenőrizzük, hogy a token szerepel-e a feketelistán
    const revoked = await RevokedToken.findOne({ token });
    if (revoked) {
      return res.status(401).json({ msg: "Token is revoked, access denied" });
    }

    // Ellenőrizzük a token érvényességét
    const verified = jwt.verify(token, "passwordKey");
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });

    req.user = verified.id;
    req.token = token;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = auth;
