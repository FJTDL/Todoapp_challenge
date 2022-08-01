// IMPORTS LIBRARIES

import React, {useRef} from 'react';
import {useSpring, animated} from 'react-spring'

// FUNCTION USED FOR ALL MODALS
function Modal({children, showModal, setShowModal}) {
    const modalRef = useRef()

    // WHEN USER CLICKS OUTSIDE OF BOX MODAL IS CLOSED
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowModal(false)
        }
    }

    // ANIMATION
    const modalAnimation = useSpring({
        opacity : showModal ? 1 : 0,
        top: showModal ? '25%' : '0%',
        config: {friction : 13},
    })
    // RENDERS CONTENT OF MODAL
    return (
        showModal &&
        <div className="Modal" ref={modalRef} onClick={closeModal}>
            <animated.div style={modalAnimation} className="container">
                {children}
            </animated.div>
        </div>
    )
}
// EXPORTS MODAL
export default Modal