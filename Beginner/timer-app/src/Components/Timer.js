import React, { useEffect, useState } from 'react';

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

  return (
    <div className="timer">
        <h1>Timer</h1>
        <div className="timer-display">
            <span className="time">{displayTime()}</span>
        </div>
        <div className="timer-controls">
            <button className="start-button" onClick={()=>setTimerStatus('running')}>Start</button>
            <button className="stop-button" onClick={()=>setTimerStatus('paused')}>Pause</button>
            <button className="reset-button" onClick={()=>setTimerStatus('stopped')}>Reset</button>
        </div>
    </div>
  );
};

export default Timer;