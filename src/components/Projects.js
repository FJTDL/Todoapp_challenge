import React, {useState} from 'react'
import { PencilFill, Palette, CaretUp } from 'react-bootstrap-icons';
import AddNewProject from './AddNewProject';
import Project from './Project';

function Projects() {
    const [showMenu, setShowMenu] = useState(true);
    const [edit, setEdit] = useState(false);
    const pencilColor = edit ? "#1EC94C" : "#000";
    const projects = [
        {id: 1, name: "Personal", numOfTodos: 0},
        {id: 2, name: "Work", numOfTodos: 3},
        {id: 3, name: "General", numOfTodos: 0}
    ]

    return (
        <div className="Projects">
            <div className="header">
                <div className="title">
                    <Palette size="18" />
                    <p>Projects</p>
                </div>
                <div className="btns">
                    {
                        showMenu && projects.length > 0 &&
                        <span className="edit" onClick={() => setEdit(edit => !edit)}>
                            <PencilFill size="15" color={pencilColor}/>
                        </span>
                    }
                    
                    <AddNewProject />
                    <span className="arrow">
                        <CaretUp size="20" />
                    </span>
                </div>
            </div>
            <div className="items">
                {
                    projects.map( project => 
                        <Project 
                            project={project}
                            key={project.id}
                            edit={edit}
                        />
                    )
                }
            </div>
        </div>

    )
}

export default Projects