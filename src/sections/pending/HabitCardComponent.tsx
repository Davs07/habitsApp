import { Habit } from "@/api/habit-types";
import { Card } from "@/components/ui/card";
import { CategoryColors } from "@/api/shared-types";
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

  if (habit.category) {
    console.log(habit.name, CategoryColors[habit.category]);
  }

  return (
    <Card
      key={habit.id}
      className={cn(
        `text-gray-600 uppercase text-sm leading-normal grid grid-cols-8 h-16 place-items-center  shadow-none rounded-lg bg-card border border-input border-l-4 border-l-${
          CategoryColors[habit.category]
        }-500`
      )}>
      <div
        onClick={() => handleRedirect(habit.id)}
        className="py-0 px-4 w-full  whitespace-nowrap cursor-pointer text-start">
        {habit.name}
      </div>
      {daysOfCurrentWeek.map(({ formattedDate }) => {
        const isFutureDate = isAfter(new Date(formattedDate), today);

        const isChecked = habit.completedDays?.some(
          (day) => day.date === formattedDate
        );
        return (
          <div key={formattedDate} className="py-3 px-6 text-center">
            <Popover>
              <PopoverTrigger>
                {!isFutureDate ? (
                  <div
                    className={cn(
                      `size-8 border-2  rounded-lg border-${
                        CategoryColors[habit.category]
                      }-500/30 grid place-content-center text-xs cursor-pointer`,
                      isChecked
                        ? `bg-${CategoryColors[habit.category]}-500`
                        : `bg-${CategoryColors[habit.category]}-500/30`
                    )}
                    onClick={() => {
                      if (
                        habit.completedDays?.some(
                          (day) => day.date === formattedDate
                        )
                      ) {
                        console.log(habit.completedDays);
                      }
                      addCompletedDay(habit.id, formattedDate);
                    }}></div>
                ) : (
                  <div
                    className={`size-8 border-2  rounded-lg border-${
                      CategoryColors[habit.category]
                    }-500/30`}></div>
                )}
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
