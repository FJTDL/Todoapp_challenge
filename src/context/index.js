import React, { createContext, useState } from 'react';
import {useTodos, useProjects, useFilterTodos, useProjectsWithStats} from '../hooks';


const TodoContext = createContext();

function TodoContextProvider({children}) {
    const defaultProject = 'All days';
    const [selectedProject, setSelectedProject] = useState(defaultProject)
    const [selectedTodo, setSelectedTodo] = useState(undefined)
    const todos = useTodos();
    const projects = useProjects();
    const projectsWithStats = useProjectsWithStats(projects, todos);
    const filteredTodos = useFilterTodos(todos, selectedProject)
    const [editModal, setEditModal] = useState()
    return (
        <TodoContext.Provider
            value={
                {
                    defaultProject,
                    selectedProject,
                    setSelectedProject,
                    todos: filteredTodos,
                    projects :projectsWithStats,
                    selectedTodo,
                    setSelectedTodo,
                    editModal,
                    setEditModal
                }
            }
        >
            {children}
        </TodoContext.Provider>
    )
}

export {TodoContextProvider, TodoContext};