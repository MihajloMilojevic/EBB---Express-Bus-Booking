const express = require("express");
const {createBus, getAllBuses, getSingleBus} = require("../controllers/busController");

const router = express.Router();

router.route("/").get(getAllBuses).post(createBus);
router.route("/:id").get(getSingleBus);


module.exports = router;