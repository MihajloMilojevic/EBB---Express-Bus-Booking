const express = require("express");
const {createBus, getAllBuses, getSingleBus, deleteBus} = require("../controllers/busController");

const router = express.Router();

router.route("/").get(getAllBuses).post(createBus);
router.route("/:id").get(getSingleBus).delete(deleteBus);


module.exports = router;