import {useState} from "react";
import Seat from "../components/seat";

export default function Home(params) {
	const [form, setForm] = useState({
		polaziste: "",
		destinacija: "",
		cenaod: 0,
		cenado: 0,
		datumod: "",
		datumdo: ""
	});
	const [buses, setBuses] = useState([]);
	const [selectedBus, setSelectedBus] = useState(null);
	const [book, setBook] = useState([]);

	let SeatNuber = 0;

	const handleTextChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const handleDateChange = e => {
		const value = e.target.value;
		const name = e.target.name;
		if(!value) {
			setForm({
				...form,
				[name]: ""	
			})
		}
		else {
			setForm({
				...form,
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
		console.log(JSON.stringify(form))
		let query = [];
		for(let name in form)
		{
			console.log(name, form[name]);
			if(form[name])
				query.push({
					name,
					"value": form[name]
				})
		}
		query = query.map(el => `${el.name}=${el.value}`);
		const queryString = query.join("&");
		queryBuses(queryString);
	}

	return (
	<>
		<h1>EBB - Express Bus Booking</h1>
		<form onSubmit={handleSubmit}>
			<label>Polazište: </label>
			<input type="text" name="polaziste" value={form.polaziste} onChange={handleTextChange} />
			<br/>
			<label>Destinacija: </label>
			<input type="text" name="destinacija" value={form.destinacija} onChange={handleTextChange} />
			<br/>
			<label>Minimalna cena: </label>
			<input type="number" name="cenaod" value={form.cenaod} onChange={handleTextChange} />
			<br/>
			<label>Maximalna cena: </label>
			<input type="number" name="cenado" value={form.cenado} onChange={handleTextChange} />
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
		}
	</>)
}