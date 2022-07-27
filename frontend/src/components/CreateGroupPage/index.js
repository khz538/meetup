// frontend/src/components/CreateGroupPage/index.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGroupThunk } from '../../store/groups';
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
        let isPrivate;
        if (privacy === 'Public') {
            isPrivate = false;
        } else {
            isPrivate = true;
        }

        let typeString;
        type === 'online' ? typeString = 'Online' : typeString = "In person";

        const payload = {
            name,
            about,
            organizerId: sessionUser.id,
            city,
            state,
            type: typeString,
            private: isPrivate,
        }

        const newGroup = await dispatch(createGroupThunk(payload));
        history.push(`/groups/${newGroup.id}`);
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
                        <label>State/Province</label>
                        <input
                            className='input-field'
                            type='text'
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                        <label>Type</label>
                        <select
                            onChange={e => setType(e.target.value)}
                            value={type}
                        >
                            <option value='In-Person'>In person</option>
                            <option value='Online'>Online</option>
                        </select>
                        <label>Group Visibility</label>
                        <select
                            onChange={e => setPrivacy(e.target.value)}
                            value={privacy}
                        >
                            <option value={privacy}>Public</option>
                            <option value={privacy}>Private</option>
                        </select>
                    </div>
                    <button className='submit-new-group' type='submit'>
                        Create Group
                    </button>
                </div>
            </form>
        </div>
    )
}