import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './GroupsAndEventsNav.css';

export default function GroupsAndEventsNav() {
    return (
        <>
            <NavLink to='/groups' className='navlink' id='groups-nav'>Groups</NavLink>
            <NavLink to='/events' className='navlink' id='events-nav'>Events</NavLink>
        </>
    );
};