import React, {useState, useContext, useEffect} from 'react';
import Modal from './Modal';
import TodoForm from "./TodoForm";
import {TodoContext} from '../context';


function AddNewTodo() {

    const {selectedProject} = useContext(TodoContext);

    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState('');
    const [day, setDay] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [todoProject, setTodoProject] = useState(selectedProject);

    

    const projects = [
        {id: 1, name: "Personal", numOfTodos: 0},
        {id: 2, name: "Work", numOfTodos: 3},
        {id: 3, name: "General", numOfTodos: 0}
    ]

    function handleSubmit (e) {

    } 

    useEffect( () => {
        setTodoProject(selectedProject)
    }, [selectedProject])

    return (
        <div className="AddNewTodo">
            <div className="btn">
                <button onClick={() => setShowModal(true)}>
                    + New Todo
                </button>
            </div>
            
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <TodoForm 
                    handleSubmit={handleSubmit}
                    heading="Add new To Do"
                    text={text}
                    setText={setText}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setTime={setTime}
                    todoProject={todoProject}
                    setTodoProject={setTodoProject}
                    projects={projects}
                    showButtons={true}
                    setShowModal={setShowModal}
                />
            </Modal>
        </div>

    )
}

export default AddNewTodo;