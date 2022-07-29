import React, {useState, useContext, useEffect} from 'react';
import TodoForm from './TodoForm';
import { TodoContext} from '../context';
import moment from 'moment';
import firebase from '../firebase'

function EditTodo() {
    const { selectedTodo : todo} = useContext(TodoContext)
    const [text, setText] = useState('');
    const [day, setDay] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [todoProject, setTodoProject] = useState('');


    useEffect(() => {
        if (todo) {
            setText(todo.text)
            setDay(moment(todo.day, 'd'))
            setDate(moment(todo.date, 'DD/MM/YYYY'))
            setTime(moment(todo.time, 'hh:mm A'))
            setTodoProject(todo.projectName)
            console.log("this should only be called once?")
        }
    }, [todo])

    useEffect(() => {
            firebase
                .firestore()
                .collection('todos')
                .doc(todo.id)
                .update({
                    text,
                    date: moment(date).format('DD/MM/YYYY'),
                    day: moment(day).format('d'),
                    time: moment(time).format('hh:mm A'),
                    projectName : todoProject
                })
    }, [text, day, date, time, todoProject, todo.id])

    function handleSubmit (e) {
        e.preventDefault();
    } 

    return (
        <div>
            {
                todo &&
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
                                projects={""}
                                showButtons={false}
                                editProject={true}
                            />
                    </div>
                </div>
            }
        </div> 

    )
}

export default EditTodo