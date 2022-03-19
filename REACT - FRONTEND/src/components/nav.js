import { Link } from "react-router-dom";
import "./nav.css";


export default function Nav({affix}) {

    const triggerAnimation = e => {
        document.querySelector(".navTrigger").classList.toggle("active")
        document.querySelector("#mainListDiv").classList.toggle("show_list");
        document.querySelector(".nav .container").classList.toggle("pointer-show")
    }

  return (
    <nav className={"nav" + (affix ? " affix" : "")}>
    <div className="container">
        <div className="logo">
            <Link to="/">ebb</Link>
        </div>
        <div id="mainListDiv" className="main_list">
            <ul className="navlinks" id="linkovi">
                <li><Link to="/">Pocetna</Link></li>
                <li><Link to="/authors">O autorima</Link></li>
                <li><Link to="/instructions">Uputstvo</Link></li>
            </ul>
        </div>
    </div>
        <span className="navTrigger" onClick={triggerAnimation}>
            <i></i>
            <i></i>
            <i></i>
        </span>
  </nav>
  )
};
