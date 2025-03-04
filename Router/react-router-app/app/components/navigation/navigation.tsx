import React from 'react'
import { Link, NavLink } from 'react-router'
import './Navigation.css';

export function Navigation() {
    return (
      <nav className="topnav">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/concerts">Concerts</Link>
        <NavLink
          to="/concerts/trending"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Concerts Trading
        </NavLink>
        <Link to="/login">Login</Link>
        {/* 
        
        <NavLink
          to="/concerts/trending/new"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Concerts Trading New
        </NavLink> */}
      </nav>
    );   
}
