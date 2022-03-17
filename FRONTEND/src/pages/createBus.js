import { useState } from "react";


export default function CreateBus() {

	const [form, setForm] = useState({
		"polaziste": "",
		"destinacija": "",
		"cena": 0,
		"datum": "",
		"vreme": "",
		"brojRedova": 0,
		"brojKolona": 0
	})

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			alert("Kreiranje");
			const date = form.datum.split("-");
			const time = form.vreme.split(":");
			const body = JSON.stringify({
				polaziste: form.polaziste,
				destinacija: form.destinacija,
				cena: form.cena,
				polazak: {
					godina: Number(date[0]),
					mesec: Number(date[1]),
					dan: Number(date[2]),
					sat: Number(time[0]),
					minut: Number(time[1])
				},
				brojRedova: form.brojRedova,
				brojKolona: form.brojKolona
			})
			const options = {
				body,
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			}
			const res = await fetch("https://ebb-express-bus-booking.herokuapp.com/api/bus", options);
			const data = await res.json();
			if(data.ok)
				alert("Kreiran");
			else
				alert(data.message);
		} catch (error) {
			alert("GRESKA")
		}
		console.log(form);
	}

	const handleChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	return (
		<div className="page">
			<form onSubmit={handleSubmit}>
				<label>Polazište: </label>
				<input type="text" name="polaziste" value={form.polaziste} required onChange={handleChange}/><br/>
				<label>Destinacija: </label>
				<input type="text" name="destinacija" value={form.destinacija} required onChange={handleChange}/><br/>
				<label>Cena: </label>
				<input type="number" name="cena" value={form.cena} required onChange={handleChange}/><br/>
				<label>Broj redova: </label>
				<input type="number" name="brojRedova" value={form.brojRedova} required onChange={handleChange}/><br/>
				<label>Broj kolona: </label>
				<input type="number" name="brojKolona" value={form.brojKolona} required onChange={handleChange}/><br/>
				<label>Dan: </label>
				<input type="date" name="datum" value={form.datum} required onChange={handleChange}/><br/>
				<label>Vreme: </label>
				<input type="time" name="vreme" value={form.vreme} required onChange={handleChange}/><br/>
				<input type="submit" value="CREATE"/>
			</form>
		</div>
	)
}