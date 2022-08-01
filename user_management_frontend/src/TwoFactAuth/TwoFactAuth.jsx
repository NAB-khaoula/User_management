import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { ParticlesBackground } from '../particles/ParticlesBack';
import styles from './twoFactAuth.module.css';

function TwoFactAuth() {
  const [code, setCode] = useState('');

  const handleCode = (e) => {
    e.preventDefault();
    setCode(e.target.value);
  };

  const handleCodeClick = async (e) => {
    e.preventDefault();
    const accesToken = await Cookies.get('access_token');
    axios.post(
      'http://localhost:5000/twofactorAuth/turnOn',
      { code },
      {
        headers: { Authorization: `Bearer ${accesToken}` },
      }
    );
  };

  return (
    <>
      <ParticlesBackground />
      <div className={styles.box}>
        <div className={styles.container}>
          <input
            type="email"
            placeholder="What's your secret code"
            className={styles.twofactAuthInput}
            onChange={handleCode}
          ></input>
          <button onClick={handleCodeClick} className={styles.twofactAuthBtn}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default TwoFactAuth;
