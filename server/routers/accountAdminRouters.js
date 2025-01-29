const express = require("express");
const AdminController = require("../controllers/adminController");

const router = express.Router();

router.post("/login", AdminController.loginAdmin);
router.post("/relogin", AdminController.reloginAdmin);
router.get("/ticket", AdminController.showSupportTicket);

module.exports = router;