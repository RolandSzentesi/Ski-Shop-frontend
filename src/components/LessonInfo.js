import React, { useEffect, useState } from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import LessonCard from "./LessonCard";

export default function LessonInfo(){
    const [trainers, setTrainers] = useState([])
    const [lessonDetail, setLessonDetail] = useState(null)
    const {id} = useParams();
    const nav = useNavigate();


    useEffect(()=>{
        fetch('http://localhost:9292/trainers')
            .then(res => res.json())
            .then(data => setTrainers(data))

        fetch(`http://localhost:9292/lessons/${id}`)
            .then(res => res.json())
            .then(data => setLessonDetail(data))
    },[id])

    const trainer = lessonDetail ? trainers.find(train =>{
        return train.id === lessonDetail.trainer_id
    }) : ''

    return(
        <div>
            <button className='backButton' onClick={() => nav(-1)}>Back</button>
            <div className="lesson-cont">
                    {trainer && <LessonCard lesson={lessonDetail}/>}
            </div>
                <h2>Trainer: </h2>
                <Link to={`/trainers/${trainer.id}`}><h3>{trainer.name}</h3></Link>
                <img className="trainer-img" src={trainer.trainer_img} alt="img"/>
        </div>
    )
}