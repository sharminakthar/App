import React, { useState } from 'react';
import type { Reward } from '../types';
import RewardItem from './RewardItem';
import { PlusIcon } from './icons';

interface RewardSectionProps {
  rewards: Reward[];
  overallStreak: number;
  onUpdateReward: (tier: number, description: string) => void;
  onAddReward: (reward: { tier: number, description: string }) => void;
  onDeleteReward: (tier: number) => void;
}

const RewardSection: React.FC<RewardSectionProps> = ({ rewards, overallStreak, onUpdateReward, onAddReward, onDeleteReward }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTier, setNewTier] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tierNum = parseInt(newTier, 10);
    if (!isNaN(tierNum) && tierNum > 0 && newDescription.trim() !== '' && !rewards.some(r => r.tier === tierNum)) {
      onAddReward({ tier: tierNum, description: newDescription });
      setNewTier('');
      setNewDescription('');
      setIsAdding(false);
    } else if (rewards.some(r => r.tier === tierNum)) {
        alert("A reward for this streak tier already exists.");
    }
  };

  const sortedRewards = [...rewards].sort((a, b) => a.tier - b.tier);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-soft-purple-800 mb-4">My Achievement Journey</h2>
      <div className="space-y-4">
        {sortedRewards.map(reward => (
          <RewardItem 
            key={reward.tier} 
            reward={reward} 
            overallStreak={overallStreak}
            onUpdateReward={onUpdateReward}
            onDeleteReward={onDeleteReward}
          />
        ))}
      </div>
      
      {isAdding ? (
        <form onSubmit={handleAddSubmit} className="mt-6 space-y-3 p-4 border-t border-gray-200">
           <h3 className="font-semibold text-charcoal">Add a New Reward</h3>
           <div>
            <label htmlFor="reward-tier" className="block text-sm font-medium text-gray-700">Streak Days</label>
             <input
                id="reward-tier"
                type="number"
                value={newTier}
                onChange={(e) => setNewTier(e.target.value)}
                placeholder="e.g., 7"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-soft-purple-500 focus:border-soft-purple-500"
                required
            />
           </div>
           <div>
            <label htmlFor="reward-desc" className="block text-sm font-medium text-gray-700">Reward Description</label>
            <input
                id="reward-desc"
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="e.g., A new book"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-soft-purple-500 focus:border-soft-purple-500"
                required
            />
           </div>
           <div className="flex gap-2">
                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-charcoal bg-white hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gentle-pink-500 hover:bg-gentle-pink-600">Add Reward</button>
           </div>
        </form>
      ) : (
        <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 mt-4 py-2 px-4 bg-gray-100 text-charcoal font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
            <PlusIcon className="w-5 h-5"/>
            Add Custom Reward
        </button>
      )}

    </div>
  );
};

export default RewardSection;