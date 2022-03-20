const sgMail = require('@sendgrid/mail')
const validator = require("validator");
const Bus = require("../models/busModel");
const Reservation = require("../models/reservationModel");
const Errors = require("../errors");
const StatusCodes = require("http-status-codes");

const FRONTEND_URL = "https://express-bus-booking.netlify.app";

const makeReservation = async (req, res) => {
	
	const busId = req.body.busId;
	const bus = await Bus.findById(busId);
	if(!bus)
		throw new Errors.NotFoundError("Ne postoji bus sa id-jem " + busId);
	const {karte, ime, prezime, email} = req.body;
	if(!karte || !Array.isArray(karte) || karte.length === 0)
		throw new Errors.BadRequestError("Karte su obavezne");
	if(!ime)
		throw new Errors.BadRequestError("Ime je obavezno");
	if(!prezime)
		throw new Errors.BadRequestError("Prezime je obavezno");
	if(!email)
		throw new Errors.BadRequestError("Email je obavezno");
	if(!validator.isEmail(email))
		throw new Errors.BadRequestError("Neispravan email");
	if(!karte.every(karta => !bus.sedista[karta.red][karta.kolona]))
		throw new Errors.BadRequestError("Sedište je već zauzeto");
	const reservationBody = {
		ime, 
		prezime, 
		email,
		busId,
		sedista: karte
	}
	const reservation = await Reservation.create(reservationBody);
	const setObject = {};
	for(let karta of karte)
		setObject[`sedista.${karta.red}.${karta.kolona}`] = true;
	await Bus.updateOne({_id: busId}, {$set: setObject});
	sgMail.setApiKey(process.env.SENDGRID_API_KEY)
	const msg = {
		to: email, // Change to your recipient
		from: "milojevicm374@gmail.com", // Change to your verified sender
		subject: "Express Bus Booking - Uspešna rezervacija",
		html: `
		<h1>Express Bus Booking</h1>
		<h5>Uspešna rezervacija</h5>
		<p>Id vaše rezervacije: ${reservation._id}</p>
		<a href="${FRONTEND_URL}/reservation.html?id=${reservation._id}" target="_blank">Pregledaj rezervaciju</a>
		`,
		text: "Uspešno ste rezervisali karte"
	}
	await sgMail.send(msg);
	res.status(StatusCodes.OK).json({ok: true, reservation});
}

const getSingleReservation = async (req, res) => {
	const reservationId = req.params.id;
	const reservation = await Reservation.findById(reservationId).populate("busId");
	if(!reservation)
		throw new Errors.NotFoundError("Ne postoji rezervacija sa id-jem " + reservationId);
	res.status(StatusCodes.OK).json({ok: true, reservation})
}

const cancelReservation = async (req, res) => {
	const reservationId = req.params.id;
	const reservation = await Reservation.findById(reservationId);
	if(!reservation)
		throw new Errors.NotFoundError("Ne postoji rezervacija sa id-jem " + reservationId);
	reservation.remove();
	res.status(StatusCodes.OK).json({ok: true})
}

module.exports = {
	makeReservation,
	getSingleReservation,
	cancelReservation
}