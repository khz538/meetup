import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getOneEventThunk, deleteEventThunk, getEventAttendeesThunk } from '../../store/events';
import './EventDetail.css';

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
        // const awaitAttendees = await dispatch(getEventAttendeesThunk(id));
    };

    useEffect(() => {
        thunks(eventId);
    }, [dispatch]);

    if (!events || Object.values(events).length === 0) return null;
    const event = events[eventId];
    // const attendees = events.attendees;
    // console.log(attendees)
    // if (!attendees || !event) return null;
    if (!event) return null;

    const handleDelete = async eventId => {
        // console.log(eventId);
        const awaitDelete = await dispatch(deleteEventThunk(eventId));
        history.push('/events');
    };

    const isOrganizer = sessionUser?.id === event?.Group?.organizerId;
    // console.log(isOrganizer);
    const isOnline = event?.Venue?.city === 'Online';
    // const isLoggedIn = sessionUser;

    return (
        <div className='event-detail-page-wrap'>
            <div className='event-detail-inner-wrap'>
                <div className='image-and-description'>
                    <h1 className='event-detail-name'>{event.name}</h1>
                    <img src={event.previewImage} alt='event-image'></img>
                    <h2>Details</h2>
                    <p>{event.description}</p>
                </div>
                <div className='event-detail-right'>
                    <div>
                        <p><i className="fa-solid fa-id-badge"></i>&nbsp;&nbsp;&nbsp;{event.numAttending} Attending</p>
                        <p><i className="fa-solid fa-users"></i>&nbsp;&nbsp;{event.Group.name}</p>
                    </div>
                    {!isOnline && <p><i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;{event.Venue.city}, {event.Venue.state}</p>}
                    {isOnline && <p><i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;&nbsp;Location: Online</p>}
                    {isOrganizer && <button className='event-delete-button' onClick={() => handleDelete(eventId)}>Delete This Event</button>}
                </div>
                {/* <div>
                    <p>{attendees.Attendees.map(attendee => (
                        <p>{attendee.firstName}</p>
                    ))}</p>
                </div> */}
            </div>
        </div>
    );
};
