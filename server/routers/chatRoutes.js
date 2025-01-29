const express = require("express");
const ChatController = require("../controllers/chatController");

const router = express.Router();

router.post("/ticket", ChatController.createSupportTicket);

/*Сохранение и получение всех сообщениий */
router.post("/message", ChatController.saveMessage);
router.get("/message/:room", ChatController.getMessages);

module.exports = router;