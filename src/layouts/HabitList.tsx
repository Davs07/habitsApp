import { habits as initialHabits } from "@/api/Habits/Habits";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HabitForm } from "@/components/habits/habitForm";

import React from "react";

export const HabitList = () => {
  const [habits, setHabits] = React.useState(initialHabits);

  return (
    <div className=" h-full w-max justify-start items-start gap-2 grid grid-cols-1">
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
      </div>
      <HabitForm />
    </div>
  );
};
