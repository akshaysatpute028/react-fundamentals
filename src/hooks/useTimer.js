import { useEffect, useRef, useState, useCallback } from 'react';

export const useTimer = (initialTime = 300) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, time]);

  const toggle = useCallback(() => setIsActive(prev => !prev), []);

  const reset = useCallback(() => {
    setIsActive(false);
    setTime(initialTime);
  }, [initialTime]);
  //Reset button function
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return { time, isActive, toggle, reset, formatTime };
};
