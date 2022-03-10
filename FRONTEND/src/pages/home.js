import {useState} from "react";
import Seat from "../components/seat";

export default function Home(params) {
	const [formFilter, setFormFilter] = useState({
		polaziste: "",
		destinacija: "",
		cenaod: 0,
		cenado: 0,
		datumod: "",
		datumdo: ""
	});
	const [formBook, setFormBook] = useState({
		ime: "",
		prezime: "",
		email: ""
	})
	const [buses, setBuses] = useState([]);
	const [selectedBus, setSelectedBus] = useState(null);
	const [book, setBook] = useState([]);

	let SeatNuber = 0;

	const handleTextChange = e => {
		setFormFilter({
			...formFilter,
			[e.target.name]: e.target.value
		})
	}

	const handleDateChange = e => {
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

	const queryBuses = async query => {
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
		} catch (error) {
			console.error(error);
			alert("Došlo je do greške, probajte ponovo kasnije")
		}
	} 

	const handleSubmit = e => {
		e.preventDefault();
		console.log(JSON.stringify(formFilter))
		let query = [];
		for(let name in formFilter)
		{
			console.log(name, formFilter[name]);
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

	const BookTickets = async () => {
		try {
			const body = {
				ime: formBook.ime,
				prezime: formBook.prezime, 
				email: formBook.email,
				karte: book.map(ticket => ({
					red: ticket.row,
					kolona: ticket.col
				}))
			}
			const method = "PATCH";
			const headers = {
				"Content-Type": "application/json"
			}
			const options = {
				method, headers,
				body: JSON.stringify(body)
			}
			const response = await fetch(`https://ebb-express-bus-booking.herokuapp.com/api/bus/${selectedBus._id}/book`, options);
			const data = await response.json();
			if(!data.ok) {
				console.error(data.message);
				alert(data.message);
				return;
			}
			queryBuses()
			alert("Upešno rezervisano");
		} catch (error) {
			console.error(error);
			alert("Došlo je do greške, probajte ponovo kasnije")
		}
	}

	const handleBook = e => {
		e.preventDefault();
		console.log(formBook)
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

	const handleBookInputChange = e => {
		setFormBook({
			...formBook,
			[e.target.name]: e.target.value
		})
	}

	return (
	<>
		<h1>EBB - Express Bus Booking</h1>
		<form onSubmit={handleSubmit}>
			<label>Polazište: </label>
			<input type="text" name="polaziste" value={formFilter.polaziste} onChange={handleTextChange} />
			<br/>
			<label>Destinacija: </label>
			<input type="text" name="destinacija" value={formFilter.destinacija} onChange={handleTextChange} />
			<br/>
			<label>Minimalna cena: </label>
			<input type="number" name="cenaod" value={formFilter.cenaod} onChange={handleTextChange} />
			<br/>
			<label>Maximalna cena: </label>
			<input type="number" name="cenado" value={formFilter.cenado} onChange={handleTextChange} />
			<br/>
			<label>Od datuma: </label>
			<input type="date" name="datumod" onChange={handleDateChange} />
			<br/>
			<label>Do datuma: </label>
			<input type="date" name="datumdo" onChange={handleDateChange} />
			<br/>
			<button type="submit">Pretrazi</button>
		</form>

		{
			buses.map((bus, index) => {
				const d = new Date(bus.polazak);
				return (
					<div 
						key={bus._id}
						style={{
							border: "1px solid black",
							margin: "20px",
							padding: "20px",
						}}
						onClick={() => {
							SeatNuber = 0; 
							setBook([]);
							setSelectedBus(buses[index])	
						}}
					>
						<p>Polazište: {bus.polaziste}</p>
						<p>Destinacija: {bus.destinacija}</p>
						<p>Cena: {bus.cena}</p>
						<p>Polazak: {`${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}. ${d.getHours()}:${d.getMinutes()}`}</p>
					</div>
				)
			})
		}
		{
			selectedBus && 
			<>
				<table>
					<tbody>
						{
							selectedBus.sedista.map((row, rowIndex) => (
								<tr key={"row-" + rowIndex}>
									{
										row.map((col, colIndex) => {
											SeatNuber++;
											let color = "gray";
											if(book.findIndex(el => el.row === rowIndex && el.col === colIndex) >= 0)
												color = "lime";
											if(selectedBus.sedista[rowIndex][colIndex].zauzeto)
												color = "red";
											return <Seat 
														key={"row-" + rowIndex + "-col-" + colIndex}
														color={color} 
														onClick={() => {
															if(selectedBus.sedista[rowIndex][colIndex].zauzeto)
																return;
															if(book.findIndex(el => el.row === rowIndex && el.col === colIndex) >= 0)
																setBook(book.filter(el => !(el.row === rowIndex && el.col === colIndex)))
															else
																setBook([...book, {row: rowIndex, col: colIndex}])
															console.log(book);
														}}
														number={SeatNuber}	
													/>
										})
									}
								</tr>
							))
						}
					</tbody>
				</table>
				<form
					onSubmit={handleBook}
				>
					<label>Ime: </label>
					<input type="text" name="ime" value={formBook.ime} onChange={handleBookInputChange} />
					<br/>
					<label>Prezime: </label>
					<input type="text" name="prezime" value={formBook.prezime} onChange={handleBookInputChange} />
					<br/>
					<label>Email: </label>
					<input type="text" name="email" value={formBook.email} onChange={handleBookInputChange} />
					<br/>
					<button type="submit">Rezervisi</button>
				</form>
			</>
		}
	</>)
}