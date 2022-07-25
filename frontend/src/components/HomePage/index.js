import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import SignupForm from '../SignupFormModal/SignupForm';


const HomePage = () => {
    const [showModal, setShowModal] = useState(false);

    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) return <Redirect to='/'></Redirect>;

    return (
        <div>
            <div>
                <div>
                    <h1>Please Use Meetus</h1>
                    <div>
                        <h3>Placeholder 1</h3>
                        <h3>Placeholder 2</h3>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomePage;