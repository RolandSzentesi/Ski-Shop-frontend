import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTrainer({updateTrainer}){
    const {id} = useParams();
    const nav = useNavigate();
    const [trainerForm, setTrainerForm] = useState({
        name: '',
        trainer_img: '',
        location: ''
    })

    useEffect(() =>{
        fetch(`http://localhost:9292/trainers/${id}`)
        .then(res => res.json())
        .then(data => setTrainerForm(data))
    }, [id])

    const submitEditTrainer = (e) =>{
        e.preventDefault();
        fetch(`http://localhost:9292/trainers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trainerForm)
        })
        .then(res => res.json())
        .then(data => {
            updateTrainer(data)
            nav(`/trainers/${id}`)})
    }

    const handleChange = (e) => {
        setTrainerForm({
            ...trainerForm,
            [e.target.name]: e.target.value
        })
    }


    return(
        <div>
            <form onSubmit={submitEditTrainer}>
                <div className="title">Edit Trainer Profile!</div>
                <label>Name: </label>
                <input name="name" type="text" onChange={handleChange} value={trainerForm.name}/>
                <label>Image: </label>
                <input name="trainer_img" type="text" onChange={handleChange} value={trainerForm.trainer_img}/>
                <label>Location: </label>
                <input name="location" type="text" onChange={handleChange} value={trainerForm.location}/>
                <button className="submit" type="submit">Submit</button>
            </form>
        </div>
    )
}