import React, { useState, useEffect } from 'react';
import type { Reward } from '../types';
import { SparklesIcon, RewardIcon } from './icons';

interface RewardModalProps {
  reward: Reward | null;
  onClose: () => void;
}

const RewardModal: React.FC<RewardModalProps> = ({ reward, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reward) {
      const timer = setTimeout(() => setShow(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [reward]);

  if (!reward) return null;
  
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`relative bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all duration-300 ease-out ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-warm-gold-400 p-4 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <RewardIcon className="w-16 h-16 text-white" />
        </div>
        
        <SparklesIcon className="absolute top-4 right-4 w-8 h-8 text-warm-gold-400 opacity-80 animate-ping"/>
        <SparklesIcon className="absolute top-10 left-4 w-6 h-6 text-warm-gold-300 opacity-70 animate-pulse delay-200"/>
        <SparklesIcon className="absolute bottom-4 left-8 w-5 h-5 text-gentle-pink-300 opacity-70 animate-pulse delay-500"/>
        <SparklesIcon className="absolute bottom-10 right-6 w-7 h-7 text-gentle-pink-400 opacity-80 animate-ping delay-300"/>


        <h2 className="text-3xl font-bold text-soft-purple-800 mt-12">Congratulations!</h2>
        <p className="text-gray-600 mt-2">You've unlocked the {reward.tier}-day streak reward!</p>
        
        <div className="my-6 p-4 bg-soft-purple-50 border-2 border-dashed border-soft-purple-200 rounded-lg">
          <p className="text-lg font-semibold text-soft-purple-700">{reward.description}</p>
        </div>
        
        <p className="text-gray-500 text-sm">You've earned it through your amazing consistency. Keep up the great work!</p>
        
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 px-4 bg-gentle-pink-500 text-white font-bold rounded-lg shadow-md hover:bg-gentle-pink-600 transition-colors"
        >
          Keep Going!
        </button>
      </div>
    </div>
  );
};

export default RewardModal;