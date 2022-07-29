// frontend/src/components/CreateEventPage/index.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createEventThunk } from '../../store/events';

export default function CreateEventPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

    };

    return (
        <div className='create-event-page'>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    className='input-field'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </form>
        </div>
    )
}