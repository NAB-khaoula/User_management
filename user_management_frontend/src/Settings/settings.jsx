import React from 'react';
import { ParticlesBackground } from '../particles/ParticlesBack';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import styles from './settings.module.css';

function Settings() {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const handleUsernameChange = async (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const handleAvatarUpload = async (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    setAvatar(event.target.files[0]);
  };
  const updateUserCredential = async (event) => {
    const accessToken = await Cookies.get('access_token');
    axios.post(
      'http://localhost:3000/user/username',
      {
        username: userName,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const form = new FormData();
    form.append('image', avatar);
    await axios.post('http://localhost:3000/user/upload', form, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const URL = axios
      .get('http://localhost:3000/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (resolve) => 'http://localhost:3001/user' + resolve.data['avatarUrl']
      );
  };
  return (
    <>
      <ParticlesBackground />
      {/* <div className={styles.escButton}>
        <div className={styles.escOuterButton}>
          <div className={styles.escInnerButton}></div>
        </div>
        <h6>ESC</h6>
      </div>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>User profile</div>
        <div className={styles.sectionContent}>
          <label htmlFor="">User Name</label>
          <form className={styles.userName} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your user name"
              // value={userName}
            />
            <button type="submit">Edit</button>
          </form>
          <div className={styles.Avatar}>
            <label htmlFor="">Avatar</label>
            <input type="file" name="avatar" accept="png" />
          </div>
          <div className={styles.twoFactorAuth}>
            TWO-FACTOR AUTHENTICATION
            <p>
              Add an extra layer of security to your account by using a one-time
              security code each time you login.
            </p>
            <label htmlFor="">Enable 2FA</label>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
        </div>
      </div> */}
      <div className={styles.credentials}>
        <input
          type="text"
          placeholder="Enter your user name"
          value={userName}
        />
        <button type="submit">Edit</button>
      </div>
    </>
  );
}

export default Settings;
