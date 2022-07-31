import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './GroupsTopNavLinkActive.css';

export default function GroupsTopNavLinkActive() {
    return (
            <div className='navlink-active-div' id='groups-navlink-active-div'>
                <NavLink to='/groups' className='navlink' id='groups-active-nav'>Groups</NavLink>
            </div>
    );
};
