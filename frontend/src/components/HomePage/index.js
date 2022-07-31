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
                    <div className='upper-left-side'>
                        <h1 className='h1' id='welcome-message-h1'>Celebrating 20 years of real connections on Meetup</h1>
                        <div className='join-or-sign-up'>
                            {!sessionUser && <p className='welcome-message'>So happy to see you here! </p>}
                            {!sessionUser && <h4 className='welcome-message'>Sign up, or click Demo to use!</h4>}
                            {sessionUser && <p id='welcome-message'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>}
                        </div>
                    </div>
                    <div className='upper-right-side'><img className='first-image'src={computerdesk}></img></div>
                </div>
                <div className='cardGrid'>
                    <div className='card-container'>
                        <Link className='card-link link' to='/groups'>
                            <img className='card-image' src={cardGridImg1} alt='woman smiling at desk'></img>
                            <p>Make new friends →</p>
                        </Link>
                    </div>
                    <div className='card-container'>
                        <Link className='card-link link' to='/groups'>
                            <img className='card-image' src={cardGridImg2} alt='people hiking'></img>
                            <p>Explore →</p>
                        </Link>
                    </div>
                    <div className='card-container'>
                        <Link className='card-link link' to='/groups'>
                            <img className='card-image' src={cardGridImg3} alt='man at desk working'></img>
                            <p>Connect →</p>
                        </Link>
                    </div>
                    {/* <div className='card-container'>
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
                    </div> */}
                </div>
                <div className='how-meetup-works-blurb'>
                    <h2 id='blurb-h2'>How Meetup works</h2>
                    <p className='blurb-p'>Meet new people who share mutual interests through online and in-person events. It's free to create an account.</p>
                    {/* <p className='blurb-p'>through online and in-person events.</p> */}
                </div>
                <div className='bottom-cards'>
                    <div className='bottom-cards-link' id='join'>
                        <img src={handsUpImg} alt='hands up'></img>
                        <Link className='link' to='/groups'>Join a group</Link>
                        <p className='bottom-cards-p'>Do what you love, and find your community.</p>
                    </div>
                    <div className='bottom-cards-link' id='find-an-event'>
                        <img src={ticketImg} alt='illustration of a ticket'></img>
                        <Link className='link' to='/events'>Find an event</Link>
                        <p className='bottom-cards-p'>All sorts of events are happening every day!</p>
                    </div>
                    <div className='bottom-cards-link' id='start-group'>
                        <img src={groupImg} alt='illustration of a group'></img>
                        <Link className='link' to='/groups/start'>Start a group</Link>
                        <p className='bottom-cards-p'>Get people together and explore shared interests.</p>
                    </div>
                </div>
                {/* <div className='join-button-container'>
                    <button>Join Meetup</button>
                </div> */}
            </div>
        </div>
    );
};

export default HomePage;
