'use client'; // This directive is necessary for client-side interactivity in App Router

import React, { useState, useEffect } from 'react';

const PomodoroPage: React.FC = () => {
  const WORK_TIME = 25 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes

  const [time, setTime] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [notification, setNotification] = useState<string | null>(null); // State for custom notification

  // Function to format time into MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Effect hook for the timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let notificationTimeout: NodeJS.Timeout | null = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Time is up, switch modes
      setIsRunning(false); // Pause when time runs out
      if (isWorkTime) {
        setNotification("Time for a break! ☕"); // Replaced alert with state update
        setIsWorkTime(false);
        setTime(BREAK_TIME);
      } else {
        setNotification("Break is over! Back to work! 💻"); // Replaced alert with state update
        setIsWorkTime(true);
        setTime(WORK_TIME);
      }
      
      // Clear notification after 5 seconds
      notificationTimeout = setTimeout(() => setNotification(null), 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (notificationTimeout) clearTimeout(notificationTimeout);
    };
  }, [isRunning, time, isWorkTime]);

  const toggleTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
    // Clear any persistent notification when starting/pausing
    setNotification(null); 
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkTime(true);
    setTime(WORK_TIME);
    setNotification(null);
  };

  // Main color for the theme
  const mainColor = '#7B6EF2'; // Your requested main color

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      // Added explicit Inter font family and fallbacks
      style={{ 
        backgroundColor: '#F3F4F6',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
      }} 
    >
      {/* Notification Box (Replaces alert()) */}
      {notification && (
        <div 
            className="fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl text-lg font-medium z-50 transition-opacity duration-500 ease-out animate-bounce"
            style={{ backgroundColor: mainColor, color: 'white' }}
        >
            {notification}
        </div>
      )}

      <div
        className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center gap-8"
        style={{ width: 'clamp(300px, 90%, 500px)' }} // Responsive width
      >
        {/* Header */}
        <h1
          className="text-4xl font-extrabold text-gray-800"
          style={{ color: mainColor }}
        >
          Pomodoro Timer
        </h1>

        {/* Mode Selector */}
        <div className="flex gap-4 p-2 rounded-lg bg-gray-100">
          <button
            className={`px-6 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
              isWorkTime
                ? 'text-white shadow-md'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            style={isWorkTime ? { backgroundColor: mainColor } : {}}
            onClick={() => {
              // Only allow switching modes if the timer is not running
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
              // Only allow switching modes if the timer is not running
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

        {/* Timer Display */}
        <div
          className="text-8xl font-extrabold tracking-wider rounded-xl flex items-center justify-center"
          style={{
            color: mainColor,
          }}
        >
          {formatTime(time)}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4">
          <button
            className="px-8 py-3 rounded-full text-white text-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            style={{ backgroundColor: mainColor }}
            onClick={toggleTimer}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            className="px-8 py-3 rounded-full text-gray-700 text-xl font-semibold border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-400 transition-all duration-300"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-gray-500 text-sm mt-4">
          Focus and productivity with Doko Pomodoro.
        </p>
      </div>
    </div>
  );
};

export default PomodoroPage;
