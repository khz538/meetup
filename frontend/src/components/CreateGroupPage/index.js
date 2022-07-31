// frontend/src/components/CreateGroupPage/index.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGroupThunk } from '../../store/groups';
// import BottomBar from '../BottomBar';
import DenyAccessPage from '../DenyAccessPage';

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
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const isLoggedIn = sessionUser;

    useEffect(() => {
        const newErrors = [];
        if (name.length > 60) newErrors.push('Name must be shorter than 60 characters');
        if (!name.length) newErrors.push('Name is required');
        if (about.length < 50 || about.length > 1000) newErrors.push('About must be longer than 50 characters and shorter than 1000');
        if (!about.length) newErrors.push('About is required')
        // if (type !== 'Online' || type !== 'In person') newErrors.push('Type must be either Online or In person');
        // if (privacy === undefined) newErrors.push('Privacy setting must be selected');
        if (!city.length) newErrors.push('City is required');
        if (!state.length) newErrors.push('State/Province is required');
        setErrors(newErrors);
    }, [name, about, city, state]);

    const handleSubmit = async e => {
        e.preventDefault();
        setHasSubmitted(true);
        if (errors.length) return;

        let isPrivate;
        privacy === 'Public' ? isPrivate = false : isPrivate = true;

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
        };

        const newGroup = await dispatch(createGroupThunk(payload));
        history.push(`/groups/${newGroup.id}`);
    };
    
    if (!isLoggedIn) return <DenyAccessPage />

    return (
        <div className='create-group-page'>
            <form onSubmit={handleSubmit}>
                <div className='errors-div'>
                    <ul>
                        {hasSubmitted && errors.length > 0 &&
                        errors.map((error, i) => 
                        <li key={i}>{error}</li>)}
                    </ul>
                </div>
                <div className='create-group-inner'>
                    <div className='input-fields'>
                        <label>Name</label>
                        <input
                            placeholder='Name your group!'
                            className='input-field'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <label>About</label>
                        <input
                            placeholder='About your group...'
                            className='input-field'
                            type='text'
                            value={about}
                            onChange={e => setAbout(e.target.value)}
                            required
                        />
                        <label>City</label>
                        <input
                            placeholder='Enter a city'
                            className='input-field'
                            type='text'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                        <label>State/Province</label>
                        <input
                            placeholder='Enter a state/province'
                            className='input-field'
                            type='text'
                            value={state}
                            onChange={e => setState(e.target.value)}
                            required
                        />
                        <label>Type</label>
                        <select
                            placeholder='In-Person'
                            onChange={e => setType(e.target.value)}
                            value={type}
                            required
                        >
                            <option value='In-Person'>In person</option>
                            <option value='Online'>Online</option>
                        </select>
                        <label>Group Visibility</label>
                        <select
                            onChange={e => setPrivacy(e.target.value)}
                            value={privacy}
                            required
                            placeholder='Private'
                        >
                            <option value='Public'>Public</option>
                            <option value='Private'>Private</option>
                        </select>
                    </div>
                    <button
                        className='submit-new-group'
                        type='submit'
                        disabled={errors.length}
                    >
                        Create Group
                    </button>
                </div>
            </form>
            {/* <BottomBar /> */}
        </div>
    )
}