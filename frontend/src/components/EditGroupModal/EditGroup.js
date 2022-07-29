// frontend/src/components/EditGroup/index.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editGroupThunk, getGroupById } from '../../store/groups';

export default function EditGroup({ group, closeModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const id = group.id;
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState(group.name);
    const [about, setAbout] = useState(group.about);
    const [type, setType] = useState(group.type);
    const [privacy, setPrivacy] = useState(() => {
        if (group.private === true) return 'Private';
        if (group.private === false) return 'Public';
    });
    const [city, setCity] = useState(group.city);
    const [state, setState] = useState(group.state);

    const handleSubmit = async e => {
        e.preventDefault();

        let isPrivate;
        privacy === 'Public' ? isPrivate = false : isPrivate = true;

        let typeString;
        type === 'online' ? typeString = 'Online' : typeString = "In person";

        const payload = {
            id,
            name,
            about,
            organizerId: sessionUser.id,
            city,
            state,
            type: typeString,
            private: isPrivate,
        }
        console.log('payoad', payload);

        const group = await dispatch(editGroupThunk(payload));
        const groupById = await dispatch(getGroupById(group.id));
        // history.push(`/groups/${group.id}`);
        await closeModal(false);
    };

    if (!group) return null;

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
                        <label>isPrivate</label>
                        <select
                            onChange={e => setPrivacy(e.target.value)}
                            value={privacy}
                        >
                            <option value='Public'>Public</option>
                            <option value='Private'>Private</option>
                        </select>
                    </div>
                    <button className='submit-group' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
};