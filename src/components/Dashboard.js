import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import TimeCounter from './TimeCounter';

function Dashboard() {
    const { auth, setAuth } = useAuth();
    const [counterActive, setCounterActive] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        setCounterActive(false);
        setAuth('');
        navigate('/');
    }

    return (
        <div>
            {counterActive && <TimeCounter userId={auth.user.id} handleLogout={handleLogout} />}
        </div>
    )
}

export default Dashboard