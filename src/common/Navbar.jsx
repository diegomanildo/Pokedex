import { Link, NavLink } from "react-router-dom";
import { routes } from "../utils/routes";
import icon from "../../public/icon.svg";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to={routes.default}>
          <img className="m-2" src={icon} width={40} />
          Pokedex
        </Link>
      </div>
      <ul className="navbar__links">
        <li>
          <NavLink
            to={routes.default}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Pokemon
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.searchType}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Type
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.searchMove}
            className={({ isActive }) =>
              (isActive ? "active " : "")
            }
          >
            Movement
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.searchItem}
            className={({ isActive }) =>
              (isActive ? "active " : "")
            }
          >
            Item
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
