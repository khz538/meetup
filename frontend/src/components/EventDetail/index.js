import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getOneEventThunk, deleteEventThunk, getEventAttendeesThunk } from '../../store/events';

export default function EventDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { eventId } = useParams();
    const events = useSelector(state => state.events);
    // console.log(events)
    const sessionUser = useSelector(state => state.session.user);
    
    async function thunks(id) {
        const awaitEvent = await dispatch(getOneEventThunk(id));
        // console.log(awaitEvent);
        const awaitAttendees = await dispatch(getEventAttendeesThunk(id));
    };
    
    useEffect(() => {
        thunks(eventId);
    }, [dispatch]);
    
    if (!events || Object.values(events).length === 0) return null;
    const event = events[eventId];
    const attendees = events.attendees;
    // console.log(attendees)
    if (!attendees || !event) return null;

    const handleDelete = async eventId => {
        console.log(eventId);
        const awaitDelete = await dispatch(deleteEventThunk(eventId));
        history.push('/events');
    };

    // const isOrganizer

    return (
        <div>
            <div>
                <img src={event.previewImage} alt='event-image'></img>
                <div>
                    <h1>{event.name}</h1>
                    <p>{event.description}</p>
                    <p>{event.numAttending}</p>
                    <p>{event.Group.name}</p>
                    <p>{event.Venue.city}, {event.Venue.state}</p>
                </div>
                <div>
                    <p>{attendees.Attendees.map(attendee => (
                        <p>{attendee.firstName}</p>
                    ))}</p>
                </div>

            </div>
        </div>
    );
};