const express = require("express");
const {makeReservation, cancelReservation} = require("../controllers/reservationController");

const router = express.Router();

router.route("/").post(makeReservation);
router.route("/:id").delete(cancelReservation);

module.exports = router;