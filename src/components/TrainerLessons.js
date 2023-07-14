import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function TrainerLessons({deleteTrainer, deleteLesson}) {
    const [detail, setDetail] = useState(null)
    const {id} = useParams();
    const nav = useNavigate();

    useEffect(()=>{
        fetch(`http://localhost:9292/trainers/${id}`)
        .then(res=>res.json())
        .then(data => setDetail(data))
    },[id])

    const onTrainerDelete = () =>{
        fetch(`http://localhost:9292/trainers/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(() =>{
            deleteTrainer(id)
            nav('/trainers')
        })
    }

    const submitDeleteLesson = (less) =>{
        const filteredLessons = detail.lessons.filter(lesson =>{
            return lesson.id !== less.id })

        fetch(`http://localhost:9292/lessons/${less.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then((data) =>{
            deleteLesson(data.id)
            setDetail((prev) => {
                return {...prev, lessons: filteredLessons}
            })
        })
    }


    const addNewLesson = () =>{
        detail.lessons.length >= 3 ? alert("NO MORE LESSONS") : nav(`/trainers/${id}/lessons/new`)
    }

    const editTrainer = () =>{
        nav(`/trainers/${id}/edit`)
    }

    return(detail ?
            <>
            <button className='backButton' onClick={() => nav(-1)}>Back</button>
        <div className="train-card">
            
            <h2>{detail.name}</h2>
            <img className="image-card" src={detail.trainer_img} alt="kep"></img>
            {detail.lessons.map((lesson) =>{
                return(
                <div className="lesson-card" key={lesson.id}>
                    <p onClick={() => nav(`/lessons/${lesson.id}`)}>{lesson.name}</p>
                    <Link to={`/lessons/${lesson.id}/edit`}>Edit</Link>
                    <button className="delete-lesson" onClick={() => submitDeleteLesson(lesson)}>X</button>
                </div>
                )
            })}
            <div className="trainer-footer">
            <button className="trainer-button" onClick={() => addNewLesson()}>Create Lesson</button>
            <button className="trainer-button" onClick={() => editTrainer()}>Edit Trainer</button>
            <button className="delete-button" onClick={onTrainerDelete}>Delete Trainer</button>
            </div>
            
        </div>
        </>
        : 
        <h1>Loading</h1>
    )
}