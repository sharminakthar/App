import React from 'react';
import type { Goal } from '../types';
import { CheckIcon, StarIcon, TrashIcon, ReorderIcon } from './icons';

interface GoalItemProps {
  goal: Goal;
  index: number;
  onToggleComplete: (id: string) => void;
  onDeleteGoal: (id: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal, index, onToggleComplete, onDeleteGoal, onDragStart, onDragEnter, onDragEnd, onDrop }) => {
  const categoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hygiene':
        return 'border-l-soft-purple-400';
      case 'self-care':
        return 'border-l-gentle-pink-400';
      case 'productivity':
        return 'border-l-warm-gold-400';
      default:
        return 'border-l-gray-400';
    }
  };

  return (
    <div 
      className={`flex items-center bg-white p-3 rounded-lg shadow-sm transition-all duration-300 border-l-4 group ${categoryColor(goal.category)} ${goal.isCompletedToday ? 'opacity-60' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex items-center flex-grow">
        <button
          onClick={() => onToggleComplete(goal.id)}
          aria-label={`Mark ${goal.name} as complete`}
          className={`w-10 h-10 min-w-10 rounded-full flex items-center justify-center mr-4 transition-colors duration-200 ${goal.isCompletedToday ? 'bg-gentle-pink-500 text-white' : 'bg-gray-200 text-gray-400 hover:bg-gentle-pink-200'}`}
        >
          <CheckIcon className="w-6 h-6" />
        </button>
        <div className="flex-grow">
          <p className={`font-semibold text-charcoal ${goal.isCompletedToday ? 'line-through' : ''}`}>{goal.name}</p>
          <p className="text-sm text-gray-500">{goal.category} {goal.isCompulsory && <span className="text-red-500 font-bold">*</span>}</p>
        </div>
        <div className="flex items-center space-x-2 text-warm-gold-500">
          <StarIcon className="w-5 h-5" />
          <span className="font-bold text-lg">{goal.currentStreak}</span>
        </div>
      </div>
       <div className="flex items-center ml-4">
        <button onClick={() => onDeleteGoal(goal.id)} aria-label={`Delete goal: ${goal.name}`} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <TrashIcon className="w-5 h-5" />
        </button>
        <div className="cursor-grab ml-2 text-gray-400">
            <ReorderIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default GoalItem;