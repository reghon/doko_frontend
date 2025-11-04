'use client';

import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Settings, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useTimerLogic } from './timerLogic';

const PomodoroPage: React.FC = () => {
  const mainColor = '#7B6EF2';
  const iconFill = 'black';
  const [showSettings, setShowSettings] = useState(false);

  const {
    time,
    isRunning,
    isWorkTime,
    notification,
    customWork,
    customBreak,
    formatTime,
    toggleTimer,
    resetTimer,
    handleTimeChange,
    setNotification,
    setIsWorkTime,
    setTime,
  } = useTimerLogic(25, 5);

  const SettingsModal = () => (
    <div
      className={`fixed inset-0 bg-gray-900/40 backdrop-blur-md z-40 flex items-center justify-center transition-opacity duration-300 ${
        showSettings ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={() => setShowSettings(false)}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-11/12 max-w-md transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-2 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Timer Settings</h2>
          <button
            onClick={() => setShowSettings(false)}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Input Work */}
          <div className="flex justify-between items-center p-3 rounded-lg bg-gray-100">
            <label className="text-gray-700 font-medium">Work (min)</label>
            <input
              type="number"
              min="1"
              value={customWork}
              onChange={(e) => handleTimeChange(e, 'work')}
              className="w-20 text-center p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6EF2]"
              disabled={isRunning}
            />
          </div>

          {/* Input Break */}
          <div className="flex justify-between items-center p-3 rounded-lg bg-gray-100">
            <label className="text-gray-700 font-medium">Break (min)</label>
            <input
              type="number"
              min="1"
              value={customBreak}
              onChange={(e) => handleTimeChange(e, 'break')}
              className="w-20 text-center p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6EF2]"
              disabled={isRunning}
            />
          </div>

          <div className="flex justify-end pt-4 border-t mt-6">
            <button
              onClick={() => {
                setShowSettings(false);
                setNotification('Pengaturan waktu telah disimpan!');
              }}
              className="px-6 py-2 rounded-lg text-white font-semibold shadow-md hover:shadow-lg"
              style={{ backgroundColor: mainColor }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SettingsModal />
      <Navbar />

      <div className="flex justify-end p-4 md:px-8 sticky top-16 z-30 bg-[#F3F4F6] w-full">
        <button
          onClick={() => setShowSettings(true)}
          className={`p-3 rounded-full transition-all duration-300 shadow-md ${
            showSettings
              ? 'bg-gray-600 text-white'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
          } transform ${showSettings ? 'rotate-90' : 'rotate-0'}`}
        >
          <Settings size={24} color={showSettings ? 'white' : 'currentColor'} />
        </button>
      </div>

      <main
        className="flex flex-col items-center justify-center p-6 flex-grow"
        style={{ backgroundColor: '#F3F4F6', fontFamily: 'Inter, sans-serif' }}
      >
        {notification && (
          <div
            className="fixed top-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl text-lg font-medium z-50 animate-bounce"
            style={{ backgroundColor: mainColor, color: 'white' }}
          >
            {notification}
          </div>
        )}

        <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center gap-8" style={{ width: 'clamp(300px, 90%, 500px)' }}>
          <h1 className="text-4xl font-extrabold" style={{ color: mainColor }}>
            Pomodoro Timer
          </h1>

          <div className="flex gap-4 p-2 rounded-lg bg-gray-100">
            <button
              className={`px-6 py-2 rounded-md text-lg font-medium transition-colors ${
                isWorkTime ? 'text-white shadow-md' : 'text-gray-700 hover:text-gray-900'
              }`}
              style={isWorkTime ? { backgroundColor: mainColor } : {}}
              onClick={() => {
                if (!isRunning) {
                  setIsWorkTime(true);
                  setTime(customWork * 60);
                  setNotification(null);
                }
              }}
              disabled={isRunning}
            >
              Work
            </button>
            <button
              className={`px-6 py-2 rounded-md text-lg font-medium transition-colors ${
                !isWorkTime ? 'text-white shadow-md' : 'text-gray-700 hover:text-gray-900'
              }`}
              style={!isWorkTime ? { backgroundColor: mainColor } : {}}
              onClick={() => {
                if (!isRunning) {
                  setIsWorkTime(false);
                  setTime(customBreak * 60);
                  setNotification(null);
                }
              }}
              disabled={isRunning}
            >
              Break
            </button>
          </div>

          <div className="text-8xl font-extrabold" style={{ color: mainColor }}>
            {formatTime(time)}
          </div>

          <div className="flex gap-6 mt-2">
            {isRunning && (
              <button
                onClick={resetTimer}
                className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl bg-white hover:bg-gray-100"
              >
                <RotateCcw size={30} color="red" />
              </button>
            )}
            <button
              onClick={toggleTimer}
              className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl bg-white hover:bg-gray-100"
            >
              {isRunning ? (
                <Pause size={32} fill={iconFill} />
              ) : (
                <Play size={32} fill={iconFill} />
              )}
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            Focus and productivity with Doko Pomodoro.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PomodoroPage;