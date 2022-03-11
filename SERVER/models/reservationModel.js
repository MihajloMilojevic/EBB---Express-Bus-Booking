const mongoose = require("mongoose");
const Bus = require("./busModel")

const seatShema = new mongoose.Schema({
    red: {
        type: Number,
        required: [true, "Red je obavezan"]
    },
    kolona: {
        type: Number,
        required: [true, "Kolona je obavezna"]
    },
    
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

reservationSchema.post("remove", async function(reservation, next) {
    const bus = await Bus.findById(reservation.busId);
    for(let seat in reservation.sedista)
        bus.sedista[seat.red][seat.kolona].zauzeto = false;
    next();
})

module.exports = mongoose.model("Reservation", reservationSchema);