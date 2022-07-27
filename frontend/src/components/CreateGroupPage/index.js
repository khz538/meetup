// frontend/src/components/CreateGroupPage/index.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGroup } from '../../store/groups';
import * as sessionActions from '../../store/session';

export default function CreateGroupPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('');
    const [privacy, setPrivacy] = useState(false);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            name,
            about,
            organizerId: sessionUser.id,
            city,
            state,
            type,
            privacy
        }

        const newGroup = await dispatch(createGroup(payload));
        history.push(`/group/${newGroup.id}`);
    };

    return (
        <div className='create-group-page'>
            <form onSubmit={handleSubmit}>
                <div className='create-group-inner'>
                    <div className='input-fields'>
                        <label>Name</label>
                        <input
                            className='input-field'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <label>About</label>
                        <input
                            className='input-field'
                            type='text'
                            value={about}
                            onChange={e => setAbout(e.target.value)}
                        />
                        <label>City</label>
                        <input
                            className='input-field'
                            type='text'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <label>State</label>
                        <input
                            className='input-field'
                            type='text'
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                        <label>Type</label>
                        <select>
                            <option value="option 1">In person</option>
                            <option value="option 2">Online</option>
                        </select>
                        <label>Group Visibility</label>
                        <select>
                            <option value='private'>Private</option>
                            <option value='public'>Public</option>
                        </select>
                    </div>
                    <button className='submit' type='submit'>
                        Create Group
                    </button>
                </div>
            </form>
        </div>
    )
}