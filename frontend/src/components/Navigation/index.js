// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import DemoUser from '../DemoUser';
import logo from './meetup-logo.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <DemoUser />
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='navbar'>
      <div className='logo-container'>
        <NavLink exact to="/">
          <img className='logo' src={logo} alt='meetup logo'></img>
        </NavLink>
      </div>
      <div className='nav-buttons'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
