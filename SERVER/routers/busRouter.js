const express = require("express");
const {createBus, getAllBuses, getSingleBus, bookTickets} = require("../controllers/busController");

const router = express.Router();

router.route("/").get(getAllBuses).post(createBus);
router.route("/:id/book").patch(bookTickets);
router.route("/:id").get(getSingleBus);


module.exports = router;