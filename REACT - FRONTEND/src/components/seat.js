export default function Seat({color, onClick, number}) {
	return (
		<td
			style={{
				background: color,
			}}
			onClick={onClick}
		>
			{number}
		</td>
	)
}