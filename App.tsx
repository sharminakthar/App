import React, { useState, useEffect, useCallback } from 'react';
import type { Goal, Reward } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import GoalList from './components/GoalList';
import AddGoalForm from './components/AddGoalForm';
import StreakTracker from './components/StreakTracker';
import RewardSection from './components/RewardSection';
import RewardModal from './components/RewardModal';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const mandatoryTiers = [7, 30, 90, 180, 365];

const defaultGoals: Goal[] = [
    { id: '1', name: 'Brush Teeth (AM)', category: 'Hygiene', isCompulsory: true, currentStreak: 0, lastCompleted: null, isCompletedToday: false },
    { id: '2', name: 'Brush Teeth (PM)', category: 'Hygiene', isCompulsory: true, currentStreak: 0, lastCompleted: null, isCompletedToday: false },
    { id: '3', name: 'Shower/Bathe', category: 'Hygiene', isCompulsory: true, currentStreak: 0, lastCompleted: null, isCompletedToday: false },
    { id: '4', name: 'Drink Water', category: 'Self-Care', isCompulsory: false, currentStreak: 0, lastCompleted: null, isCompletedToday: false },
    { id: '5', name: 'Eat a Meal', category: 'Self-Care', isCompulsory: true, currentStreak: 0, lastCompleted: null, isCompletedToday: false },
];

const defaultRewards: Reward[] = [
    { tier: 7, description: 'A favorite snack or treat', isUnlocked: false, unlockedDate: null, isMandatory: true },
    { tier: 30, description: 'A new book or comic', isUnlocked: false, unlockedDate: null, isMandatory: true },
    { tier: 90, description: 'A comfy new blanket', isUnlocked: false, unlockedDate: null, isMandatory: true },
    { tier: 180, description: 'A special day trip', isUnlocked: false, unlockedDate: null, isMandatory: true },
    { tier: 365, description: 'A significant personal gift', isUnlocked: false, unlockedDate: null, isMandatory: true },
];

const App: React.FC = () => {
    const [goals, setGoals] = useLocalStorage<Goal[]>('my-reward-chart-goals', defaultGoals);
    const [rewards, setRewards] = useLocalStorage<Reward[]>('my-reward-chart-rewards', defaultRewards);
    const [overallStreak, setOverallStreak] = useLocalStorage<number>('my-reward-chart-overall-streak', 0);
    const [lastOverallStreakUpdate, setLastOverallStreakUpdate] = useLocalStorage<string | null>('my-reward-chart-last-streak-update', null);
    const [unlockedReward, setUnlockedReward] = useState<Reward | null>(null);

    const checkStreaks = useCallback(() => {
        const today = getTodayDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // Reset individual goal streaks and completion status
        const updatedGoals = goals.map(goal => {
            const isCompletedToday = goal.lastCompleted === today;
            let currentStreak = goal.currentStreak;
            if (goal.lastCompleted !== today && goal.lastCompleted !== yesterdayStr) {
                currentStreak = 0;
            }
            return { ...goal, isCompletedToday, currentStreak: isCompletedToday ? goal.currentStreak : currentStreak };
        });
        setGoals(updatedGoals);

        // Reset overall streak
        if (lastOverallStreakUpdate && lastOverallStreakUpdate !== today && lastOverallStreakUpdate !== yesterdayStr) {
            setOverallStreak(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        checkStreaks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggleComplete = (id: string) => {
        const today = getTodayDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        const updatedGoals = goals.map(goal => {
            if (goal.id === id) {
                if (goal.isCompletedToday) {
                    // UN-CHECKING: Revert today's completion
                    const newStreak = Math.max(0, goal.currentStreak - 1);
                    return {
                        ...goal,
                        isCompletedToday: false,
                        currentStreak: newStreak,
                        // If streak is now > 0, it means it was completed yesterday. Otherwise, no recent completion.
                        lastCompleted: newStreak > 0 ? yesterdayStr : null,
                    };
                } else {
                    // CHECKING: Mark as completed today
                    return {
                        ...goal,
                        isCompletedToday: true,
                        currentStreak: goal.currentStreak + 1,
                        lastCompleted: today,
                    };
                }
            }
            return goal;
        });

        setGoals(updatedGoals);
        checkOverallStreak(updatedGoals);
    };
    
    const checkOverallStreak = (currentGoals: Goal[]) => {
        const today = getTodayDateString();
        const allCompulsoryDone = currentGoals
            .filter(g => g.isCompulsory)
            .every(g => g.isCompletedToday);

        if (allCompulsoryDone) {
            // If all are done and streak hasn't been updated today, increment it.
            if (lastOverallStreakUpdate !== today) {
                const newStreak = overallStreak + 1;
                setOverallStreak(newStreak);
                setLastOverallStreakUpdate(today);
                checkRewards(newStreak);
            }
        } else {
            // If not all compulsory are done, and we ALREADY incremented today, it means the user
            // just un-checked a compulsory goal. So we must decrement the streak.
            if (lastOverallStreakUpdate === today) {
                const newStreak = Math.max(0, overallStreak - 1);
                setOverallStreak(newStreak);
                // Set the last update to null, so it can be re-incremented today if all goals are completed again.
                setLastOverallStreakUpdate(null);
            }
        }
    };
    
    const checkRewards = (currentStreak: number) => {
        const rewardFromStorage = rewards.find(r => r.tier === currentStreak && !r.isUnlocked);
        if (rewardFromStorage) {
            setRewards(rewards.map(r => r.tier === rewardFromStorage.tier ? { ...r, isUnlocked: true, unlockedDate: new Date().toISOString() } : r));
            setUnlockedReward(rewardFromStorage);
        }
    };

    const handleAddGoal = (goalData: { name: string; category: string; isCompulsory: boolean }) => {
        const newGoal: Goal = {
            id: new Date().getTime().toString(),
            ...goalData,
            currentStreak: 0,
            lastCompleted: null,
            isCompletedToday: false,
        };
        setGoals([...goals, newGoal]);
    };

    const handleDeleteGoal = (id: string) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    const handleUpdateReward = (tier: number, description: string) => {
        setRewards(rewards.map(r => r.tier === tier ? { ...r, description } : r));
    };
    
    const handleAddReward = (rewardData: { tier: number; description: string }) => {
        const newReward: Reward = {
            ...rewardData,
            isUnlocked: false,
            unlockedDate: null,
            isMandatory: false,
        };
        setRewards([...rewards, newReward]);
    };

    const handleDeleteReward = (tier: number) => {
        if (mandatoryTiers.includes(tier)) return; // Safeguard against deleting mandatory rewards
        setRewards(rewards.filter(reward => reward.tier !== tier));
    };

    return (
        <div className="min-h-screen bg-off-white text-charcoal font-sans p-4 md:p-8">
            <main className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                    <Header />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <StreakTracker goals={goals} overallStreak={overallStreak} />
                    <GoalList goals={goals} onToggleComplete={handleToggleComplete} onDeleteGoal={handleDeleteGoal} setGoals={setGoals} />
                    <AddGoalForm onAddGoal={handleAddGoal} />
                </div>
                <div className="lg:col-span-1">
                    <RewardSection 
                        rewards={rewards} 
                        overallStreak={overallStreak} 
                        onUpdateReward={handleUpdateReward}
                        onAddReward={handleAddReward}
                        onDeleteReward={handleDeleteReward}
                    />
                </div>
            </main>
            <RewardModal reward={unlockedReward} onClose={() => setUnlockedReward(null)} />
        </div>
    );
};

export default App;