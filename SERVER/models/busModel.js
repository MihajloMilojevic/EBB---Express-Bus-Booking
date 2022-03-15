const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
	polaziste: {
		type: String,
		required: [true, "Polazište je obavezno"]
	},
	destinacija: {
		type: String,
		required: [true, "Destinacija je obavezna"]
	},
	polazak: {
		type: Date,
		required: [true, "Datum je obavezan"]
	},
	cena: {
		type: Number,
		required: [true, "Cena karte je obavezna"]
	},
	sedista: {
		type: [[Boolean]],
		required: [true, "Sedišta su obavezna"]
	}
})

busSchema.pre("remove",{ document: true, query: true }, async function(next) {
	const Reservation = require("./reservationModel");
	await Reservation.deleteMany({busId: this._id});
	next();
})

module.exports = mongoose.model("Bus", busSchema);