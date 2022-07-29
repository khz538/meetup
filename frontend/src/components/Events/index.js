import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEvents } from '../../store/events';

export default function Events() {
    const dispatch = useDispatch();
    const events = Object.values(useSelector(state => state.events));
    console.log('!!!!!!', events);
    
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);
    
    if (!events || events.length === 0) return null;
    // const eventArr = Object.values(events)[0];
    // console.log(eventArr[0])
    // if (!events) return null;

    return (
        <div>
            <div>
                <h4>Suggested Events</h4>
            </div>
            <div>
                {events.map((event, i) => (
                    <Link key={i} to={`/events/${event.id}`}>
                        <div>
                            <div className='img-container'>
                                <img src={event.previewImage}></img>
                            </div>
                            <div>
                                <div>
                                    <h3>{event.name}</h3>
                                    {/* <h4>{event.Venue.city}, {event.Venue.state}</h4> */}
                                    <p>{event.description}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}