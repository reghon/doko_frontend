'use client';

import { useState, useEffect } from 'react';
import { requestNotificationPermission, showNotification } from './utils/notifications';

export const useTimerLogic = (initialWork = 25, initialBreak = 5) => {
  const [time, setTime] = useState(initialWork * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  const [hasNotifiedWork, setHasNotifiedWork] = useState(false);
  const [hasNotifiedBreak, setHasNotifiedBreak] = useState(false);

  const [customWork, setCustomWork] = useState(initialWork);
  const [customBreak, setCustomBreak] = useState(initialBreak);

  const WORK_TIME = customWork * 60;
  const BREAK_TIME = customBreak * 60;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return h > 0
      ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
          .toString()
          .padStart(2, '0')}`
      : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatMinuteDisplay = (minutes: number) => {
    if (minutes >= 60) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return m > 0 ? `${h}h ${m}m` : `${h}h`;
    }
    return `${minutes}m`;
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let notifTimeout: NodeJS.Timeout | null = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      setIsRunning(false);

      if (isWorkTime) {
        setNotification('Time for a break! ☕');
        showNotification('Break Time ☕', 'Take a short rest!');
        setIsWorkTime(false);
        setTime(BREAK_TIME);
        setIsRunning(true);
        setHasNotifiedWork(false);
      } else {
        setNotification('Break is over! Back to work! 💻');
        showNotification('Back to Work 💻', 'Focus and get things done!');
        setIsWorkTime(true);
        setTime(WORK_TIME);
        setIsRunning(false);
        setHasNotifiedBreak(false);
      }

      notifTimeout = setTimeout(() => setNotification(null), 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (notifTimeout) clearTimeout(notifTimeout);
    };
  }, [isRunning, time, isWorkTime, WORK_TIME, BREAK_TIME]);

  const toggleTimer = () => {
    setIsRunning((prev) => {
      const next = !prev;

      if (next) {
        if (isWorkTime && !hasNotifiedWork) {
          showNotification('Pomodoro Started 💪', 'Focus time begins!');
          setHasNotifiedWork(true);
        } else if (!isWorkTime && !hasNotifiedBreak) {
          showNotification('Break Started ☕', 'Relax and recharge!');
          setHasNotifiedBreak(true);
        }
      }
      return next;
    });
    setNotification(null);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkTime(true);
    setTime(WORK_TIME);
    setNotification(null);
    setHasNotifiedWork(false);
    setHasNotifiedBreak(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'work' | 'break') => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;

    let minutes = value;
    if (value >= 60) {
      const hours = Math.floor(value / 60);
      const remainMinutes = value % 60;
      minutes = hours * 60 + remainMinutes;

      const readable = remainMinutes > 0 ? `${hours} jam ${remainMinutes} menit` : `${hours} jam`;
      setNotification(`Durasi diubah menjadi ${readable}`);
      setTimeout(() => setNotification(null), 4000);
    }

    minutes = Math.max(1, minutes);

    if (type === 'work') {
        setCustomWork(minutes);
        if (isWorkTime && !isRunning) setTime(minutes * 60);
    } else {
        setCustomBreak(minutes);
        if (!isWorkTime && !isRunning) setTime(minutes * 60);
    }
  };

  return {
    // State
    time,
    isRunning,
    isWorkTime,
    notification,
    customWork,
    customBreak,

    // Function helpers
    formatTime,
    formatMinuteDisplay,
    toggleTimer,
    resetTimer,
    handleTimeChange,

    // Setter expose
    setNotification,
    setIsWorkTime,
    setTime,
    setCustomWork,
    setCustomBreak,
  };
};
