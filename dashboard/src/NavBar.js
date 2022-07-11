import React from "react";
import logo from "./logo.png";
import "./App.css";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="container">
      <div className="submenu">
        <a>
          <img src={logo} alt="logo" className="logo"></img>
        </a>
        <ul className="nav-menu">
          <li>
            <NavLink to="/">Users</NavLink>
          </li>
          <li>
            <NavLink to="/developers">Developers</NavLink>
          </li>
          <li>
            <NavLink to="/clients">Clients</NavLink>
          </li>
          <li>
            <NavLink to="/myProfile">My profile</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
