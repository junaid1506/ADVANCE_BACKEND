const jwt = require("jsonwebtoken");
const Session = require("../model/Session");
async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.token?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    const sessionId = decoded.sessionId;
    const session = await Session.findById(sessionId);
    if (!sessionId || !session || session.revoked) {
      return res.status(401).json({
        success: false,
        message: "Session expired or invalid",
      });
    }
    req.user = decoded;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: err.message,
    });
  }
}

module.exports = authMiddleware;
