import { ParticlesBackground } from '../particles/ParticlesBack';
import styles from './login.module.css';

const Login = () => {
  return (
    <>
      <ParticlesBackground />
      <div className={styles.card}>
        <div className={styles.contributorBox}>
          <h1>PONG CLASSIC</h1>
          <div className={styles.field}>
            <div className={styles.ping}></div>
            <div className={styles.pad}></div>
            <div className={styles.pong}></div>
            <div className={styles.ball}></div>
          </div>
          <h6>
            Designed and developed with <i className="fa.solid fa-heart"></i>{' '}
            by:
          </h6>
          <div className={styles.dev}>
            <a href="https://github.com/NAB-khaoula" className={styles.devLink}>
              a
            </a>
            <a
              href="https://github.com/mojahid-belaman"
              className={styles.devLink}
            >
              b
            </a>
            <a href="#" className={styles.devLink}>
              c
            </a>
            <a href="#" className={styles.devLink}>
              d
            </a>
          </div>
        </div>
        <div className={styles.LoginBox}>
          <a className={styles.LoginButton} href="http://localhost:5000/oauth">
            Login With 42 Intra
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
