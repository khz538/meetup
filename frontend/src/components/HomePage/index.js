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

const HomePage = () => {
    // const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');

    const sessionUser = useSelector(state => state.session.user);
    // if (sessionUser) return <Redirect to='/'></Redirect>;
    

    return (
        <div>
            <div>
                <div>
                    <h1>Welcome to Meetup</h1>
                    <div>
                        {!sessionUser && <h3>Sign Up or click Demo to use</h3>}
                        <h3>Join a group!</h3>
                    </div>
                    <div><img src={computerdesk}></img></div>
                </div>
                <div className='cardGrid'>
                    <div className='first-image'>
                        <img src={cardGridImg1} alt='woman smiling at desk'></img>
                        <Link to='/groups'>Make new friends →</Link>
                    </div>
                    <div className='second-image'>
                        <img src={cardGridImg2} alt='people hiking in mountains'></img>
                        <Link to='/groups'>Explore →</Link>
                    </div>
                    <div className='third-image'>
                        <img src={cardGridImg3} alt='guy working at a desk'></img>
                        <Link to='/groups'>Connect →</Link>
                    </div>
                </div>
                <div className='search'>
                    <h2>What do you want to do?</h2>
                    <form className='searchForm'>
                        <label>
                            <input 
                                type='text'
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </label>
                        <button type='submit'>Search</button>
                    </form>
                </div>
                <div className='how-meetup-works-blurb'>
                    <h1>How Meetup works</h1>
                    <p>Meet new people who share mutual interests</p>
                    <p>through online and in-person events.</p>
                </div>
                <div>
                    <div>
                        <img src={handsUpImg} alt='hands up'></img>
                        <Link to='/groups'>Join a group</Link>
                        <p>Do what you love, and find your community.</p>
                    </div>
                    <div>
                        <img src={ticketImg} alt='illustration of a ticket'></img>
                        <Link to='/events'>Find an event</Link>
                        <p>All sorts of events are happening every day!</p>
                    </div>
                    <div>
                        <img src={groupImg} alt='illustration of a group'></img>
                        <Link to='/groups/start'>Start a group</Link>
                        <p>Get people together and explore shared interests.</p>
                    </div>
                </div>
                <div>
                    <button>Join Meetup</button>
                </div>
                <div>
                    Create your own group.
                    <button>Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;