import React from 'react';
import type { Goal } from '../types';
import { StarIcon, SparklesIcon } from './icons';

interface StreakTrackerProps {
  goals: Goal[];
  overallStreak: number;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ goals, overallStreak }) => {
  const completedGoals = goals.filter(g => g.isCompletedToday).length;
  const totalGoals = goals.length;
  const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-soft-purple-800 mb-4">Daily Progress</h2>
      <div className="flex items-center justify-between text-lg font-semibold mb-2">
        <span className="text-charcoal">Tasks Completed</span>
        <span className="text-soft-purple-700">{completedGoals} / {totalGoals}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
        <div
          className="bg-gentle-pink-400 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-center items-center gap-4 text-center mt-6">
        <div className="flex items-center gap-2 text-warm-gold-500">
            <StarIcon className="w-8 h-8"/>
            <div>
                <p className="text-3xl font-bold">{overallStreak}</p>
                <p className="text-sm text-gray-500">Day Streak</p>
            </div>
        </div>
        {progress === 100 && (
            <div className="flex items-center gap-2 text-gentle-pink-500 animate-pulse">
                <SparklesIcon className="w-8 h-8"/>
                <div>
                    <p className="text-xl font-bold">All Done!</p>
                    <p className="text-sm text-gray-500">Amazing work!</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default StreakTracker;