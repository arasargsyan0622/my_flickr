import React from 'react';
import { NavLink } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useDispatch } from "react-redux";
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const demoUser = (e) => {
    e.preventDefault();
    const credential = "Demo-lition"
    const password = "password"
    return dispatch(sessionActions.login({ credential, password }))
  }

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
        <button onClick={demoUser} className="demo-button" type="submit">Demo User</button>
      </>
    );
  }

  return (
    <div className='btn-container'>
        <div className='nav-home'>
            <NavLink exact to="/" className="home-btn"><i className="fa-solid fa-house-chimney"></i></NavLink>
            {isLoaded && sessionLinks}
        </div>
        <div className='nav-add'>
          { sessionUser ? <NavLink to="/add" className="add-btn"><i className="fa-solid fa-cloud-arrow-up"></i><div className='upload-text'>Upload</div></NavLink> : null }
        </div>
        <div className='nav-explore'>
          { sessionUser ? <NavLink to="/images" className="add-btn"><i className="fa-brands fa-wpexplorer"></i><div className='explore-text'>Explore</div></NavLink> : null }
        </div>
    </div>
  );
}

export default Navigation;
