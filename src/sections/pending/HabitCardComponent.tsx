import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Habit } from "@/api/habit-types";
import { addDays, isAfter } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      className="text-gray-600 uppercase text-sm leading-normal grid grid-cols-8 h-16 place-items-center bg-transparent border hover:bg-card  ">
      <div
        onClick={() => handleRedirect(habit.id)}
        className="py-3 px-6 w-full  whitespace-nowrap cursor-pointer text-start">
        {habit.name}
      </div>
      {daysOfCurrentWeek.map(({ formattedDate }) => {
        const isFutureDate = isAfter(new Date(formattedDate), tomorrow);
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
                    if (true) {
                      addCompletedDay(habit.id, formattedDate);
                    }
                  }}
                  className="form-checkbox h-8 w-8 bg-slate-200 border-none ring-rose-400 focus-visible:ring-blue-500 transition duration-150 ease-in-out"
                />
              </PopoverTrigger>
              <PopoverContent>Día: {formattedDate}</PopoverContent>
            </Popover>
          </div>
        );
      })}
    </Card>
  );
};
