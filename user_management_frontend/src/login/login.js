import { useRef , useState, useEffect } from 'react'

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
            <button className=''></button>
        </>
    )
}

export default Login