import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getGroups } from '../../store/groups';
import BottomBar from '../BottomBar';
import GroupsTopNavLinkActive from '../GroupsTopNavLinkActive';
import EventsTopNavLink from '../EventsTopNavLink';
import './Groups.css';

export default function Groups() {
    const dispatch = useDispatch();
    const groups = Object.values(useSelector(state => state.groups));

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch]);

    if (!groups) return null;

    return (
        <div className='all-groups-list'>
            <div className='groups-events-navlinks'>
                <NavLink to='/events' className='navlink' id='events-nav'>Events</NavLink>
                <NavLink to='/groups' className='navlink' id='groups-nav-active'>Groups</NavLink>
            </div>
            <div>
                <h4 className='suggested-groups-text'>Suggested Groups</h4>
            </div>
            <div className='group-card-wrapper'>
                {groups.map((group) => (
                    <Link to={`/groups/${group.id}`}>
                        <div className='group-card'>
                            <div className='group-img-container'>
                                <img className='group-img' src={group?.previewImage}></img>
                            </div>
                            <div className='card-right'>
                                <div className='card-top-right'>
                                    <h3>{group.name}</h3>
                                    <h4>{group.city}, {group.state}</h4>
                                </div>
                                <div className='card-about'>
                                    <p>{group.about}</p>
                                </div>
                                <div className='card-bottom'>
                                    <p>{group.numMembers} Members |</p>
                                    {!!group.private && <p>Private</p>}
                                    {!group.private && <p>Public</p>}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <BottomBar />
        </div>
    )
};
