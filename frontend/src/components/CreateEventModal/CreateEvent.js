// frontend/src/components/CreateEvent/index.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createEventThunk, getOneEventThunk } from '../../store/events';
import DenyAccessPage from '../DenyAccessPage';
// import { getGroupById } from '../../store/groups';

export default function CreateEvent({ group }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    // const { groupId } = useParams();
    const [venueId, setVenueId] = useState('')
    const [name, setName] = useState('');
    const [type, setType] = useState('In person');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    function timeChanger (time) {
        let timeArr = time.split('T');
        let clock = timeArr[1];
        timeArr[1] = clock + ':00';
        let result = timeArr.join(' ');
        return result;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        
        const newStartDate = timeChanger(startDate);
        const newEndDate = timeChanger(endDate);
        console.log(newStartDate, newEndDate);
        let payload;
        if (type === 'Online') {
            payload = {
                venueId: 1,
                groupId: group.id,
                name,
                type,
                capacity,
                price,
                description,
                startDate: newStartDate,
                endDate: newEndDate,
            };
        } else {
            payload = {
                venueId,
                groupId: group.id,
                name,
                type,
                capacity,
                price,
                description,
                startDate: newStartDate,
                endDate: newEndDate,
            };
        };

        const newEvent = await dispatch(createEventThunk(payload));
        const getNewEvent = await dispatch(getOneEventThunk(newEvent.id));
        // console.log(newEvent);
        history.push(`/events/${newEvent.id}`);
    };
    
    if (!group) return null;
    // console.log(group)
    const isLoggedIn = sessionUser;
    if (!isLoggedIn) return <DenyAccessPage />
    
    return (
        <div className='create-event-page'>
            <form onSubmit={handleSubmit}>
                <div className='input-fields'>
                    <label>Venue</label>
                    <input
                        className='input-field'
                        type='number'
                        value={venueId}
                        onChange={e => setVenueId(e.target.value)}
                    />
                    <label>Name</label>
                    <input
                        className='input-field'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <label>Type</label>
                    <select
                        onChange={e => setType(e.target.value)}
                        value={type}
                    >
                        <option value='In person'>In person</option>
                        <option value='Online'>Online</option>
                    </select>
                    <label>Capacity</label>
                    <input
                        className='input-field'
                        type='text'
                        value={capacity}
                        onChange={e => setCapacity(e.target.value)}
                        required
                    />
                    <label>Price</label>
                    <input
                        className='input-field'
                        type='number'
                        min='0'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                    <label>Description</label>
                    <input
                        className='input-field'
                        id='description-field'
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <label>Start Date/Time</label>
                    <input
                        className='input-field'
                        id='start-date'
                        type='datetime-local'
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        required
                    />
                    <label>End Date/Time</label>
                    <input
                        className='input-field'
                        id='end-date'
                        type='datetime-local'
                        min={startDate}
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>
                <button className='create-event-button' type='submit'>Create Event</button>
            </form>
        </div>
    )
}
