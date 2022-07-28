import React, {useState, useContext, useEffect} from 'react';
import Modal from './Modal';
import TodoForm from "./TodoForm";
import {TodoContext} from '../context';
import {calendarItems} from '../constants';
import firebase from '../firebase';
import moment from 'moment'


function AddNewTodo() {

    const {projects, selectedProject} = useContext(TodoContext);

    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState();
    const [day, setDay] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [todoProject, setTodoProject] = useState(selectedProject);
    const [isValid, setIsValid] = useState(false);
    const [inputError, setInputError] = useState()

    function handleSubmit (e) {
        e.preventDefault()

        if (text) {
            setIsValid(true)
        } else {
            setInputError('Please input a title')
        }

        if (!calendarItems.includes(todoProject)) {
            setIsValid(true)
        } else {
            setInputError('Please select a project')
        }

        const currentDay = moment().format('DD/MM/YYYY')
        const currentTime = moment().format('hh:mm A')
        const currentDayFormatted = moment(currentDay, 'DD/MM/YYY')
        const currentTimeFormatted = moment(currentTime, 'hh:mm A')
        const todoDate = moment(day, 'DD/MM/YYYY')
        const todoTime = moment(time, 'hh:mm A')

        if ((todoTime >= currentTimeFormatted) && (todoDate >= currentDayFormatted)) {
            setIsValid(true)
        } else {
            setInputError('Please select a date/time in the future')
        }
 

        if (isValid) {
            firebase
                .firestore()
                .collection('todos')
                .add(
                    {
                        text: text,
                        date: moment(day).format('DD/MM/YYYY'),
                        day: moment(day).format('d'),
                        time: moment(time).format('hh:mm A'),
                        checked: false,
                        color : '#000',
                        projectName: todoProject
                    }
                )

            setShowModal(false)
            setText('')
            setDay(new Date())
            setTime(new Date())
            setIsValid(false)
            setInputError()
        }
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
                    inputError={inputError}
                />
            </Modal>
        </div>

    )
}

export default AddNewTodo;