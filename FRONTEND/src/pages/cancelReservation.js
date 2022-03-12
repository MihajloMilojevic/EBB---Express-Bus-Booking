import { useState, useEffect } from "react"
import {useParams} from "react-router-dom" 
const LOADING = "LOADING";
const ERROR = "ERROR";
const NOT_FOUND = "NOT FOUND"
const SUCCESS = "SUCCESS";

export default function CancelReservation() {
	const [status, setStatus] = useState(LOADING);
	const {id: reservationId} = useParams();

	const cancel = async () => {
		try {
			const method = "DELETE";
			const headers = {
				"Content-Type": "application/json"
			}
			const options = {
				method, headers,
			}
			console.log("PRE FETCH");
			const response = await fetch("https://ebb-express-bus-booking.herokuapp.com/api/reservation/" + reservationId, options);
			if(response.status === 404) {
				setStatus(NOT_FOUND);
				return;
			}
			const data = await response.json();
			console.log("POST FETCH");
			if(!data.ok)
				throw new Error(data.message)
			setStatus(SUCCESS);
		} catch (error) {
			console.error(error);
			setStatus(ERROR);
		}
	}

	useEffect(() => {
		cancel()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	switch (status) {
		case LOADING:
			return <h1>Otkazivanje...</h1>
		case ERROR:
			return <h1>Došlo je do greške</h1>
		case NOT_FOUND:
			return <h1>Rezervacija ne postoji</h1>
		case SUCCESS:
			return <h1>Rezervacija otkazana</h1>
		default:
			return <h1>Došlo je do greške</h1>
	}
}