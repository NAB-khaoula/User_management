import Cookies from 'js-cookie';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ParticlesBackground } from '../particles/ParticlesBack';
import styles from './signInPopup.module.css';

function SignInPopup() {
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
    axios.post('http://localhost:3000/user/upload', form, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };
  return (
    <div className={styles.container}>
      <ParticlesBackground />
      <div className={styles.card}>
        <label htmlFor="">Make sure to Enter your credentials</label>
        <div className={styles.userName}>
          <input
            type="text"
            placeholder="Enter your user name"
            value={userName}
            onChange={handleUsernameChange}
          />
        </div>
        <div className={styles.avatar}>
          <label htmlFor="">Avatar</label>
          <input
            type="file"
            name="avatar"
            accept="png"
            onChange={handleAvatarUpload}
          />
        </div>
        <button className={styles.btn} onClick={updateUserCredential}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default SignInPopup;
