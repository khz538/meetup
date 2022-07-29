import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGroups } from '../../store/groups';
import GroupsAndEventsNav from '../GroupsAndEventsNav';

export default function Groups() {
    const dispatch = useDispatch();
    const groups = Object.values(useSelector(state => state.groups));

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch]);

    if (!groups) return null;

    return (
        <div className='all-groups-list'>
            <GroupsAndEventsNav />
            <div>
                <h4>Suggested Groups</h4>
            </div>
            <div>
                {groups.map((group) => (
                    <Link to={`/groups/${group.id}`}>
                        <div>
                            <div className='img-container'>
                                <img src={group.previewImage}></img>
                            </div>
                            <div>
                                <div>
                                    <h3>{group.name}</h3>
                                    <h4>{group.city}, {group.state}</h4>
                                    <p>{group.about}</p>
                                </div>
                                <div>
                                    <p>{group.numMembers}</p>
                                    {!!group.private && <p>Private Group</p>}
                                    {!group.private && <p>Public Group</p>}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
};