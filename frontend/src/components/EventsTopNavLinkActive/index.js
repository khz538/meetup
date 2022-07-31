import React from 'react';
import { NavLink } from 'react-router-dom';
import './EventsTopNavLinkActive.css';

export default function EventsTopNavLinkActive() {
    return (
            <div className='navlink-active-div' id='events-active-navlink-div'>
                <NavLink to='/events' className='navlink-active' id='events-nav-active'>Events</NavLink>
            </div>
    );
};
