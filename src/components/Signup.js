import React, { useState, useEffect } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [validEmail, setValidEmail] = useState('');
    const [validPwd, setValidPwd] = useState('');
    const [validPwdMatch, setValidPwdMatch] = useState('');

    const passwordRegex = /^(?=.*\d).{6,24}$/       // between 6 and 24 characters, at least 1 number
    const userRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const REGISTER_URL = '/register'
    const POSTS_URL = '/posts'

    useEffect(() => {
        setValidEmail(userRegex.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(passwordRegex.test(password));
        setValidPwdMatch(password === passwordMatch)
    }, [password, passwordMatch]);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password, passwordMatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordRegex.test(password) || !userRegex.test(email)) {
            setErrorMessage('Password must be between 6 and 24 characters, and contain at least one number. Username must be between 4 and 24 characters')
            return;
        };
        try {
            const response = await axios.post(REGISTER_URL, {
                'email': email,
                'password': password
            })
            console.log(response)
            const response2 = await axios.post(POSTS_URL, {
                'id': response.data.user.id,
                'totalTimeWorked': null
            })
            console.log(response2)
        } catch (err) {
            if (!err?.response) {
                setErrorMessage('No server response')
            }
            else if (err.response?.status === 400) {
                setErrorMessage('Account with this email already exists');
            } else {
                setErrorMessage('Registration Failed')
            }
            console.log(err.response)
        }
    }

    return (
        <div className='form-wrapper'>
            <h3> Worktime Tracker Deluxe</h3>
            <p className={errorMessage ? 'error-message' : 'display-none'}>{errorMessage}</p>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor='email'>
                    Email
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "display-font-awesome" : "display-none"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "display-none" : "display-font-awesome"} />
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
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "display-font-awesome" : "display-none"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "display-none" : "display-font-awesome"} />
                </label>
                <input
                    type='password'
                    value={password}
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor='passwordmatch'>
                    Confirm Password
                    <FontAwesomeIcon icon={faCheck} className={validPwdMatch && passwordMatch ? "display-font-awesome" : "display-none"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwdMatch || !passwordMatch ? "display-none" : "display-font-awesome"} />
                </label>
                <input
                    type='password'
                    value={passwordMatch}
                    id='passwordmatch'
                    onChange={(e) => setPasswordMatch(e.target.value)}
                    required
                />
                <button disabled={!validEmail || !validPwd || !validPwdMatch ? true : false}>Sign Up</button>
            </form>
            <p>Already have an account? <Link to='/login'>Log in</Link> </p>

        </div>
    )
}

export default Signup