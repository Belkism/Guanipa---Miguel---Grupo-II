const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketControllers.js");


router.post("/checkout", ticketController.checkoutTicket);
router.get("/pdf", ticketController.descargarticket);
router.get("/data", ticketController.getticketData);
router.get("/", ticketController.getticket);



module.exports = router;

