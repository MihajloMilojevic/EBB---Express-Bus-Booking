import React from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import slika1 from "../materijal/Photoshop2.jpg"
import slika2 from "../materijal/crveni-crvi.jpg"

import Swiper, { Navigation, Pagination, Scrollbar  } from 'swiper';
  // import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./instructions.css"

export default class Instructions extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			affix: false
		}
		this.handlePageScroll = this.handlePageScroll.bind(this);
	}

	componentDidMount() {
		this.swiper = new Swiper('.blog-slider', {
			direction: "vertical",
			slidesPerView: 1,
			loopedSlides: 1,
			spaceBetween: 30,
			effect: 'fade',
			loop: true,
			mousewheel: {
			  invert: false,
			},
			// autoHeight: true,
			pagination: {
			  el: '.blog-slider_pagination',
			  clickable: true,
			},
			// scrollbar: {
			// 	el: '.page',
			// },
			// scrollingElement: ".page",
			modules: [Navigation, Pagination, Scrollbar]
		});
	}

	handlePageScroll = e => {
		const scrollTop = e.target.scrollTop;
		if(this.state.affix && scrollTop <= 50)
			return this.setState({affix: false})
		if(!this.state.affix && scrollTop > 50)
			return this.setState({affix: true})
	}

	render() {
		return (
			<div className="page" onScroll={this.handlePageScroll}>
				<div className="uputstvo">
					<Nav affix={this.state.affix}/>
					<div className="blog-slider">
					<div className="blog-slider_wrp swiper-wrapper">
						<div className="blog-slider_item swiper-slide">
						<div className="blog-slider_img">
							<img src={slika1} alt=""/>
						</div>
						<div className="blog-slider_content">
							<span className="blog-slider_code">1. korak</span>
							<div className="blog-slider_title">Kliknite na dugme REZERVIŠI</div>
							<div className="blog-slider_text">Potom popunite polja forme za filtraciju i prikaz odgovarajućih autobusa.</div>
							<div className="blog-slider_button">Saznaj više!</div>
						</div>
						</div>
						<div className="blog-slider_item swiper-slide">
						<div className="blog-slider_img">
							<img src={slika2} alt=""/>
						</div>
						<div className="blog-slider_content">
							<span className="blog-slider_code">2. korak</span>
							<div className="blog-slider_title">Kliknite na dugme Filtriraj</div>
							<div className="blog-slider_text">Potom izaberite autobus iz prikazane liste i popunite polja forme za rezervaciju.</div>
							<div className="blog-slider_button">Saznaj više!</div>
						</div>
						</div>
						<div className="blog-slider_item swiper-slide">
						<div className="blog-slider_img">
							<img src={slika1} alt=""/>
						</div>
						<div className="blog-slider_content">
							<span className="blog-slider_code">3. korak</span>
							<div className="blog-slider_title">Izaberite sedište</div>
							<div className="blog-slider_text">Potom kliknite na dugme Rezerviši i proverite da li ste dobili email kojim je Vaša rezervacija potvrđena.</div>
							<div className="blog-slider_button">Saznaj više!</div>
						</div>
						</div>
					</div>
					<div className="blog-slider_pagination"></div>
					</div>
					<Footer affix={this.state.affix}/>
				</div>
			</div>
		)
	}
}