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
  const updateUserName = async (event) => {
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
    // const form = new FormData();
    // form.append('image', avatar);
    // await axios.post('http://localhost:3000/user/upload', form, {
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // });
    // const URL = axios
    //   .get('http://localhost:3000/user', {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then(
    //     (resolve) => 'http://localhost:3001/user' + resolve.data['avatarUrl']
    //   );
  };
  return (
    <>
      <ParticlesBackground />
      <div className={styles.setting}>
        <div className={styles.avatar}>
          <div className={styles.fileInput}>
            <input
              type="file"
              id="file"
              className={styles.file}
              onChange={handleAvatarUpload}
            />
            <label for="file">
              <img
                className={styles.imgAvatar}
                src="http://localhost:5000/default-avatar.png"
                alt=""
              />
            </label>
          </div>
        </div>
        <div className={styles.userName}>
          <label htmlFor="">User Name</label>
          <input
            type="text"
            placeholder="Enter your user name"
            className={styles.userInput}
            onChange={handleUsernameChange}
          />
          <button className={styles.btnUsername} onClick={updateUserName}>
            Edit
          </button>
        </div>
        <div className={styles.twoFactorAuth}>
          <label htmlFor="">ENABLE TWO-FACTOR AUTHENTICATION</label>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
      </div>
    </>
  );
}

export default Settings;
