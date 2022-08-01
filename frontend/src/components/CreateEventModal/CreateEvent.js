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
    const sessionUser = useSelector(state => state.session?.user);
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

    useEffect(() => {
        const newErrors = [];
        // if (!Number.isInteger(Number(venueId))) newErrors.push('Venue field must be an integer ID');
        if (name.length < 5) newErrors.push('Name must be at least five characters');
        if (!Number.isInteger(Number(capacity))) newErrors.push('Capacity must be an integer');
        if (Number(capacity) < 0) newErrors.push('Capacity must not be negative');
        if (price < 0) newErrors.push('Price must not be negative');
        if (!description.length) newErrors.push('Event description is required');
        if (Date.parse(startDate) < Date.now()) newErrors.push('The event must start in the future');
        if (Date.parse(endDate) < Date.parse(startDate)) newErrors.push('The event must not end before it starts');
        if (!startDate) newErrors.push('Start date is required');
        if (!endDate) newErrors.push('End date is required');
        setErrors(newErrors);
        console.log(errors)
    }, [name, capacity, price, description, startDate, endDate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setHasSubmitted(true)
        if (errors.length) return;
        const newStartDate = timeChanger(startDate);
        const newEndDate = timeChanger(endDate);
        // const capacityInt = parseInt(capacity);
        // console.log(newStartDate, newEndDate);
        let payload;
        if (type === 'Online') {
            // setVenueId(1)
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
            setVenueId(1)
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
        console.log(payload);
        const newEvent = await dispatch(createEventThunk(payload));
        const getNewEvent = await dispatch(getOneEventThunk(newEvent.id));
        // console.log(newEvent);
        history.push(`/events/${newEvent.id}`);
    };

    if (!group) return null;
    // console.log(group)
    const isLoggedIn = sessionUser;
    if (!isLoggedIn) return <DenyAccessPage />;

    return (
        <div className='create-event-page'>
            <form onSubmit={handleSubmit}>
                <div className='errors-div'>
                    <ul>
                        {hasSubmitted && errors.length > 0 &&
                        errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
                <div className='input-fields'>
                    <label>Type</label>
                    <select
                        onChange={e => setType(e.target.value)}
                        value={type}
                    >
                        <option value='In person'>In person</option>
                        <option value='Online'>Online</option>
                    </select>
                    {type==='In person' &&
                        <>
                            <label>Venue ID</label>
                            <select
                                // placeholder='Venue ID 1 is Online'
                                // className='input-field'
                                // type='number'
                                // step='1'
                                // min='1'
                                value={venueId}
                                onChange={e => setVenueId(e.target.value)}
                            >
                                {/* <option value="1">1</option> */}
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </>

                    }
                    <label>Name</label>
                    <input
                        placeholder='Event Name'
                        className='input-field'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <label>Capacity</label>
                    <input
                        placeholder='capacity'
                        className='input-field'
                        type='text'
                        // step='1'
                        // min='0'
                        value={capacity}
                        onChange={e => setCapacity(e.target.value)}
                        required
                    />
                    <label>Price</label>
                    <input
                        placeholder='Price'
                        className='input-field'
                        type='number'
                        min='0'
                        step='.01'
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
                        step='any'
                        min={new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]}
                        onChange={e => setStartDate(e.target.value)}
                        required
                    />
                    <label>End Date/Time</label>
                    <input
                        className='input-field'
                        id='end-date'
                        type='datetime-local'
                        min={startDate}
                        step='any'
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>
                <button className='create-event-button' type='submit' >Create Event</button>
            </form>
        </div>
    )
}
