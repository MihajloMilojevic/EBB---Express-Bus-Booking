export default function Authors(params) {
	return (
	<div className="page">
		<div className="row kartice">
		<div className="box-container">
			<div className="box-item">
			<div className="flip-box">
			<div className="flip-box-front text-center" style={{backgroundImage: "url('materijal/sara.jpg')"}}>
				<div className="inner color-white">
				<h3 className="flip-box-header">Mihajlo Milojević</h3>
				</div>
			</div>
			<div className="flip-box-back text-center" style={{backgroundImage: "url('materijal/sara1.jpg')"}}>
				<div className="inner podaci">
				<h3 className="flip-box-header">Podaci:</h3>
				<p>Datum rođenja: 31.05.2004.</p>
				<p>Telefon: 064/978-11-91</p>
				<p>Instagram: @milojevicmihajlo</p>
				<p>GitHub: @MihajloMilojevic</p>
				<p>Email: milojevicm374@gmail.com</p><br/>
				<button type="button" className="dugme3" >Više</button>
				</div>
			</div>
			</div>
			</div>
			<div className="box-item">
			<div className="flip-box">
				<div className="flip-box-front text-center" style={{backgroundImage: "url('materijal/sara.jpg')"}}>
					<div className="inner color-white">
					<h3 className="flip-box-header">Sara Spasojević</h3>
					</div>
				</div>
				<div className="flip-box-back text-center"style={{backgroundImage: "url('materijal/sara1.jpg')"}}>
					<div className="inner podaci">
					<h3 className="flip-box-header">Podaci:</h3>
					<p>Datum rođenja: 20.04.2004.</p>
					<p>Telefon: 061/603-26-65</p>
					<p>Instagram: @n8ne1</p>
					<p>GitHub: @cajjaaa</p>
					<p>Email: saraspasojevic7@gmail.com</p><br/>
					<button type="button" className="dugme3" >Više</button>
					</div>
				</div>
			</div>
			</div>
		</div>
	</div>
	</div>
	)
}