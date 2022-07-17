import { ParticlesBackground } from '../particles/ParticlesBack';
import './login.css';

import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const loginWithIntra = async () => {
  return await axios
    .get('http://localhost:3000/oauth', null, null)
    .then((data) => data);
};

const Login = () => {
  const [isAuthorized, setisAuthorized] = useState(false);
  const handleLoginWithIntra = async (e) => {
    e.preventDefault();
    const token = await loginWithIntra();
    token && setisAuthorized(true);
    console.log(token.data);
    //set token in cookies
  };

  // useEffect(() => {

  // })
  return (
    <>
      <ParticlesBackground />
      <div className="card">
        <div className="contributorBox">
          <h1>PONG CLASSIC</h1>
          <div className="field">
            <div className="ping"></div>
            <div className="pad"></div>
            <div className="pong"></div>
            <div className="ball"></div>
          </div>
          <h6>
            Designed and developed with <i className="fa-solid fa-heart"></i>{' '}
            by:
          </h6>
          <div className="dev">
            <a href="https://github.com/NAB-khaoula" className="devLink">
              a
            </a>
            <a href="https://github.com/mojahid-belaman" className="devLink">
              b
            </a>
            <a href="#" className="devLink">
              c
            </a>
            <a href="#" className="devLink">
              d
            </a>
          </div>
        </div>
        <div className="LoginBox">
          <button className="LoginButton" onClick={handleLoginWithIntra}>
            {/* {isAuthorized ? } */}
            Login With 42 Intra
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
