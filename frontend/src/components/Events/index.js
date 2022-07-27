import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEvents } from '../../store/events';
import groupsReducer from '../../store/groups';

export default function Events() {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.events);
    // console.log('!!!!!!', events)
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    if (!events) return null;

    return (
        <div>
            <div>
                <h4>Suggested Events</h4>
            </div>
            <div>
                {events.map(event => {
                    <Link to={`/events/${event.id}`}>
                        <div>
                            <div className='img-container'>
                                <img src={event.previewImage}></img>
                            </div>
                            <div>
                                <div>
                                    <h3>{event.name}</h3>
                                    <h4>{event.city}, {event.state}</h4>
                                    <p>{event.about}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                })}
            </div>
        </div>
    )
}