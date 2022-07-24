import React, {useState} from 'react';
import TodoForm from './TodoForm';

function EditTodo() {
    const [text, setText] = useState();
    const [day, setDay] = useState();
    const [time, setTime] = useState();
    const [todoProject, setTodoProject] = useState();

    const projects = [
        {id: 1, name: "Personal", numOfTodos: 0},
        {id: 2, name: "Work", numOfTodos: 3},
        {id: 3, name: "General", numOfTodos: 0}
    ]

    function handleSubmit (e) {

    } 

    return (
        <div className="EditTodo">
            <div className="header">
                Edit Todo
            </div>
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
                />
            </div>
        </div>

    )
}

export default EditTodo