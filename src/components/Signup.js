import React, { useState, useEffect } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [validUsername, setValidUsername] = useState('');
    const [validPwd, setValidPwd] = useState('');
    const [validPwdMatch, setValidPwdMatch] = useState('');

    const passwordRegex = /^(?=.*\d).{6,24}$/       // between 6 and 24 characters, at least 1 number
    const userRegex = /^[A-z][A-z0-9-_]{4,23}$/;

    useEffect(() => {
        setValidUsername(userRegex.test(username));
    }, [username]);

    useEffect(() => {
        setValidPwd(passwordRegex.test(password));
        setValidPwdMatch(password === passwordMatch)
    }, [password, passwordMatch]);

    useEffect(() => {
        setErrorMessage('');
    }, [username, password, passwordMatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordRegex.test(password) || userRegex.test(username)) {
            setErrorMessage('Password must be between 6 and 24 characters, and contain at least one number. Username must be between 4 and 24 characters')
            return;
        }
    }

    return (
        <div className='form-wrapper'>
            <p className={errorMessage ? 'error-message' : 'display-none'}>{errorMessage}</p>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor='username'>
                    Username
                    <FontAwesomeIcon icon={faCheck} className={validUsername ? "display-font-awesome" : "display-none"} />
                    <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "display-none" : "display-font-awesome"} />
                </label>
                <input
                    type='text'
                    value={username}
                    id='username'
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
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
                <button disabled={!validUsername || !validPwd || !validPwdMatch ? true : false}>Sign Up</button>
            </form>
            <p>Already have an account? Log in</p>

        </div>
    )
}

export default Signup