const express = require("express");
const router = express.Router();

const {
  userRegister,
  userLogin,
  userProfile,
  userLogout,
  refreshToken,
} = require("../controller/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const limiter = require("../middleware/rateLimiter");

router.post("/user/register", userRegister);
router.post("/user/login", limiter, userLogin);
router.post("/user/logout", authMiddleware, userLogout);
router.post("/user/logout-all", authMiddleware, userLogout);

router.get("/user/profile", authMiddleware, userProfile);

router.post("/refresh-token", refreshToken);

module.exports = router;
