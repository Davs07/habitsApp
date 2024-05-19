import { habits as initialHabits } from "@/api/Habits/Habits";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HabitForm } from "@/components/habits/habitForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Habit } from "@/api/habit-types";
import { Button } from "@/components/ui/button";

export const HabitList: React.FC = () => {
  const [habits, setHabits] = React.useState<Habit[]>(initialHabits);

  const addHabit = (newHabit: Habit) => {
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  return (
    <div className=" h-full w-max justify-start items-start gap-2 grid grid-cols-1 ">
      <div className=" h-max w-max justify-start items-start gap-2 grid grid-cols-1">
        {habits.map((habit) => (
          <Card className="space-y-0 ">
            <CardHeader className="space-y-0 py-1 px-3">
              <div key={habit.id}>{habit.name}</div>
            </CardHeader>
            <CardContent className="space-y-0 pt-0 pb-0 flex gap-2 px-3">
              <p className="txs">{habit.category}</p>
              <p className="txs">{habit.frequency.type}</p>
            </CardContent>
          </Card>
        ))}
        <Dialog>
          <DialogTrigger>
            <Button>Agregar Hábito</Button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <HabitForm addHabit={addHabit} />
          </DialogContent>
        </Dialog>
      </div>
      {/* <HabitForm addHabit={addHabit} /> */}
    </div>
  );
};
