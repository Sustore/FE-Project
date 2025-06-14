import React, { useEffect, useState } from 'react';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';
import TimerButton from './TimerButton';

const Timer = () => {

const [timerStatus, setTimerStatus] = useState('stopped');
const [time, setTime] = useState(0);

useEffect(() => {
    let interval = null;
    if (timerStatus === 'running') {
        interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
        }, 1000);
    } else if (timerStatus=== 'stopped') {
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
            <hr />
        </div>
        <div className="timer-controls">
            {
                timerStatus === 'stopped' ?
                <TimerButton 
                    className="start-button"
                    onClick={() => setTimerStatus('running')}
                    datatTooltip="Start Timer"
                    dataTooltipSize="large"
                    arialAbel="Start Timer"
                    icon={faPlay}
                />
                :
                <>
                <TimerButton
                    className="reset-button"
                    onClick={() => setTimerStatus('stopped')}
                    datatTooltip="Reset Timer"
                    dataTooltipSize="small"
                    arialAbel="Reset Timer"
                    icon={faRedo}
                />
                <TimerButton
                    className="pause-button"
                    onClick={() => setTimerStatus((currentStatus) => currentStatus === 'running' ? 'paused' : 'running')}
                    datatTooltip={timerStatus === 'running' ? 'Pause Timer' : 'Resume Timer'}
                    dataTooltipSize="small"
                    arialAbel={timerStatus === 'running' ? 'Pause Timer' : 'Resume Timer'}
                    icon={timerStatus === 'running' ? faPause : faPlay}
                />
                </>
            }
        </div>
    </div>
  );
};

export default Timer;