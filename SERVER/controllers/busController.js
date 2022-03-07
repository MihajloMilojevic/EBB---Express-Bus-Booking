const Errors = require("../errors");
const StatusCodes = require("http-status-codes");
const Bus = require('../models/busModel');

const createBus = async (req, res) => {
	if(!req.body.sedista && !req.body.brojRedova && !req.body.brojKolona)
		throw new Errors.BadRequestError("Priložite ili sedišta ili veličinu autobusa (broj redova i kolona)");
	const {polaziste, destinacija, polazak: polazakReq, cena} = req.body;
	const polazak = new Date();
	polazak.setFullYear(polazakReq.godina);
	polazak.setMonth(polazakReq.mesec - 1);
	polazak.setDate(polazakReq.dan);
	polazak.setHours(polazakReq.sat);
	polazak.setMinutes(polazakReq.minut);
	const body = {polaziste, destinacija, polazak, cena};
	if(req.body.sedista)
		body.sedista = req.body.sedista;
	else
	{
		let sedista = [];
		const {brojRedova, brojKolona} = req.body;
		for(let i = 0; i < brojRedova; i++)
		{
			let red = [];
			for(let j = 0; j < brojKolona; j++)
				red.push({zauzeto: false});
			sedista.push(red);
		}
		body.sedista = sedista;
	}

	const bus = await Bus.create(body);
	res.status(StatusCodes.CREATED).json({ok: true, bus});
}

const getAllBuses = async (req, res) => {
	let query = Bus.find();
	// pretraga po datumu, vremenu, destinaciji, ceni
	if(req.query.polaziste)
		query = query.where("polaziste", { $regex: new RegExp(req.query.polaziste.toLowerCase(), "i") })
	if(req.query.destinacija)
		query = query.where("destinacija", { $regex: new RegExp(req.query.destinacija.toLowerCase(), "i") })
	if(req.query.datumod)
	{
		const d = new Date();
		const params = req.query.datumod.split("-");
		d.setDate(params[0]);
		d.setMonth(params[1] - 1);
		d.setFullYear(params[2]);
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0);
		query = query.where("polazak").gte(d);
	}
	if(req.query.datumdo)
	{
		const d = new Date();
		const params = req.query.datumdo.split("-");
		d.setDate(params[0]);
		d.setMonth(params[1] - 1);
		d.setFullYear(params[2]);
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0);
		query = query.where("polazak").lte(d);
	}
	if(req.query.cenaod)
		query = query.where("cena").gte(req.query.cenaod);
	if(req.query.cenado)
		query = query.where("cena").lte(req.query.cenado);
	
	const buses = await query;
	res.status(StatusCodes.OK).json({ok: true, count: buses.length, buses});
}

const getSingleBus = async (req, res) => {
	const busId = req.params.id;
	const bus = await Bus.findById(busId);
	if(!bus)
		throw new Errors.NotFoundError("Ne postoji bus sa tim id-jem");
	res.status(StatusCodes.OK).json({ok: true, bus});
}

module.exports = {
	createBus,
	getAllBuses,
	getSingleBus
}