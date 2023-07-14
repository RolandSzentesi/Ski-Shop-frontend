import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
    return (
        <div className="cover-home">
        <div className="home">
            <h1>Welcome To Your First Ski Adventure!</h1>
            <h3>Pick a trainer or become one</h3>
            <Link to='/trainers'><button className="buttons">Pick Your Trainer</button></Link><br/>
            <Link to='/trainers/new'><button className="buttons">Create Trainer</button></Link>
        </div>
        </div>
    )
}