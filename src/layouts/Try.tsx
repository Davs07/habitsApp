import { useState } from "react";
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

export const Try = () => {
  const weekStartsOn = 1; // Lunes como inicio de la semana
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
    };
  });

  const handleCheckboxChange = (day: string) => {
    console.log(`Checkbox for day ${day} changed`);
    console.log(daysOfCurrentWeek);
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
    <div className="flex flex-col items-center">
      <h1 className="mb-4">Checkbox Test</h1>
      <h2 className="mb-2">
        {format(currentWeekStart, "d/M/yyyy")} -{" "}
        {format(currentWeekEnd, "d/M/yyyy")}
      </h2>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={handlePreviousWeek}
          className="px-4 py-2 bg-gray-200 rounded">
          Semana Anterior
        </button>
        <button
          onClick={handleCurrentWeek}
          className="px-4 py-2 bg-gray-200 rounded">
          Semana Actual
        </button>
        <button
          onClick={handleNextWeek}
          className="px-4 py-2 bg-gray-200 rounded">
          Siguiente Semana
        </button>
      </div>
      <div className="flex space-x-2">
        {daysOfCurrentWeek.map(({ formattedDate, displayDate, dayName }) => (
          <div key={formattedDate}>
            <label className="flex items-center space-x-2">
              {formattedDate === format(new Date(), "yyyy-MM-dd") && (
                <span className="text-rose-400">Hoy</span>
              )}
              <Checkbox
                onClick={() => handleCheckboxChange(formattedDate)}
                className="form-checkbox h-5 w-5 bg-slate-200 border-none ring-rose-400 focus-visible:ring-blue-500 transition duration-150 ease-in-out"
              />
              <span>{`${dayName}, ${displayDate}`}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
