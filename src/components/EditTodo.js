import React, {useState, useContext, useEffect} from 'react';
import TodoForm from './TodoForm';
import { TodoContext} from '../context';
import moment from 'moment';
import firebase from '../firebase'

function EditTodo() {
    const { selectedTodo : todo} = useContext(TodoContext)
    const [text, setText] = useState('');
    const [day, setDay] = useState(moment(todo.day, 'd'));
    const [overallDay, setOverallDay] = useState(todo.overallDay);
    const [time, setTime] = useState(moment(todo.time, 'hh:mm A'));
    const [todoProject, setTodoProject] = useState('');


    useEffect(() => {
        if (todo) {
            setText(todo.text)
            setDay(moment(todo.day, 'd'))
            setOverallDay(todo.overallDay)
            setTime(moment(todo.time, 'hh:mm A'))
            setTodoProject(todo.projectName)
        }
    }, [todo])

    useEffect(() => {
            firebase
                .firestore()
                .collection('todos')
                .doc(todo.id)
                .update({
                    text,
                    date: moment(day).format('DD/MM/YYYY'),
                    day: moment(day).format('d'),
                    overallDay: moment(overallDay).format('YYYY-MM-DD hh:mm:ss a'),
                    time: moment(time).format('hh:mm A'),
                    projectName : todoProject
                })
    }, [text, day, time, todoProject, todo.id, overallDay])

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
                                day={overallDay}
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