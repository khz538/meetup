import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import SignupForm from '../SignupFormModal/SignupForm';
import computerdesk from './online_events.svg';
import cardGridImg1 from './category1.webp';
import cardGridImg2 from './category2.webp';
import cardGridImg3 from './category3.webp';
import handsUpImg from './handsUp.svg';
import ticketImg from './ticket.svg';
import groupImg from './joinGroup.svg';
import './HomePage.css';

const HomePage = () => {
    // const [showModal, setShowModal] = useState(false);

    const sessionUser = useSelector(state => state.session.user);
    // if (sessionUser) return <Redirect to='/'></Redirect>;


    return (
        <div>
            <div className='body'>
                <div className='upper-portion'>
                    <h1 className='h1' id='welcome-message-h1'>Welcome to Meetup</h1>
                    <div className='join-or-sign-up'>
                        {!sessionUser && <h3>Sign Up or click Demo to use</h3>}
                        <h3>Join a group!</h3>
                    </div>
                    <div><img src={computerdesk}></img></div>
                </div>
                <div className='cardGrid'>
                    <div className='card-container'>
                        <img className='card-image' src={cardGridImg1} alt='woman smiling at desk'></img>
                        <Link className='card-link link'o='/groups'>Make new friends →</Link>
                    </div>
                    <div className='card-container'>
                        <img className='card-image' src={cardGridImg2} alt='people hiking in mountains'></img>
                        <Link className='card-link link'to='/groups'>Explore →</Link>
                    </div>
                    <div className='card-container'>
                        <img className='card-image' src={cardGridImg3} alt='guy working at a desk'></img>
                        <Link className='card-link link'to='/groups'>Connect →</Link>
                    </div>
                </div>
                <div className='how-meetup-works-blurb'>
                    <h1>How Meetup works</h1>
                    <p>Meet new people who share mutual interests</p>
                    <p>through online and in-person events.</p>
                </div>
                <div>
                    <div>
                        <img src={handsUpImg} alt='hands up'></img>
                        <Link className='link' to='/groups'>Join a group</Link>
                        <p>Do what you love, and find your community.</p>
                    </div>
                    <div>
                        <img src={ticketImg} alt='illustration of a ticket'></img>
                        <Link className='link' to='/events'>Find an event</Link>
                        <p>All sorts of events are happening every day!</p>
                    </div>
                    <div>
                        <img src={groupImg} alt='illustration of a group'></img>
                        <Link className='link' to='/groups/start'>Start a group</Link>
                        <p>Get people together and explore shared interests.</p>
                    </div>
                </div>
                <div>
                    <button>Join Meetup</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
