// IMPORT LIBRARIES AND FILES

import React, {useContext, useState} from 'react'
import { CalendarDate, CaretUp } from 'react-bootstrap-icons';
import{calendarItems } from '../constants/index';
import {TodoContext} from '../context';
import { useSpring, animated } from 'react-spring';


// CALENDAR FUNCTION
function Calendar() {
    // STATES
    const [showMenu, setShowMenu] = useState(true)

    // CONTEXT
    const {setSelectedProject} = useContext(TodoContext)
    
    // ANIMATIONS
    const spin = useSpring({
        transform : showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
        config : {friction : 10}
    })

    const menuAnimation = useSpring({
        display: showMenu ? 'block' : 'none',
        lineHeight: showMenu ? 1.2 : 0,
        config : { friction : 15}
    })

    // RENDERED CONTENT
    return (
        <div className="Calendar">
            <div className="header">
                <div className="title">
                    <CalendarDate size="18"/>
                    <p>Calendar</p>
                </div>
                <animated.div 
                    style={spin} 
                    className="btns"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <span>
                        <CaretUp size="20"/>
                    </span>
                </animated.div>
            </div>
            <animated.div style={menuAnimation} className="items">
                {
                    calendarItems.map( item => 
                        <div 
                            className="item" 
                            key={item}
                            onClick={ () => setSelectedProject(item)}
                        >
                            {item}
                        </div>
                        
                    )
                }
            </animated.div>
        </div>

    )
}
// EXPORT FUNCTION
export default Calendar;