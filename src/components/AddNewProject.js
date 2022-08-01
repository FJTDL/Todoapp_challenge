// importing necessary librarys

import React, {useState} from 'react';
import Modal from './Modal';
import ProjectForm from './ProjectForm';
import {Plus} from 'react-bootstrap-icons';
import firebase from '../firebase'

// creating Add New Project function

function AddNewProject() {
    // initizling state for modal and project name
    const [showModal, setShowModal] = useState(false); 
    const [projectName, setProjectName] = useState(''); 

    // function for when form is submitted (takes in input values)
    function handleSubmit(e){
        e.preventDefault()

        // checks if project name is not blank and creates the new project in projects collection
        // this function also checks if the project name already exists
        if(projectName) {
            const projectsRef = firebase.firestore().collection('projects')

            projectsRef
                .where('name', '==', projectName)
                .get()
                .then( querySnapshot => {
                    if(querySnapshot.empty) {
                    projectsRef
                        .add(
                            {
                                name: projectName
                            }
                        )
                    } else {
                        alert('Project already exists')
                    }
                })
            // resets states to default after project has been submitted to close modal
            setShowModal(false)
            setProjectName('')
        }
    }
    // This is what is rendered on screen, it includes the + button for new project as well as modal with project form
    return (
        <div className="AddNewProject">
            <div className="add-button">
                <span onClick={() => setShowModal(true)}>
                    <Plus size="20" />
                </span>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <ProjectForm 
                    handleSubmit={handleSubmit}
                    heading='New Project!'
                    value={projectName}
                    setValue={setProjectName}
                    setShowModal={setShowModal}
                    confirmButtonText='+ Add Project'
                />
            </Modal>
        </div>

    )
}
// exports component so can be used in other files as it is called in projects
export default AddNewProject