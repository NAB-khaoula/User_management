import { useState } from 'react'
import { ParticlesBackground } from '../particles/ParticlesBack';
import './login.css'

const Login = () => {
    const adminUser = {
        name: 'admin',
        email: 'admin@email.com',
    }

    const [user, setUser] = useState({name:'something', email:'something'});

    const [error, setError] = useState('');

    const login = details => {
        console.log(details);
    }

    const logout = () => {
        console.log('logout');
    }

    const loginWithIntra = () => {
        
    }

    return (
        <>
            <ParticlesBackground />
            <div className="card">
                <div className='contributorBox'>
                    <h1>
                        PONG CLASSIC
                    </h1>
                    <div class="field">
                        <div class="ping"></div>
                        <div className="pad"></div>
	                    <div class="pong"></div>
	                    <div class="ball"></div>
                    </div>
                    <h6>
                        Designed and developed with <i className="fa-solid fa-heart"></i> by:
                    </h6>
                    <div className='dev'>
                        <a href='https://github.com/NAB-khaoula' className='devLink'></a>
                        <a href='https://github.com/mojahid-belaman' className='devLink'></a>
                        <a href='#' className='devLink'></a>
                        <a href='#' className='devLink'></a>
                    </div>
                </div>
                <div className="LoginBox">
                    <button className='LoginButton' onClick={loginWithIntra}>Login With 42 Intra</button>
                </div>
            </div>
        </>
    )
}

export default Login