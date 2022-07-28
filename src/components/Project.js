import React, {useContext, useState} from 'react';
import RenameProject from './RenameProject';
import Modal from './Modal';
import {Pencil, XCircle} from 'react-bootstrap-icons';
import { TodoContext } from '../context';
import firebase from '../firebase';
import {useSpring, animated, useTransition} from 'react-spring';


function Project({project, edit}) {
    const { defaultProject, selectedProject,  setSelectedProject} = useContext(TodoContext)

    const [showModal, setShowModal] = useState(false);

    const deleteProject = project => {
        firebase
            .firestore()
            .collection('projects')
            .doc(project.id)
            .delete()
            .then( () => {
                firebase
                    .firestore()
                    .collection('todos')
                    .where('projectName', '==', project.name)
                    .get()
                    .then( querySnapshot => {
                        querySnapshot.forEach( doc => {
                            doc.ref.delete()
                        })
                    })
            })
            .then( () => {
                if ( selectedProject === project.name) {
                    setSelectedProject(defaultProject)
                }
            })
    }

    const fadeIn = useSpring({
        from : { marginTop : '-12px', opacity: 0},
        to : {marginTop : '0px', opacity : 1}
    })

    const btnTransition = useTransition(edit, {
        from : {opacity : 0, right : '-20px'},
        enter : { opacity : 1, right: '0px'},
        leave : {opacity : 0, right : '-20px'}
    })

    return (
        <animated.div style={fadeIn} className="Project">
            <div className="name" onClick={() => setSelectedProject(project.name)}>
                {project.name}
            </div>
            <div className="btns">
                {
                    btnTransition((props, edit) =>
                        edit ?
                        <animated.div style={props} className="edit-delete">
                            <span 
                                className="edit"
                                onClick={ () => setShowModal(true)}
                            >
                                <Pencil size="13" />
                            </span>
                            <span 
                                className="delete"
                                onClick={ () => deleteProject(project)}
                            >
                                <XCircle size="13" />
                            </span>
                        </animated.div>
                        :
                        project.numOfTodos === 0 ?
                        ""
                        :
                        <animated.div style={props} className="total-todos">
                            {project.numOfTodos}
                        </animated.div>
                    )
                }
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <RenameProject project={project} setShowModal={setShowModal}/>
            </Modal>
        </animated.div>

    )
}

export default Project;