import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";

export default function Trainers(){
    const [trainers, setTrainers] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:9292/trainers')
            .then(res => res.json())
            .then(data => setTrainers(data))
    })
// export default function Trainers({trainers}){
    if(trainers.length > 0)  {
        return (
            <div className="trainer-container">
                <h2>Trainers</h2>
                {trainers.map((trainer)=>{
                    return(
                        
                        <div className="trainees" key={trainer.id}>
                            <img className="trainer-image" src={trainer.trainer_img} alt="img"></img>
                            <div className="card-attr">
                            <h2>{trainer.name}</h2>
                            <h4>Location: {trainer.location}</h4>
                            <Link className="linked" to={`/trainers/${trainer.id}`}>Create/View Lessons</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (<div>Loading</div>)
    }
}