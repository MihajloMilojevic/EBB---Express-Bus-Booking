const express = require("express");
const {makeReservation, cancelReservation, getSingleReservation} = require("../controllers/reservationController");

const router = express.Router();

router.route("/").post(makeReservation);
router.route("/:id").get(getSingleReservation).delete(cancelReservation);

module.exports = router;