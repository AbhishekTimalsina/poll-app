import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <NavLink to="/">Vote Karo</NavLink>
      </div>
      <div className="nav-link_container">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/browse">Browse Polls</NavLink>
        </li>
        <li>
          <NavLink to="/poll/new">Create Poll</NavLink>
        </li>
      </div>
    </nav>
  );
}

export default Navbar;
