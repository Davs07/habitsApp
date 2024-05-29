import { Habit } from "@/api/habit-types";
import { Greeting } from "@/components/Greeting";
import { NavigationWeeks } from "@/sections/pending/NavWeeks";
import { HabitCardComponent } from "@/sections/pending/HabitCardComponent";
import { HabitHeaderComponent } from "@/sections/pending/HabitHeaderComponent";
import { useHabitStore } from "@/store/habitStore";
import {
  addDays,
  addWeeks,
  endOfWeek,
  format,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { es } from "date-fns/locale";
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

  console.log(habits)

  return (
    <div className="flex flex-col items-center h-full w-max justify-start gap-8">
      <Greeting user={user} />

      {/* NavigationWeeks */}
      <NavigationWeeks
        currentWeekStart={currentWeekStart}
        currentWeekEnd={currentWeekEnd}
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek}
        handleCurrentWeek={handleCurrentWeek}
        capitalize={capitalize}
      />

      <HabitHeaderComponent daysOfCurrentWeek={daysOfCurrentWeek} />
      <div className="w-full flex flex-col gap-6">
        {habits.map((habit) => (
          <HabitCardComponent
            key={habit.id}
            habit={habit}
            daysOfCurrentWeek={daysOfCurrentWeek}
            handleRedirect={handleRedirect}
            addCompletedDay={addCompletedDay}
          />
        ))}
      </div>
    </div>
  );
};
