document.addEventListener("DOMContentLoaded", () => {
	queryBuses("", () => {
		document.querySelector("html").classList.remove("loading")
		document.querySelector(".loading-screen ").classList.add("loaded")
	})
})
let formFilter = {
	polaziste: "",
	destinacija: "",
	cenaod: 0,
	cenado: 0,
	datumod: "",
	datumdo: ""
}
let formBook = {
	ime: "",
	prezime: "",
	email: ""
}
let buses = []
let selectedBusIndex = null;
let book = [];

/* PROMENA FORME */
document.querySelector("#forma").addEventListener("submit", handleFilterSubmit)
document.querySelector("[name=polaziste]").addEventListener("change", handleTextChange);
document.querySelector("[name=destinacija]").addEventListener("change", handleTextChange);
document.querySelector("[name=cenaod]").addEventListener("change", handleTextChange);
document.querySelector("[name=cenado]").addEventListener("change", handleTextChange);
document.querySelector("[name=datumod]").addEventListener("change", handleDateChange);
document.querySelector("[name=datumdo]").addEventListener("change", handleDateChange);

document.querySelector("#book").addEventListener("submit", handleBookFormSubmit);
document.querySelector("[name=ime]").addEventListener("change", handleBookInputChange);
document.querySelector("[name=prezime]").addEventListener("change", handleBookInputChange);
document.querySelector("[name=email]").addEventListener("change", handleBookInputChange);
/* PROMENA FORME */

const busList = document.getElementById("allBuses");
const selectedBus = document.getElementById("selectedBus");
const bookForm = document.getElementById("book-form");

