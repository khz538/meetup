import React from 'react';
import { NavLink } from 'react-router-dom';
import './EventsTopNavLink.css';

export default function EventsTopNavLink() {
    return (
            <div className='navlink-div' id='events-navlink-div'>
                <NavLink to='/events' className='navlink' id='events-nav'>Events</NavLink>
            </div>
    );
};
