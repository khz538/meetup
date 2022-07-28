import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getOneEventThunk, deleteEventThunk } from '../../store/events';

export default function EventDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { eventId } = useParams();
    const event = useSelector(state => state.events.event);
    const sessionUser = useSelector(state => state.session.user);
    // console.log('------------', event);

    useEffect(() => {
        dispatch(getOneEventThunk(eventId));
    }, [dispatch]);

    if (!event) return null;
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
            </div>
        </div>
    );
}