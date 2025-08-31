
export interface Goal {
  id: string;
  name: string;
  category: string;
  isCompulsory: boolean;
  currentStreak: number;
  lastCompleted: string | null; // ISO date string
  isCompletedToday: boolean;
}

export interface Reward {
  tier: number; // in days, e.g., 30
  description: string;
  isUnlocked: boolean;
  unlockedDate: string | null; // ISO date string
  isMandatory?: boolean;
}