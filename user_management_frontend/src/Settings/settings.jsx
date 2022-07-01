import React from 'react';
import { ParticlesBackground } from '../particles/ParticlesBack';
import { useState } from 'react';

import './settings.css';

function Settings() {
  const [image, setImage] = useState({ avatar: 'default-avatar.png' });
  const onDrop = (event) => {
    console.log(event.target.files[0]);
    setImage({ picture: event.target.files[0] });
  };
  return (
    <>
      <ParticlesBackground />
      <div className="escButton">
        <div className="escOuterButton">
          <div className="escInnerButton"></div>
        </div>
        <h6>ESC</h6>
      </div>
      <div className="container">
        <div className="sectionTitle">User profile</div>
        <div className="sectionContent">
          <label htmlFor="">User Name</label>
          <div className="userName">
            <input type="text" placeholder="Enter your user name" />
            <button>Edit</button>
          </div>
          <div className="Avatar">
            <label htmlFor="">Avatar</label>
            <input type="file" name="avatar" onChange={onDrop} accept="png" />
          </div>
          <div className="Bio">
            About me
            <textarea
              name=""
              id=""
              cols="70"
              rows="4"
              placeholder="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,"
            ></textarea>
            <div className="twoFactorAuth">
              TWO-FACTOR AUTHENTICATION
              <p>
                Add an extra layer of security to your account by using a
                one-time security code each time you login.
              </p>
              <label htmlFor="">Enable 2FA</label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
