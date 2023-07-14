import React, { useEffect, useState } from "react";
import LessonCard from "./LessonCard";

export default function AllLessons(){
    const [lesson, setLesson] = useState([])

    useEffect(() =>{
        fetch('http://localhost:9292/lessons')
            .then(res => res.json())
            .then(data => setLesson(data))
    },[])

    const lessonsList = lesson.map((lesson) =>{
        return <LessonCard key={lesson.id} lesson={lesson} />
    })

    return(
        <main>
                <h1>Lessons List</h1>
                <h2>These are the type of lessons our trainers offer!</h2><br></br>
                <div className="lesson-container">
                    {lessonsList}
                </div>
        </main>
    )
}