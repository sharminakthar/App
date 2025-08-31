import React, { useState } from 'react';
import type { Reward } from '../types';
import { TrashIcon, RewardIcon } from './icons';

interface RewardItemProps {
  reward: Reward;
  overallStreak: number;
  onUpdateReward: (tier: number, description: string) => void;
  onDeleteReward: (tier: number) => void;
}

const RewardItem: React.FC<RewardItemProps> = ({ reward, overallStreak, onUpdateReward, onDeleteReward }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(reward.description);

  const handleSave = () => {
    onUpdateReward(reward.tier, description);
    setIsEditing(false);
  };

  const progress = Math.min((overallStreak / reward.tier) * 100, 100);

  return (
    <div className={`relative p-4 rounded-lg overflow-hidden transition-all duration-300 group ${reward.isUnlocked ? 'bg-warm-gold-100 border-warm-gold-400' : 'bg-gray-100 border-gray-300'} border`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${reward.isUnlocked ? 'bg-warm-gold-400' : 'bg-gray-300'}`}>
          <RewardIcon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-grow">
          <p className="font-bold text-charcoal">{reward.tier}-Day Streak Reward</p>
          {isEditing ? (
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-soft-purple-500 focus:border-soft-purple-500"
            />
          ) : (
            <p className="text-gray-600 italic">{reward.description || "Set a reward!"}</p>
          )}
           {reward.isUnlocked && reward.unlockedDate && (
             <p className="text-xs text-warm-gold-700 font-semibold mt-1">Unlocked on {new Date(reward.unlockedDate).toLocaleDateString()}</p>
          )}
        </div>
        <div className="flex-shrink-0">
          {isEditing ? (
            <button onClick={handleSave} className="text-sm text-white bg-gentle-pink-500 hover:bg-gentle-pink-600 px-2 py-1 rounded">Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-sm text-soft-purple-600 hover:underline">Edit</button>
          )}
        </div>
      </div>
      {!reward.isUnlocked && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-soft-purple-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-xs text-right text-gray-500 mt-1">{Math.floor(overallStreak)} / {reward.tier} days</p>
        </div>
      )}
      {!reward.isMandatory && (
        <button onClick={() => onDeleteReward(reward.tier)} aria-label={`Delete ${reward.tier}-day reward`} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <TrashIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default RewardItem;