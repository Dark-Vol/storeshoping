const express = require("express");
const ChatController = require("../controllers/chatController");

const router = express.Router();

router.post("/register", ChatController.createUser);
router.post("/login", ChatController.loginUser);
router.post("/relogin", ChatController.reloginUser);

module.exports = router;