import { Habit } from "@/api/habit-types";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverArrow } from "@radix-ui/react-popover";
import { addDays, isAfter } from "date-fns";

interface HabitCardComponentProps {
  habit: Habit;
  daysOfCurrentWeek: Array<{
    formattedDate: string;
  }>;
  handleRedirect: (id: string) => void;
  addCompletedDay: (habitId: string, date: string) => void;
}

export const HabitCardComponent = ({
  habit,
  daysOfCurrentWeek,
  handleRedirect,
  addCompletedDay,
}: HabitCardComponentProps) => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  return (
    <Card
      key={habit.id}
      className={cn(
        "text-gray-600 uppercase text-sm leading-normal grid grid-cols-8 h-16 place-items-center  border bg-card "
      )}>
      <div
        onClick={() => handleRedirect(habit.id)}
        className="py-3 px-6 w-full  whitespace-nowrap cursor-pointer text-start">
        {habit.name}
      </div>
      {daysOfCurrentWeek.map(({ formattedDate }) => {
        const isFutureDate = isAfter(new Date(formattedDate), today);
        if (isFutureDate) {
          return <div className="size-8 bg-input rounded-xl"></div>;
        }
        const isChecked = habit.completedDays?.some(
          (day) => day.date === formattedDate
        );
        return (
          <div key={formattedDate} className="py-3 px-6 text-center">
            <Popover>
              <PopoverTrigger>
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => {
                    if (
                      habit.completedDays?.some(
                        (day) => day.date === formattedDate
                      )
                    ) {
                      console.log(habit.completedDays);
                    }
                    addCompletedDay(habit.id, formattedDate);
                  }}
                  className={cn(
                    "form-checkbox h-8 w-8 bg-slate-200 border-none ring-rose-400 focus-visible:ring-blue-500 transition duration-150 ease-in-out",
                    habit.color?.value
                      ? `data-[state=checked]:bg-${habit.color.value}-500`
                      : "",
                    isChecked ? "checked" : ""
                  )}
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <p> El tipo de hábito es: {habit.goal.type}</p>
                <p>Meta: {habit.goal.meta.toString()} </p>
                <p>Día: {formattedDate}</p>
              </PopoverContent>
            </Popover>
          </div>
        );
      })}
    </Card>
  );
};
