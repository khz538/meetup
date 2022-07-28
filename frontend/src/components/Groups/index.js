import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGroups } from '../../store/groups';

export default function Groups() {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.groups);

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch]);

    if (!groups) return null;

    return (
        <div className='all-groups-list'>
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
                                    <p>{group.private.toString()}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
};