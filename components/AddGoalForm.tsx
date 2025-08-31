import React, { useState } from 'react';
import { PlusIcon } from './icons';

interface AddGoalFormProps {
  onAddGoal: (goal: { name: string; category: string; isCompulsory: boolean }) => void;
}

const AddGoalForm: React.FC<AddGoalFormProps> = ({ onAddGoal }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Self-Care');
  const [isCompulsory, setIsCompulsory] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddGoal({ name, category, isCompulsory });
    setName('');
    setCategory('Self-Care');
    setIsCompulsory(false);
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gentle-pink-500 text-white font-bold rounded-lg shadow-md hover:bg-gentle-pink-600 transition-colors"
      >
        <PlusIcon className="w-6 h-6" />
        Add a New Goal
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h3 className="text-xl font-bold text-soft-purple-800">Create a New Goal</h3>
      <div>
        <label htmlFor="goal-name" className="block text-sm font-medium text-charcoal">Goal Name</label>
        <input
          id="goal-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Read for 15 minutes"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-soft-purple-500 focus:border-soft-purple-500"
          required
        />
      </div>
      <div>
        <label htmlFor="goal-category" className="block text-sm font-medium text-charcoal">Category</label>
        <select
          id="goal-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-soft-purple-500 focus:border-soft-purple-500"
        >
          <option>Self-Care</option>
          <option>Hygiene</option>
          <option>Productivity</option>
          <option>Learning</option>
          <option>Other</option>
        </select>
      </div>
      <div className="flex items-center">
        <input
          id="is-compulsory"
          type="checkbox"
          checked={isCompulsory}
          onChange={(e) => setIsCompulsory(e.target.checked)}
          className="h-4 w-4 text-soft-purple-600 border-gray-300 rounded focus:ring-soft-purple-500"
        />
        <label htmlFor="is-compulsory" className="ml-2 block text-sm text-charcoal">
          Compulsory? (Must be done daily to maintain overall streak)
        </label>
      </div>
      <div className="flex gap-2">
        <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-charcoal bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-soft-purple-500"
        >
            Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gentle-pink-500 hover:bg-gentle-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gentle-pink-500"
        >
          Add Goal
        </button>
      </div>
    </form>
  );
};

export default AddGoalForm;