// IMPORTS LIBRARIES AND FILES
import { useState, useEffect } from 'react';
import firebase from '../firebase';
import moment from 'moment';


// FUNCTION TO GET TODOS
export function useTodos(){
    //STATES
    const [todos, setTodos] = useState([])

    // USE EFFECT
    useEffect(() => {
        let unsubscribe = firebase
        .firestore()
        .collection('todos')
        .onSnapshot( snapshot => {
            const data = snapshot.docs.map( doc => {
                return {
                    id : doc.id,
                    ...doc.data()
                }
            })
            setTodos(data)
        })

        return () => {unsubscribe()}
    }, [])

    return todos
}
// FUNCTIONS TO FILTER TODOS
export function useFilterTodos(todos, selectedProject) {
    //STATE
    const [filteredTodos, setFilteredTodos] = useState([]);

    // ON CHANGE FUNCTION
    useEffect( () => {
        let data;
        const todayDateFormatted = moment().format('DD/MM/YYYY')

        if(selectedProject === 'Today') {
            data = todos.filter(todo => todo.date === todayDateFormatted)
        } else if (selectedProject === 'Next 7 days') {
            data = todos.filter(todo => {
                const todoDate = moment(todo.date, 'DD/MM/YYYY')
                const todayDate = moment(todayDateFormatted, 'DD/MM/YYYY')

                const diffDays = todoDate.diff(todayDate, 'days')

                return diffDays >= 0 && diffDays < 7
            })
        } else if (selectedProject === 'All days') {
            data = todos
        } else {
            data = todos.filter(todo => todo.projectName === selectedProject)
        }

        setFilteredTodos(data)
    }, [todos, selectedProject])

    return filteredTodos;
}

// FUNCTION TO GET PROJECT
export function useProjects(){
    //STATE
    const [projects, setProjects] = useState([])

    // ONCHANGE
    useEffect(() => {
        let unsubscribe = firebase
        .firestore()
        .collection('projects')
        .onSnapshot( snapshot => {
            const data = snapshot.docs.map( doc => {

                return {
                    id : doc.id,
                    name : doc.data().name
                }
            })
            setProjects(data)
        })

        return () => unsubscribe()
    }, [])

    return projects
}
// FUNCTION TO FIND NUM OF TODOS PER PROJECT
export function useProjectsWithStats(projects, todos) {
    //STATE
    const [projectsWithStats, setProjectsWithStats] = useState([])
    // ONCHANGE
    useEffect( () => {
        const data = projects.map((project) => {
            return {
                numOfTodos : todos.filter( todo => todo.projectName === project.name && !todo.checked).length,
                ...project
            }
        })

        setProjectsWithStats(data)
    }, [projects, todos])

    return projectsWithStats;
} 