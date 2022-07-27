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
    setAvatar(event.target.value);
  };
  const handleButton = async (event) => {
    const accessToken = await Cookies.get('access_token');
    // const user = await axios.get('http://localhost:3000/user', {
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // });
    // console.log(user);
    if (userName) {
      
    }
    // axios.post(
    //   'http://localhost:3000/user/username',
    //   {
    //     username: userName,
    //   },
    //   {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   }
    // );
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
        <button onClick={handleButton}>Edit</button>
      </div>
    </div>
  );
}

export default SignInPopup;
