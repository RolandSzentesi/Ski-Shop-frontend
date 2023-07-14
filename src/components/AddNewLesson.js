import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddNewLesson({newLesson}){
    const nav = useNavigate();
    const {id} = useParams();
    const dateInput = useRef(null);
    const [lessonForm, setLessonForm] = useState({
        name: '',
        date: '',
        price: '',
        description: '',
        trainer_id: id
    })

    const handleNewLesson = (e) =>{
        setLessonForm({
            ...lessonForm,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitLesson = (e) => {
        e.preventDefault();
        fetch(`http://localhost:9292/trainers/${id}/lessons`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify(lessonForm)
        })
        .then(res => res.json())
        .then(data => {
            newLesson(data)
            nav(`/trainers/${id}`)
        })
    }

    return(
        <div>
            <form className="lesson-form" onSubmit={onSubmitLesson}>
                <label>Name:</label>
                <input name="name" type="text" placeholder="Name" value={lessonForm.name} onChange={handleNewLesson}/>
                <label>Date: </label>
                <input name="date" type="date" placeholder="Date" value={lessonForm.date} onChange={handleNewLesson} ref={dateInput}/>
                <label>Price: </label>
                <input name="price"  placeholder="Price" value={lessonForm.price} onChange={handleNewLesson}/>
                <label>Description: </label>
                <input name="description" type="text" placeholder="Description" value={lessonForm.description} onChange={handleNewLesson}/>
                <button className="submit" type="submit">Create</button>
            </form>
        </div>
    )
}