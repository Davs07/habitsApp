import { Habit } from "@/api/habit-types";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useHabitStore } from "@/store/habitStore";
import { useParams } from "react-router-dom";

type Props = {
  habit: Habit;
};

export const HabitCardContent = ({ habit }: Props) => {
  return (
    <CardContent className="space-y-0 pt-0 pb-0 gap-2 px-3 text-slate-800 flex flex-wrap">
      <Button variant={"ghost"} className="txs">
        {habit.category}
      </Button>
      <Button variant={"ghost"} className="txs">
        {habit.frequency.type}
      </Button>
      <Button variant={"ghost"} className="txs">
        {habit.priority}
      </Button>
      <Button variant={"ghost"} className="txs">
        {habit.goal.meta.toString()}
      </Button>
    </CardContent>
  );
};
