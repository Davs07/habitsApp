import React, { useEffect, useState } from "react";
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

interface CompletedDay {
  date: string;
  notes?: string;
}

interface Habito {
  id: string;
  name: string;
  completedDays: CompletedDay[];
}

const habitosIniciales: Habito[] = [
  {
    id: "1",
    name: "Hacer ejercicio",
    completedDays: [
      { date: "2024-05-13", notes: "Hice 30 minutos de cardio" },
      { date: "2024-05-15", notes: "Caminé 10,000 pasos" },
    ],
  },
  {
    id: "2",
    name: "Leer un libro",
    completedDays: [{ date: "2024-05-13", notes: "Leí 20 páginas" }],
  },
];

export const HabitTry = () => {
  const weekStartsOn = 1; // Lunes como inicio de la semana
  const [habitos, setHabitos] = useState<Habito[]>(habitosIniciales);

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
    };
  });

  const handleCheckboxChange = (habitoId: string, date: string) => {
    setHabitos(
      habitos.map((habito) =>
        habito.id === habitoId
          ? {
              ...habito,
              completedDays: habito.completedDays.some(
                (day) => day.date === date
              )
                ? habito.completedDays.filter((day) => day.date !== date)
                : [...habito.completedDays, { date }],
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
      {habitos.map((habito) => (
        <div key={habito.id} className="mb-4">
          <h3>{habito.name}</h3>
          <div className="flex space-x-2">
            {daysOfCurrentWeek.map(
              ({ formattedDate, displayDate, dayName }) => {
                const isChecked = habito.completedDays.some(
                  (day) => day.date === formattedDate
                );
                return (
                  <label
                    key={formattedDate}
                    className="flex items-center space-x-2">
                    <Checkbox
                      checked={isChecked}
                      onClick={() =>
                        handleCheckboxChange(habito.id, formattedDate)
                      }
                      className="form-checkbox h-5 w-5 bg-slate-200 border-none ring-rose-400 focus-visible:ring-blue-500 transition duration-150 ease-in-out"
                    />
                    <span>{`${dayName}, ${displayDate}`}</span>
                  </label>
                );
              }
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
