import { useState, useEffect, useCallback } from 'react';

export const useBruteForceProtection = (maxAttempts: number = 3, lockoutDurationSeconds: number = 30) => {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (lockoutTime > 0) {
      timer = setInterval(() => {
        setLockoutTime((prev) => prev - 1);
      }, 1000);
    } else if (lockoutTime === 0 && failedAttempts >= maxAttempts) {
      setFailedAttempts(0); // Reset after lockout expires
    }
    return () => clearInterval(timer);
  }, [lockoutTime, failedAttempts, maxAttempts]);

  const handleFailure = useCallback(() => {
    setFailedAttempts(prev => {
      const newAttempts = prev + 1;
      if (newAttempts >= maxAttempts) {
        setLockoutTime(lockoutDurationSeconds);
        setErrorMsg(`Too many failed attempts. Account locked for ${lockoutDurationSeconds} seconds.`);
      } else {
        setErrorMsg(`Invalid credentials. ${maxAttempts - newAttempts} attempts remaining.`);
      }
      return newAttempts;
    });
  }, [maxAttempts, lockoutDurationSeconds]);

  const clearError = useCallback(() => {
    setErrorMsg('');
  }, []);
  
  const setCustomError = useCallback((msg: string) => {
    setErrorMsg(msg);
  }, []);

  return {
    isLocked: lockoutTime > 0,
    lockoutTime,
    errorMsg,
    handleFailure,
    clearError,
    setCustomError
  };
};
