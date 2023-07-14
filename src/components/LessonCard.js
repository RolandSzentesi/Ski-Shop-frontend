import React from "react";
import { Link } from "react-router-dom";

export default function LessonCard({lesson}){
    return(
        <Link to={`/lessons/${lesson.id}`}>
            <div className="cards" >
                <p>Name: {lesson.name}</p>
                <p>Date: {lesson.date}</p>
                <p>Price: ${lesson.price}</p>
                <p>Description: {lesson.description}</p>
            </div></Link>
    )
}