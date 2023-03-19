import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';

export default function TimeCounter({ userId, handleLogout }) {
    const [startTime, setStartTime] = useState(null);
    const [pausedTime, setPausedTime] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [totalTimeWorked, setTotalTimeWorked] = useState(null);
    const [showGraphics, setShowGraphics] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setTotalTimeWorked(data.totalTimeWorked);
            })
            .catch((error) => console.error(error));
    }, [userId]);

    useEffect(() => {
        let interval = null;

        if (startTime && !pausedTime) {
            interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                setTimeElapsed(elapsed);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [startTime, pausedTime]);

    const handleStart = () => {
        setStartTime(Date.now());
        setPausedTime(null);
        setShowGraphics(true);
    };

    const handlePauseResume = () => {
        if (pausedTime) {
            const pauseDuration = Date.now() - pausedTime;
            setStartTime((prevStartTime) => prevStartTime + pauseDuration);
            setPausedTime(null);
        } else {
            setPausedTime(Date.now());
        }
    };

    const handleStop = () => {
        const timeWorked = timeElapsed + (totalTimeWorked || 0);
        console.log(timeWorked)
        setShowGraphics(false);

        fetch(`http://localhost:3000/posts/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                totalTimeWorked: timeWorked,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setTotalTimeWorked(data.totalTimeWorked);
                setStartTime(null);
                setTimeElapsed(0);
                setPausedTime(null);
            })
            .catch((error) => console.error(error));
    };




    const formatTime = (time) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStopAndLogout = () => {
        handleStop();
        handleLogout();
    }

    return (
        <div className='counter'>
            <h3> Worktime Tracker Deluxe</h3>
            {!startTime && (
                <button onClick={handleStart}>Start</button>
            )}
            {startTime && !pausedTime && (
                <button onClick={handlePauseResume}>Pause</button>
            )}
            {startTime && pausedTime && (
                <button onClick={handlePauseResume}>Resume</button>
            )}
            <button onClick={handleStop}>Stop</button>
            {startTime && <div>{formatTime(timeElapsed)}</div>}
            {showGraphics ?
                (
                    <div>
                        <div><FontAwesomeIcon icon={faHourglass} size='4x' /></div>
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                ) : null}
            <div>Total time worked: {formatTime(totalTimeWorked)} </div>
            <button onClick={handleStopAndLogout}>Log out</button>
        </div>
    );
}