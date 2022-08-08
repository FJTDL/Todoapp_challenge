// IMPORTS LIBRARIES AND FILES
import React from 'react';
import {CalendarDay, Clock, Palette, X} from 'react-bootstrap-icons';
import {DatePicker, TimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


function TodoForm({
    handleSubmit,
    heading = false,
    text, setText,
    day, setDay,
    time, setTime,
    todoProject, setTodoProject,
    projects, 
    showButtons = false,
    setShowModal= false,
    inputError,
    editProject = false
}) {
    //RENDERED CONTENT
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form onSubmit={handleSubmit} className="TodoForm">
                <div className="text">

                    { 
                        heading &&
                        <h3>{heading}</h3>
                    }
                    <input type='text' value={text} onChange={ e => setText(e.target.value)} placeholder='To Do ...' autoFocus/>
                </div>
                
                <div className="pick-day">
                    <div className="title">
                        <CalendarDay />
                        <p>Choose a day</p>
                    </div>
                    <DatePicker 
                        value={day}
                        onChange={day => setDay(day)}
                    />
                </div>
                <div className="pick-time">
                    <div className="title">
                        <Clock />
                        <p>Choose Time</p>
                    </div>
                    <TimePicker 
                        value={time}
                        onChange={time => setTime(time)}
                    />
                </div>
                {!editProject &&
                <div className="pick-project">
                    <div className="title">
                        <Palette />
                        <p>Choose a project</p>
                    </div>
                    <div className="projects">
                        {
                            projects.length > 0 ?
                            projects.map( project => 
                                <div 
                                    className={`project ${todoProject === project.name ? "active" : ""}`}
                                    key={project.id}
                                    onClick={() => setTodoProject(project.name)}
                                >
                                    {project.name}
                                </div>
                            )
                            :
                            <div style={{color:'#ff0000'}}>
                                Please add a project before proceeding
                            </div>
                        }
                    </div>
                    {
                        inputError ?
                        <div className="errorText">{inputError}</div>
                        :
                        <div></div>
                    }
                </div>
                }
                {
                    showButtons &&
                    <div>
                        <div className="cancel" onClick={() => setShowModal(false)}>
                            <X size="40"/>
                        </div>
                        <div className="confirm">
                            <button> Submit </button>
                        </div>
                    </div>
                }
            </form>
        </MuiPickersUtilsProvider>
    )
}
// EXPORTS COMPONENT
export default TodoForm;