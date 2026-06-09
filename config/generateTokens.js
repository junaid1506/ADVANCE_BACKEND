const jwt = require("jsonwebtoken");

function generateAccessToken(user , sessionId) {
  return jwt.sign(
    {
      id: user._id,
      sessionId: sessionId
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5m",
    },
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

module.exports = { generateAccessToken, generateRefreshToken };
