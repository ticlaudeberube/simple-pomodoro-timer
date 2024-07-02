// This is the main component of the Pomodoro timer. 
// It uses useState, useEffect, useRef, and useCallback. 
// It imports TimerDisplay, Controls, LengthSetting, and Alert. 
// The states include sessionLength, breakLength, currentMode, prevModeRef, currentTime, isRunning, and showAlert. 
// The default session length is 25 minutes, the break length is 5 minutes, and the default mode is 'session'.

'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import TimerDisplay from './timer-display';
import Controls from './controls';
import LengthSetting from './length-settings';
import Alert from './alert';


const PomodoroTimer = () => {
    const DEFAULT_SESSION_LENGTH = 25;
    const DEFAULT_BREAK_LENGTH = 5;
    const DEFAULT_SESSION_LENGTH_IN_SECONDS = 60;
    const MAX_SESSION_LENGTH = 60;
    const MAX_BREAK_TIME=30;
    const SESSION = 'session';
    const BREAK = 'break';


    const [sessionLength, setSessionLength] = useState<number>(DEFAULT_SESSION_LENGTH);
    const [breakLength, setBreakLength] = useState<number>(DEFAULT_BREAK_LENGTH);
    const [currentMode, setCurrentMode] = useState<typeof SESSION | typeof BREAK>(SESSION);
    const prevModeRef = useRef<typeof SESSION | typeof BREAK>(SESSION);
    const [currentTime, setCurrentTime] = useState<number>(sessionLength * DEFAULT_SESSION_LENGTH_IN_SECONDS);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentTime(prevTime => {
        if (prevTime === 0) {
          setShowAlert(true);
          setIsRunning(false);
          switchMode();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentMode, sessionLength, breakLength]);

    useEffect(() => {
        prevModeRef.current = currentMode;
    }, [currentMode]);

    const switchMode = useCallback(() => {
        const nextMode = currentMode === SESSION ? BREAK : SESSION;
        const nextTime = (nextMode === SESSION ? sessionLength : breakLength) * DEFAULT_SESSION_LENGTH_IN_SECONDS;
        setCurrentMode(nextMode);
        setCurrentTime(nextTime);
    }, [sessionLength, breakLength]);

    const handleStartStop = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
        setAlertMessage('');
        showAlert && setShowAlert(false);
    };

    const handleReset = () => {
        setAlertMessage('');
        setIsRunning(false);
        setCurrentMode(SESSION);
        setCurrentTime(DEFAULT_SESSION_LENGTH * DEFAULT_SESSION_LENGTH_IN_SECONDS);
        setSessionLength(DEFAULT_SESSION_LENGTH);
        setBreakLength(DEFAULT_BREAK_LENGTH);
        setShowAlert(false);
    };

    const handleCloseAlert = useCallback(() => {
        setShowAlert(false);
    }, [setShowAlert]);

    const getAlertMessage = () => {
        const previousMode = prevModeRef.current;
        const previousModeComplete = previousMode === SESSION ? 'Time for a break!' : 'Time to get back to work!';
        return previousModeComplete;
    }

    const adjustLength = (type: 'session' | 'break', adjustment: number) => {
        if (type === 'session') {
            if (sessionLength === 1 && adjustment === -1) {
                setAlertMessage('Min sesion reached');
                return;
            } else if (sessionLength ===  DEFAULT_SESSION_LENGTH && adjustment === 1) {
                setAlertMessage('Max session reached');
                return;
            } else {
                setAlertMessage('');
            }
            setSessionLength(prev => Math.max(1, Math.min(prev + adjustment, 60)));
            if (currentMode === 'session' && !isRunning) {
                setCurrentTime((sessionLength + adjustment) * 60)
            }
        } else {
            setBreakLength(prev => Math.max(1, Math.min(prev + adjustment, 30)));
            setAlertMessage('');
        }
    }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
        {showAlert && <Alert message={getAlertMessage()} onClose={handleCloseAlert} />}
        <TimerDisplay time={currentTime} mode={currentMode} />
        <Controls isRunning={isRunning} onStartPause={handleStartStop} onReset={handleReset} />
        <div className="mt-6 mb-6 grid grid-cols-2 gap-4">
            <LengthSetting 
                title="Session Length"
                length={sessionLength}
                onIncrease={() => adjustLength('session', 1)}
                onDecrease={() => adjustLength('session', -1)}
                isDisabled={isRunning}
            />
            <LengthSetting 
                title="Break Length"
                length={breakLength}
                onIncrease={() => adjustLength('break', 1)}
                onDecrease={() => adjustLength('break', -1)}
                isDisabled={isRunning}
            />
        </div>
        <div>
            <div className="p-3 text-center text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert"
                style={{visibility: !alertMessage.length ? 'hidden' : 'visible'}}>
                <span className="font-medium">{alertMessage}</span>
            </div>
        </div>
    </div>);
};

export default PomodoroTimer;