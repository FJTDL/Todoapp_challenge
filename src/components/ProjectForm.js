// IMPORTS REACT

import React from 'react';

function ProjectForm({
        handleSubmit,
        heading,
        value,
        setValue,
        setShowModal,
        confirmButtonText
    }) {
    // RENDERED CONTENT
    return (
        <form className="ProjectForm" onSubmit={handleSubmit}>
            <h3>{heading}</h3>
            <input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type='text'
                placeholder="Project Name"
                autoFocus
            />
            <button className="cancel" onClick={() => setShowModal(false)}>
                Cancel
            </button>
            <button className="confirm">
                {confirmButtonText}
            </button>
        </form>
    )   
}
// EXPORTS FUNCTIONS
export default ProjectForm;