import { Habit } from "@/api/habit-types";
import { Greeting } from "@/components/Greeting";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useHabitStore } from "@/store/habitStore";
import {
  addDays,
  addWeeks,
  endOfWeek,
  format,
  startOfWeek,
  subWeeks
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HabitTry = () => {
  const habits = useHabitStore<Habit[]>((state) => state.habits);
  const addCompletedDay = useHabitStore((state) => state.addCompletedDay);

  const navigate = useNavigate();

  const weekStartsOn = 1; // Lunes como inicio de la semana

  const user = {
    name: "John Doe",
    email: "email",
    avatar: "avatar",
    id: "id",
  };

  const handleRedirect = (id: string) => {
    navigate(`/habit/${id}`);
  };

  const getCurrentWeekStart = () => startOfWeek(new Date(), { weekStartsOn });

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getCurrentWeekStart()
  );

  const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn });

  const daysOfCurrentWeek = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentWeekStart, i);
    return {
      formattedDate: format(date, "yyyy-MM-dd"),
      displayDate: format(date, "d/M/yyyy"),
      dayName: format(date, "EEEE", { locale: es }),
      dayNumber: format(date, "dd"),
    };
  });

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart((prev) => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addWeeks(prev, 1));
  };

  const handleCurrentWeek = () => {
    setCurrentWeekStart(getCurrentWeekStart());
  };

  return (
    <div className="flex flex-col items-center h-full w-max justify-start">
      <Greeting user={user} />

      <div className="flex w-full mb-4 justify-between">
        <div className="flex space-x-2 justify-center items-center">
          <Button
            onClick={handlePreviousWeek}
            size={"icon"}
            className=" bg-gray-200 text-black hover:text-white rounded-3xl">
            <ChevronLeft />
          </Button>
          <Button
            onClick={handleCurrentWeek}
            className="px-4 py-2 bg-gray-200 text-black hover:text-white rounded-3xl">
            Semana Actual
          </Button>
          <Button
            onClick={handleNextWeek}
            size={"icon"}
            className=" bg-gray-200 text-black hover:text-white rounded-3xl">
            <ChevronRight />
          </Button>
        </div>
        <div>
          <h3 className="mb-2">
            {capitalize(format(currentWeekStart, "EEEE", { locale: es }))},{" "}
            {format(currentWeekStart, "d", { locale: es })}{" "}
            {capitalize(format(currentWeekStart, "LLL", { locale: es }))} -{" "}
            {capitalize(format(currentWeekEnd, "EEEE", { locale: es }))},{" "}
            {format(currentWeekEnd, "d", { locale: es })}{" "}
            {capitalize(format(currentWeekEnd, "LLL", { locale: es }))}
          </h3>
        </div>
      </div>

      <Card className="text-gray-600 bg-transparent shadow-none font-bold uppercase text-sm leading-normal grid grid-cols-8 w-full">
        <div className="py-3 px-6 text-left">Hábito</div>
        {daysOfCurrentWeek.map(({ formattedDate, dayName }) => (
          <div key={formattedDate} className="py-3 px-6 text-center">
            {`${dayName}`}
          </div>
        ))}
      </Card>
      <div className="w-full flex flex-col gap-6">
        {habits.map((habit) => (
          <Card
            key={habit.id}
            className="text-gray-600 uppercase text-sm leading-normal grid grid-cols-8 h-16 place-items-center  ">
            <div
              onClick={() => handleRedirect(habit.id)}
              className="py-3 px-6 text-left whitespace-nowrap cursor-pointer">
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
                    className="form-checkbox h-5 w-5 bg-slate-200 border-none ring-rose-400 focus-visible:ring-blue-500 transition duration-150 ease-in-out"
                  />
                </div>
              );
            })}
          </Card>
        ))}
      </div>
    </div>
  );
};
