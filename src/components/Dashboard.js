import React from 'react';
import useAuth from '../hooks/useAuth';

function Dashboard() {
    const { auth } = useAuth();

    console.log(auth);

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard