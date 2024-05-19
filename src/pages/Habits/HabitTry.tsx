import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  subWeeks,
  addWeeks,
} from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { habits as habitosIniciales } from "@/api/Habits/Habits";
import { Habit } from "@/api/habit-types";

export const HabitTry = () => {
  const weekStartsOn = 1; // Lunes como inicio de la semana
  const [habitos, setHabitos] = useState<Habit[]>(habitosIniciales);

  useEffect(() => {
    console.log(habitos);
  }, [habitos]);

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

  const handleCheckboxChange = (habitoId: string, date: string) => {
    setHabitos(
      habitos.map((habito) =>
        habito.id === habitoId
          ? {
              ...habito,
              completedDays: habito.completedDays?.some(
                (day) => day.date === date
              )
                ? habito.completedDays.filter((day) => day.date !== date)
                : [...(habito.completedDays ?? []), { date, completed: true }],
            }
          : habito
      )
    );
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
      <h1 className="mb-4">Checkbox Test</h1>

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

      <div>
        <table>
          <thead>
            <tr className="text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Hábito</th>
              {daysOfCurrentWeek.map(({ formattedDate, dayName }) => (
                <th key={formattedDate} className="py-3 px-6 text-center">
                  {`${dayName}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habitos.map((habito) => (
              <tr
                key={habito.id}
                className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {habito.name}
                </td>
                {daysOfCurrentWeek.map(({ formattedDate }) => {
                  const isChecked = habito.completedDays?.some(
                    (day) => day.date === formattedDate
                  );
                  return (
                    <td key={formattedDate} className="py-3 px-6 text-center">
                      <Checkbox
                        checked={isChecked}
                        onClick={() =>
                          handleCheckboxChange(habito.id, formattedDate)
                        }
                        className="form-checkbox h-5 w-5 bg-slate-200 border-none ring-rose-400 focus-visible:ring-blue-500 transition duration-150 ease-in-out"
                      />
                      {/* <span>{`${dayNumber}, ${displayDate}`}</span> */}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
