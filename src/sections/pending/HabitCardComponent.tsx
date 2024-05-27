import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Habit } from "@/api/habit-types";

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
        const isChecked = habit.completedDays?.some(
          (day) => day.date === formattedDate
        );
        return (
          <div key={formattedDate} className="py-3 px-6 text-center">
            <Checkbox
              checked={isChecked}
              onClick={() => addCompletedDay(habit.id, formattedDate)}
              className="form-checkbox h-8 w-8 bg-slate-200 border-none ring-rose-400 focus-visible:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>
        );
      })}
    </Card>
  );
};
