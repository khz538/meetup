import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getEvents } from '../../store/events';
import './Events.css';

export default function Events() {
    const dispatch = useDispatch();
    const events = Object.values(useSelector(state => state.events));
    // console.log('!!!!!!', events);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    if (!events || events.length === 0) return null;
    // const eventArr = Object.values(events)[0];
    // console.log(eventArr[0])
    // if (!events) return null;

    return (
        <div className='all-events-list'>
            <div className='groups-events-navlinks'>
                <NavLink to='/events' className='navlink' id='events-nav-active'>Events</NavLink>
                <NavLink to='/groups' className='navlink' id='groups-nav'>Groups</NavLink>
            </div>
            <div>
                <h4 className='suggested-events-text'>Suggested Events</h4>
            </div>
            <div className='event-card-wrapper'>
                {events.map((event, i) => (
                    <Link key={i} to={`/events/${event.id}`}>
                        <div className='event-card'>
                            <div className='event-img-container'>
                                <img className='event-img' src={event.previewImage}></img>
                            </div>
                            <div className='event-card-right-wrap'>
                                <div className='event-card-right'>
                                    <p className='event-startDate'>{event.startDate.toString().slice(5,10)}-{event.startDate.toString().slice(0, 4)}&nbsp;&nbsp;{event.startDate.toString().slice(11,16)}</p>
                                    <p className='event-name'>{event.name}</p>
                                    {/* <h4>{event.Venue.city}, {event.Venue.state}</h4> */}
                                    <p className='event-description'>{event.description}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
