import { habits as initialHabits } from "@/api/Habits/Habits";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HabitForm } from "@/components/habits/habitForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { Habit } from "@/api/habit-types";
import { Button } from "@/components/ui/button";
import { useHabitStore } from "@/store/habitStore";

export const HabitList: React.FC = () => {
  const habits = useHabitStore(state => state.habits);
  const addHabit = useHabitStore(
    state => state.habits
  )



  return (
    <div className=" h-full w-max justify-start items-start gap-2 grid grid-cols-1 mt-32">
      <div className=" h-max w-max gap-4 grid grid-cols-1 place-items-center ">
        {habits.map((habit) => (
          <Card className="space-y-0 w-[500px] py-2 rounded-2xl">
            <CardHeader className="space-y-0 py-1 px-3">
              <div key={habit.id}>{habit.name}</div>
            </CardHeader>
            <CardContent className="space-y-0 pt-0 pb-0 flex gap-2 px-3 text-slate-400">
              <p className="txs">{habit.category}</p>
              <p className="txs">{habit.frequency.type}</p>
              <p className="txs">{habit.priority}</p>
              <p className="txs">{habit.goal.meta.toString()}</p>
            </CardContent>
          </Card>
        ))}
        <Dialog>
          <DialogTrigger className="w-max">
            <Button>Agregar Hábito</Button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <HabitForm  />
          </DialogContent>
        </Dialog>
      </div>
      {/* <HabitForm addHabit={addHabit} /> */}
    </div>
  );
};
