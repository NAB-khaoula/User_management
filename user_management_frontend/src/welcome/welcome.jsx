import React from 'react';
import { ParticlesBackground } from '../particles/ParticlesBack';

import styles from './welcome.module.css';

function Welcome() {
  return (
    <div className={styles.welcome}>
      <ParticlesBackground />
      <h1 className={styles.title}>Welcome to Pong Game</h1>
    </div>
  );
}

export default Welcome;
