// store/habitStore.ts
import { create } from "zustand";
import { Habit, CompletedDay } from "@/api/habit-types";

interface HabitState {
  habits: Habit[];
  addHabit: (newHabit: Habit) => void;
  updateHabit: (id: string, updatedHabit: Partial<Habit>) => void;
  removeHabit: (id: string) => void;
  addCompletedDay: (habitId: string, completedDay: CompletedDay) => void;
}

export const useHabitStore = create<HabitState>((set) => ({
  habits: [], // Estado inicial vacío para los hábitos

  addHabit: (newHabit: Habit) =>
    set((state) => ({ habits: [...state.habits, newHabit] })),

  updateHabit: (id, updatedHabit) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? { ...habit, ...updatedHabit } : habit
      ),
    })),

  removeHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
    })),

  addCompletedDay: (habitId, completedDay) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completedDays: [...(habit.completedDays || []), completedDay],
            }
          : habit
      ),
    })),
}));
