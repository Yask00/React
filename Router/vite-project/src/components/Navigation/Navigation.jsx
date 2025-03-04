import React from 'react'
import { Link, NavLink } from 'react-router' // import Link from react-router-dom    
import './Navigation.css';

export default function Navigation() {
    return (
      <nav className="topnav">
        <Link to="/">Home</Link>
        <Link to="/concerts">Concerts</Link>
        <Link to="/concerts/London">Concerts city</Link>
        <NavLink
          to="/concerts/trending"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Concerts Trading
        </NavLink>
        <NavLink
          to="/concerts/trending/new"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Concerts Trading New
        </NavLink>
      </nav>
    );   
}
