import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

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
        <LoginFormModal />
        <NavLink to="/signup" className="signup-btn">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='btn-container'>
        <div className='nav-home'>
            <NavLink exact to="/" className="home-btn">Home</NavLink>
            {isLoaded && sessionLinks}
        </div>
        <div className='nav-add'>
          { sessionUser ? <NavLink to="/add" className="add-btn">Upload</NavLink> : null }
        </div>
        <div className='nav-explore'>
          { sessionUser ? <NavLink to="/images" className="add-btn">Explore</NavLink> : null }

        </div>
    </div>
  );
}

export default Navigation;
