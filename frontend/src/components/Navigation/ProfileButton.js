// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";
import { useHistory, Link } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      <button className="userprof-btn" onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        <i className="fa-regular fa-address-card"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <label>{user.username}</label>
          <label>{user.email}</label>
          {/* <Link className="userprof-link" to="/user-profile">
            User Profile
          </Link> */}
          <Link className='start-group-link' to='/groups/start'>Start a group</Link>
          <div>
            <button className="logout-btn" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
