import { Outlet, Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Početna</Link>
          </li>
          <li>
            <Link to="/authors">Autori</Link>
          </li>
          <li>
            <Link to="/instructions">Uputstva</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};