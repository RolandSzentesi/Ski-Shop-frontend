import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditLesson({updateLesson}){
    const {id} = useParams();
    const nav = useNavigate();
    const dateInput = useRef(null);
    const [lessonInfo, setLessonInfo] = useState({
        name: '',
        date: '',
        price: '',
        description: ''
    })

    useEffect(()=>{
        fetch(`http://localhost:9292/lessons/${id}`)
        .then(res => res.json())
        .then(data => setLessonInfo(data))
    },[id])

    const submitEditLesson = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:9292/lessons/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lessonInfo)
        })
        .then(res=>res.json())
        .then(data =>{
            updateLesson(data)
            nav('/trainers')
        })
    }

    const handleChange = (e) => {
        setLessonInfo({
            ...lessonInfo,
            [e.target.name]: e.target.value
        })
    }


    return(
        <div>
            <form onSubmit={submitEditLesson}>
                <label> Name: </label>
                <input name="name" type="text" placeholder="Name" onChange={handleChange} value={lessonInfo.name}/>
                <label>Date: </label>
                <input name="date" type="date" placeholder="Date" onChange={handleChange} value={lessonInfo.date} ref={dateInput}/>
                <label>Price: </label>
                <input name="price"  placeholder="Price" onChange={handleChange} value={lessonInfo.price}/>
                <label>Description: </label>
                <input name="description" type="text" placeholder="Description" onChange={handleChange} value={lessonInfo.description}/>
                <button type="submit" className="submit">Create</button>
            </form>
        </div>
    )
}