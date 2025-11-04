'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { requestNotificationPermission, showNotification } from './utils/notifications';

const PomodoroPage: React.FC = () => {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [time, setTime] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [hasNotifiedWork, setHasNotifiedWork] = useState(false);
  const [hasNotifiedBreak, setHasNotifiedBreak] = useState(false);

  const mainColor = '#7B6EF2';
  const iconFill = 'black';

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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
      if (isWorkTime) {
        setNotification('Time for a break! ☕');
        showNotification('Break Time ☕', 'Take a short rest!');
        setIsWorkTime(false);
        setTime(BREAK_TIME);
        setIsRunning(true);
        setHasNotifiedWork(false);
        setHasNotifiedBreak(false); // reset flag break untuk sesi baru
      } else {
        setNotification('Break is over! Back to work! 💻');
        showNotification('Back to Work 💻', 'Focus and get things done!');
        setIsWorkTime(true);
        setTime(WORK_TIME);
        setIsRunning(false);
        setHasNotifiedWork(false);
        setHasNotifiedBreak(false); // reset flag work untuk sesi baru
      }

      notifTimeout = setTimeout(() => setNotification(null), 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (notifTimeout) clearTimeout(notifTimeout);
    };
  }, [isRunning, time, isWorkTime]);

  const toggleTimer = () => {
    setIsRunning((prev) => {
      const next = !prev;

      if (next) {
        // Notifikasi hanya muncul sekali per sesi
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

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundColor: '#F3F4F6',
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      }}
    >
      {/* Notification Box */}
      {notification && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl text-lg font-medium z-50 animate-bounce"
          style={{ backgroundColor: mainColor, color: 'white' }}
        >
          {notification}
        </div>
      )}

      <div
        className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center gap-8"
        style={{ width: 'clamp(300px, 90%, 500px)' }}
      >
        <h1
          className="text-4xl font-extrabold text-gray-800"
          style={{ color: mainColor }}
        >
          Pomodoro Timer
        </h1>

        {/* Work / Break Switch */}
        <div className="flex gap-4 p-2 rounded-lg bg-gray-100">
          <button
            className={`px-6 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
              isWorkTime
                ? 'text-white shadow-md'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            style={isWorkTime ? { backgroundColor: mainColor } : {}}
            onClick={() => {
              if (!isWorkTime && !isRunning) {
                setIsWorkTime(true);
                setTime(WORK_TIME);
                setNotification(null);
              }
            }}
          >
            Work
          </button>
          <button
            className={`px-6 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
              !isWorkTime
                ? 'text-white shadow-md'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            style={!isWorkTime ? { backgroundColor: mainColor } : {}}
            onClick={() => {
              if (isWorkTime && !isRunning) {
                setIsWorkTime(false);
                setTime(BREAK_TIME);
                setNotification(null);
              }
            }}
          >
            Break
          </button>
        </div>

        {/* Timer */}
        <div
          className="text-8xl font-extrabold tracking-wider flex items-center justify-center"
          style={{ color: mainColor }}
        >
          {formatTime(time)}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-6 mt-2">
          {isRunning && (
            <button
              onClick={resetTimer}
              className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl bg-white hover:bg-gray-100 transition-all duration-300"
            >
              <RotateCcw size={30} strokeWidth={2} color="red" />
            </button>
          )}
          <button
            onClick={toggleTimer}
            className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl bg-white hover:bg-gray-100 transition-all duration-300"
          >
            {isRunning ? (
              <Pause size={32} strokeWidth={0} fill={iconFill} />
            ) : (
              <Play size={32} strokeWidth={0} fill={iconFill} />
            )}
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-4">
          Focus and productivity with Doko Pomodoro.
        </p>
      </div>
    </div>
  );
};

export default PomodoroPage;
