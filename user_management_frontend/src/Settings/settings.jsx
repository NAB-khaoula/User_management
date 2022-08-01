import React, { useEffect } from 'react';
import { ParticlesBackground } from '../particles/ParticlesBack';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import styles from './settings.module.css';

function Settings(props) {
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [defaultURL, setDefaultURL] = useState(null);
  const [qrCode, setQrCode] = useState();
  const [is2FA, setIs2FA] = useState(false);

  useEffect(() => {
    // console.log(props.user);
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
          setIs2FA(resolve.data.isTwoFactorAuthEnabled);
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
        console.log(res.data.isTwoFactorAuthEnabled);
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
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter userName"
            className={styles.userInput}
            onChange={handleUsername}
          />
          <button className={styles.btnDef} onClick={updateUserName}>
            Edit
          </button>
        </div>
        <div className={styles.twoFactorAuth}>
          <label>ENABLE TWO-FACTOR AUTHENTICATION</label>
          <button className={styles.btnDef} onClick={handle2FA}>
            {is2FA ? 'Disable' : 'Enable'}
          </button>
        </div>
        {is2FA && (
          <div className={styles.qrCode}>
            <p>Scan the QR code on your authenticator </p>
            <img src={qrCode} alt="qrCode" />
          </div>
        )}
      </div>
    </>
  );
}

export default Settings;
