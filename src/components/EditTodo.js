import React, {useState, useContext, useEffect} from 'react';
import TodoForm from './TodoForm';
import { TodoContext} from '../context';
import moment from 'moment';
import firebase from '../firebase'

function EditTodo() {
    const [text, setText] = useState('');
    const [day, setDay] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [todoProject, setTodoProject] = useState('');

    const { selectedTodo, projects} = useContext(TodoContext)

    useEffect(() => {
        if (selectedTodo) {
            setText(selectedTodo.text)
            setDay(moment(selectedTodo.day, 'd'))
            setDate(moment(selectedTodo.date, 'DD/MM/YYYY'))
            setTime(moment(selectedTodo.time, 'hh:mm A'))
            setTodoProject(selectedTodo.projectName)
        }
    }, [selectedTodo])

    useEffect(() => {
            firebase
                .firestore()
                .collection('todos')
                .doc(selectedTodo.id)
                .update({
                    text,
                    date: moment(date).format('DD/MM/YYYY'),
                    day: moment(day).format('d'),
                    time: moment(time).format('hh:mm A'),
                    projectName : todoProject
                })
    }, [text, day, date, time, todoProject, selectedTodo])

    function handleSubmit (e) {
        e.preventDefault();
    } 

    return (
        <div>
            {
                selectedTodo &&
                <div className="EditTodo">
                    <div className="container">
                        <TodoForm 
                                handleSubmit={handleSubmit}
                                text={text}
                                setText={setText}
                                day={day}
                                setDay={setDay}
                                time={time}
                                setTime={setTime}
                                todoProject={todoProject}
                                setTodoProject={setTodoProject}
                                projects={projects}
                                showButtons={false}
                            />
                    </div>
                </div>
            }
        </div> 

    )
}

export default EditTodo