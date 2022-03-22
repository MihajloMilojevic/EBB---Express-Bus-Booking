const mongoose = require("mongoose");

const seatShema = new mongoose.Schema({
    red: {
        type: Number,
        required: [true, "Red je obavezan"]
    },
    kolona: {
        type: Number,
        required: [true, "Kolona je obavezna"]
    },
    broj: {
        type: Number,
        required: [true, "Broj sedista je obavezan"]
    }
    
}, {_id : false})

const reservationSchema = new mongoose.Schema({
	ime: {
        type: String,
        required: [true, "Ime je obavezno"]
    },
    prezime: {
        type: String,
        required: [true, "Prezime je obavezno"]
    },
    email: {
        type: String,
        required: [true, "Email je obavezan"]
    },
    busId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Id busa je obavezan"],
        ref: "Bus"
    },
    sedista: {
        type: [seatShema],
        required: ["true", "Sedista su obavezna"]
    }
}, {timestamps: true})

reservationSchema.pre("remove",{ document: true, query: true }, async function(next) {
    const Bus = require('../models/busModel');
    const setObject = {};
    for(let karta of this.sedista)
        setObject[`sedista.${karta.red}.${karta.kolona}`] = false;
    await Bus.updateOne({_id: this.busId}, {$set: setObject});
    next();
})

module.exports = mongoose.model("Reservation", reservationSchema);