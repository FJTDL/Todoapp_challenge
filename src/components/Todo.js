//IMPORTS LIBRARIES AND FILES
import React, {useState, useContext} from 'react';
import {CheckCircleFill, Circle, Trash, Pencil } from 'react-bootstrap-icons';
import firebase from '../firebase';
import Modal from './Modal';
import EditTodo from './EditTodo';
import { TodoContext } from '../context';
import {useSpring, animated} from 'react-spring';

function Todo({todo}) {

    // CONTEXT
    const { setSelectedTodo, editModal, setEditModal} = useContext(TodoContext)

    // STATE
    const [hover, setHover] = useState(false);

    // DELETE TODO
    const deleteTodo = todo => {
        firebase
            .firestore()
            .collection('todos')
            .doc(todo.id)
            .delete()
    }

    // CHECK TODO
    const checkTodo = todo => {
        firebase
            .firestore()
            .collection('todos')
            .doc(todo.id)
            .update({
                checked: !todo.checked
            })
    }

    // ANIMATION
    const fadeIn = useSpring({
        from : { marginTop : '-12px', opacity: 0},
        to : {marginTop : '0px', opacity : 1}
    })

    // RENDERED CONTENT
    return (
        <animated.div style={fadeIn} className="Todo">
            <div 
                className="todo-container"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div 
                    className="check-todo"
                    onClick={ () => checkTodo(todo)}
                >
                    {
                        todo.checked ?
                        <span className="checked">
                            <CheckCircleFill color="#bebebe"/>
                        </span>
                        :
                        <span className="unchecked">
                            <Circle color={todo.color}/>
                        </span>
                    }
                </div>
                <div className="text">
                    <p style={{color: todo.checked ? '#bebebe' : '#000'}} >{todo.text}</p>
                    <span>{todo.time} - {todo.projectName} - {todo.date}</span>
                    <div className={`line ${todo.checked ? 'line-through': ''}`}></div>
                </div>
                <div
                    className="edit-todo-button"
                    onClick={ () => {
                        setSelectedTodo(todo)
                        setEditModal(true)
                    }}    
                >
                    {
                        hover &&
                        <span>
                            <Pencil size="13" />
                        </span>
                    }
                </div>
                <div 
                    className="delete-todo"
                    onClick={ () => {
                        deleteTodo(todo)
                        setSelectedTodo(undefined)
                    }}
                >
                    {
                        (hover || todo.checked) &&
                        <span>
                            <Trash />
                        </span>
                    }
                </div>
            </div>
            <Modal showModal={editModal} setShowModal={setEditModal}>
                <EditTodo/>
            </Modal>
        </animated.div>

    )
}

//EXPORT COMPONENT
export default Todo;