function setFormFilter(value) {
	formFilter = value
}
function setFormBook(value) {
	formBook = value
}
function setBuses(value) {
	buses = value
	busList.innerHTML = "";
	buses.forEach((bus, index) => {
		busList.appendChild(createBusListItem(bus, index))
	});
	setSelectedBusIndex(selectedBusIndex < buses.length ? selectedBusIndex : null);
}
function setBook(value) {
	book = value;
}
function setSelectedBusIndex(value) {
	selectedBusIndex = value;
	selectedBus.innerHTML = "";
	if(selectedBusIndex === null) {
		bookForm.style.display = "none";
		return;
	}
	const bus = buses[selectedBusIndex];
	const d = new Date(bus.polazak);
	bookForm.style.display = "block";
	document.querySelector("[name=ruta]").value = bus.polaziste + " - " + bus.destinacija;
	console.log(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
	document.querySelector("[name=book-datum]").value = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
	document.querySelector("[name=book-vreme]").value = `${d.getHours()}:${d.getMinutes()}`
	document.querySelector("[name=book-cena]").value = bus.cena;
	selectedBus.appendChild(createBusTable(bus));
}
function handleBookFormSubmit(e) {
	e.preventDefault();
	if(book.length === 0)
	{
		alert("Odaberite sedišta za rezervaciju");
		return;
	}
	if(!formBook.ime ) {
		alert("Ime je obavezno");
		return;
	}
	if(!formBook.prezime ) {
		alert("Prezime je obavezno");
		return;
	}
	if(!formBook.email ) {
		alert("Email je obavezan");
		return;
	}
	if(/[0-9!@#\$%\^\&*\)\(+=.:;,"'_-]/.test(formBook.ime)) {
		alert("Ime mora da sadrži samo slova");
		return;
	}
	if(/[0-9!@#\$%\^\&*\)\(+=.:;,"'_-]/.test(formBook.prezime)) {
		alert("Prezime mora da sadrži samo slova");
		return;
	}
	if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formBook.email)) {
		alert("Neispravan email");
		return;
	}
	BookTickets()
}
async function BookTickets(a) {
	try {
		console.log(buses[selectedBusIndex]);
		const body = {
			busId: buses[selectedBusIndex]["_id"],
			ime: formBook.ime,
			prezime: formBook.prezime, 
			email: formBook.email,
			karte: book.map(ticket => ({
				red: ticket.row,
				kolona: ticket.col,
				broj: ticket.seat
			}))
		}
		const method = "POST";
		const headers = {
			"Content-Type": "application/json"
		}
		const options = {
			method, headers,
			body: JSON.stringify(body)
		}
		const response = await fetch(`https://ebb-express-bus-booking.herokuapp.com/api/reservation`, options);
		const data = await response.json();
		if(!data.ok) {
			console.error(data.message);
			alert(data.message);
			return;
		}
		queryBuses()
		alert("Upešno rezervisano");
		setBook([]);
	} catch (error) {
		console.error(error);
		alert("Došlo je do greške, probajte ponovo kasnije")
	}
}
function handleFilterSubmit(e) {
	e.preventDefault();
	// console.log(JSON.stringify(formFilter))
	let query = [];
	for(let name in formFilter)
	{
		// console.log(name, formFilter[name]);
		if(formFilter[name])
			query.push({
				name,
				"value": formFilter[name]
			})
	}
	query = query.map(el => `${el.name}=${el.value}`);
	const queryString = query.join("&");
	queryBuses(queryString);
}
async function queryBuses(query, callback) {
	try {
		const response = await fetch(`https://ebb-express-bus-booking.herokuapp.com/api/bus?${query}`);
		const data = await response.json();
		if(!data.ok)
		{
			console.error(data.message);
			alert(data.message)
			return;
		}
		if(data.buses.length === 0)
		{
			alert("Nema buseva za takvu pretragu");
			return;
		}
		setBuses(data.buses);
		if(callback)
			callback();
	} catch (error) {
		console.error(error);
		alert("Došlo je do greške, probajte ponovo kasnije")
	}
}
function handleTextChange(e) {
	console.log(e.target.value)
	setFormFilter({
		...formFilter,
		[e.target.name]: e.target.value
	})
}
function handleDateChange(e) {
	const value = e.target.value;
	const name = e.target.name;
	if(!value) {
		setFormFilter({
			...formFilter,
			[name]: ""	
		})
	}
	else {
		setFormFilter({
			...formFilter,
			[name]: value.split("-").reverse().join("-")
		})
	}
}
function handleBookInputChange(e) {
	setFormBook({
		...formBook,
		[e.target.name]: e.target.value
	})
}
function createBusListItem(bus, index) {
	function dveCifre(broj) {
		if(broj < 10)
			return "0" + broj;
		return broj;
	}
	const d = new Date(bus.polazak);
	const tr = document.createElement("tr");
	tr.classList.add("clickableRow")
	tr.onclick = () => {
		console.log("klik");
		setBook([]);
		setSelectedBusIndex(index)
		document.getElementById("book-form").scrollIntoView();
	};
	tr.innerHTML = `
		<td class="col-md">${bus.polaziste}</td>
		<td class="col-md">${bus.destinacija}</td>
		<td class="col-md">${dveCifre(d.getDate())}.${dveCifre(d.getMonth()+1)}.${dveCifre(d.getFullYear())}.</td>
		<td class="col-md">${dveCifre(d.getHours())}:${dveCifre(d.getMinutes())}</td>
		<td class="col-md">${bus.cena}</td>
	`
	return tr;
}
const RESERVED = "reserved";
const BOOK = "book";
const FREE = "free";
function createBusTable(bus) {
	const cabin = document.createElement("ol");
	cabin.classList.add("cabin")
	let seatNumber = 0;
	for(let i = 0; i < bus.sedista.length; i++) {
		const red = document.createElement("li");
		red.classList.add("row")
		const ol = document.createElement("ol")
		ol.classList.add("seats")
		const row = bus.sedista[i];
		for(let j = 0; j < row.length; j++) {
			seatNumber++;
			const li = document.createElement("li");
			li.classList.add("seat")
			li.innerText = seatNumber;
			if(row[j]) {
				li.setAttribute("data-status", RESERVED)
				li.style.backgroundColor = "#e3115d";
			}
			else if(book.find(seat => seat.row === i && seat.col === j)) {
				li.setAttribute("data-status", BOOK)
				li.style.backgroundColor = "#bada55";
			}
			else {
				li.setAttribute("data-status", FREE)
				li.style.backgroundColor = "whitesmoke";
			}
			li.addEventListener("click", seatClick(i, j, seatNumber))
			red.appendChild(li);
		}
		cabin.appendChild(red)
	}
	return cabin;
}
function seatClick(row, col, seatNumber) {
	return e => {
		const seat = e.target;
		// console.dir(seat);
		// console.log(seat.attributes["data-status"].value);
		switch (seat.attributes["data-status"].value) {
			case RESERVED:
				return;
			case FREE:
				setBook([...book, {row, col, seat: seatNumber}])
				seat.setAttribute("data-status", BOOK);
				seat.style.backgroundColor = "#bada55";
				return;
			case BOOK:
				setBook(book.filter(el => !(el.row === row && el.col === col && el.seat === seatNumber)))
				seat.setAttribute("data-status", FREE);
				seat.style.backgroundColor = "whitesmoke";
				return;
		}
	}
}