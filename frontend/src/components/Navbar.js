import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar  () {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        Fitness Tracker
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/Challenges">Challenges</NavLink>
        </li>
        <li>
          <NavLink to="/Leaderboard">Leaderboard</NavLink>
        </li>
        <li>
          <NavLink to="/Profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;