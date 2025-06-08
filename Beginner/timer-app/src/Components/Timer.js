import React, { useEffect, useState } from 'react';
// import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';

const Timer = () => {

const [timerStatus, setTimerStatus] = useState('stopped');
const [time, setTime] = useState(0);

useEffect(() => {
    let interval = null;
    if (timerStatus === 'running') {
        interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
        }, 1000);
    } else if (timerStatus=== 'paused') {
        clearInterval(interval);
    }
    else{
        clearInterval(interval);
        setTime(0);
    }
    
    return () => clearInterval(interval);
}, [timerStatus]);

const displayTime = () => {
    const sec = time % 60;
    const min = Math.floor(time / 60) % 60;

    const timeFormat = `${min<10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
        
    return timeFormat;
    
}

const buttonDisplay = () => {
    if (timerStatus === 'stopped') {  
        return (
            <>
                <button className="start-button" onClick={() => setTimerStatus('running')}>
                <FontAwesomeIcon icon={faPlay} />
                </button>
            </>
        );  
    }
    else{
        return (
            <>
                <button className="reset-button" onClick={() => setTimerStatus('stopped')}>
                <FontAwesomeIcon icon={faRedo} />
                </button>
                <button className="pause-button" onClick={() => setTimerStatus((currentStatus) => currentStatus === 'running' ? 'paused' : 'running')}>
                    {
                        timerStatus === 'running' ? 
                        <FontAwesomeIcon icon={faPause} /> : 
                        <FontAwesomeIcon icon={faPlay} />
                    }
                </button>
            </>
        );
    }
}

  return (
    <div className="timer">
        <h1>Timer</h1>
        <div className="timer-display">
            <span className="time">{displayTime()}</span>
            <hr />
        </div>
        <div className="timer-controls">
            {buttonDisplay()}
        </div>
    </div>
  );
};

export default Timer;