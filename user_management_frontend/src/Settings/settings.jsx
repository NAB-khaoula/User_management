import React, { useEffect } from 'react';
import { ParticlesBackground } from '../particles/ParticlesBack';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import styles from './settings.module.css';

function Settings() {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [defaultURL, setDefaultURL] = useState(null);
  const [qrCode, setQrCode] = useState();
  const [is2FA, setIs2FA] = useState(false);

  useEffect(() => {
    const responseImage = async () => {
      const accessToken = await Cookies.get('access_token');
      return await axios
        .get('http://localhost:5000/user', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((resolve) => {
          const staticUrl = resolve.data.changedAvatar
            ? 'http://localhost:5000/' + resolve.data['avatar']
            : resolve.data.avatar;
          setDefaultURL(staticUrl);
        });
    };
    responseImage();
  }, [avatar]);

  useEffect(() => {
    const qrFunct = async () => {
      const accessToken = await Cookies.get('access_token');
      await axios
        .get('http://localhost:5000/twofactorAuth/register', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => setQrCode(res.data.qrcode));
    };
    qrFunct();
  }, []);

  const updateAvatar = async (event) => {
    event.preventDefault();
    const accessToken = await Cookies.get('access_token');
    const form = new FormData();
    form.append('image', event.target.files[0]);
    await axios
      .post('http://localhost:5000/user/upload', form, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setAvatar(res.data['avatar']);
      });
  };

  const handleUsername = async (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const updateUserName = async () => {
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

  const handle2FA = async (event) => {
    const accessToken = await Cookies.get('access_token');
    await axios
      .post(
        'http://localhost:5000/twofactorAuth/turnAuthOn',
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        setIs2FA(res.data.isTwoFactorAuthEnabled);
      });
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
              onChange={updateAvatar}
            />
            <label htmlFor="file">
              <img
                className={styles.imgAvatar}
                src={defaultURL}
                alt="user avatar"
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
          <button className={styles.btnUsername} onClick={handle2FA}>
            Enable 2FA
          </button>
          {/* <label className={styles.switch}>
            <input type="checkbox" onChange={handle2FA} checked />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label> */}
        </div>
        {is2FA && (
          <div>
            <p>Scan the QR code on your GOOGLE authenticator </p>
            <img src={qrCode} alt="qrCode" />
          </div>
        )}
      </div>
    </>
  );
}

export default Settings;
