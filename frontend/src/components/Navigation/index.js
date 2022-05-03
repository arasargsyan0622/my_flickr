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
      <ul className='nav-ul'>
        <li>
          <NavLink exact to="/" className="home-btn">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
        <li>
          <NavLink to="/add" className="add-btn">Upload</NavLink>
        </li>
        <li>
          <NavLink to="/images" className="add-btn">Images</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
