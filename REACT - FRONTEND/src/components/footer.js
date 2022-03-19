import {Link} from "react-router-dom";
import "./footer.css";


export default function Footer({affix}) {
	return (
		<footer className={affix ? "footer-affix" : ""}>
			<div className="container-fluid">
				<div className="row">
					<p className="copyright">——<Link to="/"> Express-Bus-Booking </Link>© 2022 ——</p>
				</div>
			</div>
		</footer>
	);
}