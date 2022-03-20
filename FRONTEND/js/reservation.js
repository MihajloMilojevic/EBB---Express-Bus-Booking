const searchParams = new Proxy(new URLSearchParams(window.location.search), {
	get: (params, prop) => params.get(prop),
});
let reservation = null;

findReservation(searchParams.id, () => {
	document.querySelector("html").classList.remove("loading")
	document.querySelector(".loading-screen ").classList.add("loaded")
})

const messageDOM = document.getElementById("message")
const reservationDOM = document.getElementById("reservation")
const idDOM = document.getElementById("id")
const imeDOM = document.getElementById("ime")
const prezimeDOM = document.getElementById("prezime")
const emailDOM = document.getElementById("email")
const polazisteDOM = document.getElementById("polaziste")
const destinacijaDOM = document.getElementById("destinacija")
const cenaDOM = document.getElementById("cena")
const polazakDOM = document.getElementById("polazak")
const otkazDOM = document.getElementById("otkaz")

otkazDOM.onclick = () => {
	otkazDOM.disabled = true;
	cancelReservation(reservation._id)
}

function setReservation(value) {
	reservation = value;
	function dveCifre(broj) {
		if(broj < 10)
			return "0" + broj;
		return broj;
	}
	idDOM.innerText = reservation._id;
	imeDOM.innerText = reservation.ime;
	prezimeDOM.innerText = reservation.prezime;
	emailDOM.innerText = reservation.email;
	polazisteDOM.innerText = reservation.busId.polaziste;
	destinacijaDOM.innerText = reservation.busId.destinacija;
	cenaDOM.innerText = reservation.busId.cena;
	const d = new Date(reservation.busId.polazak)
	polazakDOM.innerText = `${dveCifre(d.getDate())}.${dveCifre(d.getMonth()+1)}.${dveCifre(d.getFullYear())}. ${dveCifre(d.getHours())}:${dveCifre(d.getMinutes())}`;
}
function showMessage(message) {
	reservationDOM.style.display = "none";
	messageDOM.style.display = "block";
	messageDOM.innerText = message
}
async function findReservation(id, callback) {
	try {
		const response = await fetch(`https://ebb-express-bus-booking.herokuapp.com/api/reservation/${id}`);
		const data = await response.json();
		if(!data.ok)
		{
			console.error(data.message);
			showMessage(data.message)
			return;
		}
		setReservation(data.reservation)
	} catch (error) {
		console.error(error);
		showMessage(error.message)
	}
	finally {
		if(callback)
			callback();
	}
}
async function cancelReservation(id) {
	try {
		const method = "DELETE";
		const headers = {
			"Content-Type": "application/json"
		}
		const options = {
			method, headers,
		}
		const response = await fetch("https://ebb-express-bus-booking.herokuapp.com/api/reservation/" + id, options);
		if(response.status === 404) {
			showMessage("Ne postoji rezervacija sa id-jem " + id)
			return;
		}
		const data = await response.json();
		if(!data.ok)
			throw new Error(data.message)
		showMessage("Rezervacija otkazana")
	} catch (error) {
		console.error(error);
		showMessage("Došlo je do greške probajte ponovo kasnije")
	}
}