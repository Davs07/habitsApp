// store/habitStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Habit, CompletedDay } from "@/api/habit-types";

interface HabitState {
  habits: Habit[];
  addHabit: (newHabit: Habit) => void;
  updateHabit: (id: Habit["id"], updatedHabit: Partial<Habit>) => void;
  removeHabit: (id: Habit["id"]) => void;
  addCompletedDay: (
    habitId: Habit["id"],
    completedDay: CompletedDay["date"]
  ) => void;
}

export const useHabitStore = create(
  persist<HabitState>(
    (set) => ({
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

      addCompletedDay: (habitId, date) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === habitId
              ? {
                  ...habit,
                  completedDays: habit.completedDays?.some(
                    (day) => day.date === date
                  )
                    ? habit.completedDays.filter((day) => day.date !== date)
                    : [
                        ...(habit.completedDays ?? []),
                        { date, completed: true },
                      ],
                }
              : habit
          ),
        })),
    }),
    {
      name: "habits",
    }
  )
);
