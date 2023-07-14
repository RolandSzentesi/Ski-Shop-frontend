import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTrainer({newTrainer}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        trainer_img: '',
        location: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onNewTrainer = (e) => {
        e.preventDefault()
        fetch('http://localhost:9292/trainers', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        newTrainer(data)
        navigate('/trainers')
    })
    }

    return (
        <div>
            <form onSubmit={onNewTrainer}>
            <div className="title">Welcome</div>
            <div className="subtitle">Let's create a trainer!</div>
                <label>Name: </label>
                <input name="name" type="text" onChange={handleChange} value={formData.name}/>
                <label>Image: </label>
                <input name="trainer_img" type="text" onChange={handleChange} value={formData.trainer_img}/>
                <label>Location: </label>
                <input name="location" type="text" onChange={handleChange} value={formData.location}/>
                <button className="submit" type='submit'>Submit</button>
            </form>
        </div>
    )
}