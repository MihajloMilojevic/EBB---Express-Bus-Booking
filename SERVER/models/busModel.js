const mongoose = require("mongoose");

const seatShema = new mongoose.Schema({
	zauzeto: {
		type: Boolean,
		default: false
	},
	email: {
		type: String,
	},
	ime: {
		type: String,
	},
	prezime: {
		type: String,
	}
}, { _id : false })

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
		type: [[seatShema]],
		required: [true, "Sedišta su obavezna"]
	}
})

module.exports = mongoose.model("Bus", busSchema);