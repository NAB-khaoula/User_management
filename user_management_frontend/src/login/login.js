import { useState } from 'react'
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

    return (
        <>
            <div className="card">
                <div className='contributorBox'>
                    <h1>
                        PONG 
                        CLASSIC
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
                        <a href='https://github.com/NAB-khaoula' className='devLink'>ME</a>
                        <a href='https://github.com/mojahid-belaman' className='devLink'>MB</a>
                        <a href='#' className='devLink'>SH</a>
                        <a href='#' className='devLink'>AB</a>
                    </div>
                </div>
                <div className="LoginBox">
                    <button className='LoginButton'>Login With 42 Intra</button>
                </div>
            </div>
        </>
    )
}

export default Login