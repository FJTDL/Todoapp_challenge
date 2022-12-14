// importing necessary libraries and files

import React, {useState, useContext, useEffect} from 'react';
import Modal from './Modal';
import TodoForm from "./TodoForm";
import {TodoContext} from '../context';
import {calendarItems} from '../constants';
import firebase from '../firebase';
import moment from 'moment'

// function for add new todo
function AddNewTodo() {
    // CONTEXT
    const {projects, selectedProject} = useContext(TodoContext);

    // INITIALISING STATES
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState();
    const [day, setDay] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [todoProject, setTodoProject] = useState(selectedProject);
    const [inputError, setInputError] = useState();

    // INITIZIALING VARIABLE
    let isValid = false;
    let isTextValid = false;
    let isProjectsValid = false;
    let isTodayValid = false;

    // HANDLE SUBMIT FUNCTIONS
    function handleSubmit (e) {
        // PREVENT PAGE FROM RELOADING
        e.preventDefault()

        // INPUT ERROR HANDLING
        if (text) {
            isTextValid = true;
        } else {
            setInputError('Please input a title')
        }

        if (!calendarItems.includes(todoProject)) {
            isProjectsValid=true;
        } else {
            setInputError('Please select a project')
        }
        
        const currentDayFormatted = moment()
        const currentTimeFormatted = moment()
        const todoDate = moment(day, 'DD/MM/YYYY')
        const todoTime = moment(time, 'hh:mm A')
        const diffDays = todoDate.diff(currentDayFormatted, 'days')

        if ((todoDate.format('DD/MM/YYYY') === currentDayFormatted.format('DD/MM/YYYY')) && (todoTime >= currentTimeFormatted)) {
            isTodayValid=true;
        } else if ((todoDate.format('DD/MM/YYYY') === currentDayFormatted.format('DD/MM/YYYY')) && (todoTime <= currentTimeFormatted)) {
            console.log("second")
            setInputError('Please select a valid time')
            isTodayValid=false;
        } else if (diffDays >=0) {
            isTodayValid = true;
        } else  {
            setInputError('Please select a valid date')
        }

        if ( isTextValid && isProjectsValid && isTodayValid ) {
            isValid = true;
        }
        // CREATES NEW TODO 
        if (isValid) {
            firebase
                .firestore()
                .collection('todos')
                .add(
                    {
                        text: text,
                        date: moment(day).format('DD/MM/YYYY'),
                        day: moment(day).format('E'),
                        overallDay: moment(day).format('YYYY-MM-DD hh:mm:ss a'),
                        time: moment(time).format('hh:mm A'),
                        checked: false,
                        color : '#000',
                        projectName: todoProject
                    }
                )
            // RESETS STATES
            setShowModal(false)
            setText('')
            setDay(new Date())
            setTime(new Date())
            isValid=false
            setInputError(undefined)
        } else {
            isValid=false
        }
    } 
    // SET PROJECT WHEN USER CLICKS ON A PROJECT
    useEffect( () => {
        setTodoProject(selectedProject)
    }, [selectedProject])


    // RENDERED CONTENT
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
// EXPORT FUNCTION
export default AddNewTodo;