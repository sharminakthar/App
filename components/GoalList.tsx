import React from 'react';
import type { Goal } from '../types';
import GoalItem from './GoalItem';

interface GoalListProps {
  goals: Goal[];
  onToggleComplete: (id: string) => void;
  onDeleteGoal: (id: string) => void;
  setGoals: (goals: Goal[]) => void;
}

const GoalList: React.FC<GoalListProps> = ({ goals, onToggleComplete, onDeleteGoal, setGoals }) => {
  const dragItem = React.useRef<number | null>(null);
  const dragOverItem = React.useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragOverItem.current = position;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newGoals = [...goals];
      const draggedItemContent = newGoals.splice(dragItem.current, 1)[0];
      newGoals.splice(dragOverItem.current, 0, draggedItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setGoals(newGoals);
    }
  };


  const sortedGoals = [...goals].sort((a, b) => Number(a.isCompletedToday) - Number(b.isCompletedToday));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-soft-purple-800 mb-4">Today's Goals</h2>
      {goals.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No goals added yet. Add one below!</p>
      ) : (
        <div className="space-y-3">
          {sortedGoals.map((goal, index) => (
            <GoalItem 
              key={goal.id} 
              index={index}
              goal={goal} 
              onToggleComplete={onToggleComplete}
              onDeleteGoal={onDeleteGoal}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              // FIX: The `onDragEnd` prop expects a function with signature `() => void`, but was passed `handleDrop` which has a different signature.
              // This has been corrected to pass a function that cleans up drag-related refs.
              onDragEnd={() => {
                dragItem.current = null;
                dragOverItem.current = null;
              }}
              onDrop={handleDrop}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalList;
