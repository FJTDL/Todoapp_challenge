// IMPORTS LIBRARIES AND FILES

import React, {useState, useContext} from 'react';
import ProjectForm from './ProjectForm'
import firebase from '../firebase'
import { TodoContext } from '../context';

function RenameProject({project, setShowModal}) {
    // STATE
    const [newProjectName, setNewProjectName] = useState(project.name);

    // CONTEXT
    const {selectedProject, setSelectedProject} = useContext(TodoContext)

    // RENAME PROJECT FUNCTION
    const renameProject = (project, newProjectName) => {
        const projectsRef = firebase.firestore().collection('projects')
        const todosRef = firebase.firestore().collection('todos')

        const { name : oldProjectName } = project

        // UPDATES PROJECT NAMES AND TODOS
        projectsRef
            .where('name', '==', newProjectName)
            .get()
            .then( querySnapshot => {
                if(!querySnapshot.empty){
                    alert('Project with the same name already exists!')
                }else{
                    projectsRef
                        .doc(project.id)
                        .update({
                            name : newProjectName
                        })
                        .then( () => {
                            todosRef
                                .where('projectName', '==', oldProjectName)
                                .get()
                                .then( querySnapshot => {
                                    querySnapshot.forEach( doc => {
                                        doc.ref.update({
                                            projectName : newProjectName
                                        })
                                    })
                                })
                                .then( () => {
                                    if(selectedProject === oldProjectName){
                                        setSelectedProject(newProjectName)
                                    }
                                })
                        })
                }
            })
    }
    // HANDLE SUBMIT
    function handleSubmit(e) {
        e.preventDefault()

        renameProject(project, newProjectName)

        setShowModal(false);
    }
    // RENDERED CONTENT
    return (
        <div className="RenameProject">
            <ProjectForm 
                    handleSubmit={handleSubmit}
                    heading='Edit Project'
                    value={newProjectName}
                    setValue={setNewProjectName}
                    setShowModal={setShowModal}
                    confirmButtonText='Confirm'
                />
        </div>

    )
}
// EXPORT FUNCTION
export default RenameProject