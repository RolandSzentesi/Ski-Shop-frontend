import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar(){
    return (
        <nav className="navbar">
            <NavLink to={"/"} style={{padding: "1rem"}}>Home</NavLink>
            <NavLink to={"/trainers"} style={{padding: "1rem"}}>Trainers</NavLink>
            <NavLink to={"/lessons"} style={{padding: "1rem"}}>Lessons</NavLink>
            <NavLink to={"/contact"} style={{padding: "1rem"}}>Contact Page</NavLink>
        </nav>
    )
}