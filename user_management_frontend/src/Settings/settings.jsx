import React from 'react';
import { ParticlesBackground } from '../particles/ParticlesBack';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import styles from './settings.module.css';

function Settings() {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [defaultURL, setDefaultURL] = useState('');

  const updateAvatar = async (event) => {
    setAvatar(event.target.files[0]);
    const accessToken = await Cookies.get('access_token');
    setDefaultURL(
      await axios
        .get('http://localhost:5000/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((resolve) => {
          console.log(resolve);
          if (!resolve.data['removedAvatar'])
            return 'http://localhost:3000/' + resolve.data['avatarUrl'];
          return '';
        })
    );
    const form = new FormData();
    form.append('image', avatar);
    await axios.post('http://localhost:5000/user/upload', form, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const handleUsername = async (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const updateUserName = async (event) => {
    const accessToken = await Cookies.get('access_token');
    axios.post(
      'http://localhost:5000/user/username',
      {
        username: userName,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };
  return (
    <>
      <ParticlesBackground />
      {console.log('something   ', defaultURL)}
      <div className={styles.setting}>
        <div className={styles.avatar}>
          <div className={styles.fileInput}>
            <input
              type="file"
              id="file"
              className={styles.file}
              onChange={updateAvatar}
            />
            <label htmlFor="file">
              <img
                className={styles.imgAvatar}
                src="http://localhost:5000/default-avatar.png"
                // src={defaultURL}
                alt="haha"
              />
            </label>
          </div>
        </div>
        <div className={styles.userName}>
          <label>User Name</label>
          <input
            type="text"
            placeholder="Enter your user name"
            className={styles.userInput}
            onChange={handleUsername}
          />
          <button className={styles.btnUsername} onClick={updateUserName}>
            Edit
          </button>
        </div>
        <div className={styles.twoFactorAuth}>
          <label>ENABLE TWO-FACTOR AUTHENTICATION</label>
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
