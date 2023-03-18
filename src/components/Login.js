import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const LOGIN_URL = '/login'

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                {
                    'email': email,
                    'password': password
                })
            console.log(response);
            setAuth({ accessToken: response.data.accessToken, user: response.data.user });
            navigate('/dashboard');
        } catch (err) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 400) {
                setErrorMessage('Wrong Username or Password');
            } else if (err.response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
        }
    }

    return (
        <div className='form-wrapper'>
            <p className={errorMessage ? 'error-message' : 'display-none'}>{errorMessage}</p>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor='username'>
                    Email
                </label>
                <input
                    type='email'
                    value={email}
                    id='email'
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor='password'>
                    Password
                </label>
                <input
                    type='password'
                    value={password}
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button>Log in</button>
            </form>
            <p>Don't have an account? Sign up</p>
            <p>Forgot password? Reset password</p>

        </div>
    )
}

export default Login