const Router = require("express");
const chatRoutes = require("./chatRoutes");
const accountRoutes = require("./accountRoutes");

/* Admin */
const adminRoutes = require("./accountAdminRouters");

const router = new Router();

router.use("/chat", chatRoutes);
router.use("/account", accountRoutes);

/* Admin */
router.use("/admin", adminRoutes);

module.exports = router;




// /api/admin/ticket GET -> [Ticket,Ticket,Ticket]