import React, { useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import Trainers from './Trainers'; 
import NavBar from './NavBar';
import Home from './Home';
import ContactPage from './ContactPage';
import AllLessons from './AllLessons';
import CreateTrainer from './CreateTrainer';
import TrainerLessons from './TrainerLessons';
import AddNewLesson from './AddNewLesson';
import EditTrainer from './EditTrainer';
import EditLesson from './EditLesson';
import LessonInfo from './LessonInfo';


export default function App() {
  const [trainers, setTrainers] = useState([])
  const [lesson, setLesson] = useState([])

  const newTrainer = (trainer) =>{
    setTrainers([trainer, ...trainers])
  }

  const newLesson = (less) =>{
    setLesson([less, ...lesson])
  }

  const updateTrainer = (updatedTrainer) =>{
    setTrainers(trainers.map(trainer => trainer.id === updatedTrainer.id ? updatedTrainer : trainer))
  }

  const updateLesson = (updatedLesson) =>{
    setLesson(lesson.map(less => less.id === updatedLesson.id ? updatedLesson : less))
  }

  const deleteTrainer = (trainerId) =>{
    setTrainers(trainers.filter(train => train.id !== trainerId))
    setLesson(lesson.filter(less => less.trainer_id !== trainerId))
  }

  const deleteLesson = (lessonId) =>{
    setLesson(lesson.filter(less => less.id !== lessonId))
  }

  return (
    <div className="App">
        <NavBar />
      <Routes>
        <Route path={"/"} element={<Home/>} />
        <Route path={"/trainers"} element={<Trainers/>} />
        <Route path={"/trainers/new"} element={<CreateTrainer newTrainer={newTrainer} />} />
        <Route path={"/trainers/:id"} element={<TrainerLessons deleteTrainer={deleteTrainer} deleteLesson={deleteLesson} />} />
        <Route path={"/trainers/:id/edit"} element={<EditTrainer updateTrainer={updateTrainer} />} />
        <Route path={"/lessons/:id"} element={<LessonInfo />} />
        <Route path={"/lessons/:id/edit"} element={<EditLesson updateLesson={updateLesson} />} />
        <Route path={"/lessons"} element={<AllLessons/>} />
        <Route path={"/trainers/:id/lessons/new"} element={<AddNewLesson newLesson={newLesson} />} />
        <Route path={"/contact"} element={<ContactPage/>} />
      </Routes>
    </div>
  );
}


