import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { habits as initialHabits } from "@/api/Habits/Habits";
import { CompletedDay, Habit, SmartDescription } from "@/api/habit-types";
import { Category, Day } from "@/api/shared-types";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { addDays, startOfWeek, subDays, format } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export const HabitsTabs = () => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [newHabitName, setNewHabitName] = useState("");

  useEffect(() => {
    console.log(habits);
  }, [habits]);

  const habitTabs = [
    { value: "week", name: "Semana" },
    { value: "month", name: "Mes" },
    { value: "year", name: "Año" },
    { value: "allTime", name: "Todo el tiempo" },
  ];

  const daysOfCurrentWeek = Array.from({ length: 7 }, (_, i) =>
    format(addDays(currentWeekStart, i), "yyyy-MM-dd")
  );

  const daysOfWeek: { [key: string]: Day } = {
    Lun: Day.Lunes,
    Mar: Day.Martes,
    Mie: Day.Miercoles,
    Jue: Day.Jueves,
    Vie: Day.Viernes,
    Sab: Day.Sabado,
    Dom: Day.Domingo,
  };

  const getHabitsByPeriod = (period: string) => {
    switch (period) {
      case "week":
        return habits.filter(
          (habit) =>
            habit.frequency.type === "Semanal" ||
            habit.frequency.type === "Diario"
        );
      case "month":
        return habits.filter(
          (habit) =>
            habit.frequency.type === "PorPeriodo" &&
            habit.frequency.periodo === "Mes"
        );
      case "year":
        return habits.filter(
          (habit) =>
            habit.frequency.type === "PorPeriodo" &&
            habit.frequency.periodo === "Año"
        );
      case "allTime":
        return habits;
      default:
        return [];
    }
  };

  const handleCompletedHabit = (habitId: string, date: string) => {
    setHabits((prevHabits: Habit[]) =>
      prevHabits.map((habit) => {
        if (habit.id !== habitId) {
          return habit;
        }

        const isDateCompleted =
          habit.completedDays?.some((day) => day.date === date) ?? false;

        return {
          ...habit,
          completedDays: updateCompletedDays(
            habit.completedDays || [],
            date,
            isDateCompleted
          ),
        };
      })
    );
  };

  const updateCompletedDays = (
    completedDays: CompletedDay[],
    date: string,
    isDateCompleted: boolean
  ): CompletedDay[] => {
    if (isDateCompleted) {
      return completedDays.filter((day) => day.date !== date);
    } else {
      return [...completedDays, { date, completed: true }];
    }
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prevWeekStart) => addDays(prevWeekStart, 7));
  };

  const handlePrevWeek = () => {
    setCurrentWeekStart((prevWeekStart) => subDays(prevWeekStart, 7));
  };

  const handleAddHabit = () => {
    if (newHabitName.trim() !== "") {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName.trim(),
        description: "",
        frequency: { type: "Diario" },
        category: Category.Bienestar,
        goal: { type: "SiNo", meta: false },
        smartDescription: {
          purposeAndMotivation: "",
          benefitsAndConsequences: "",
          currentHabitsAndEnvironment: "",
          capacityAndResources: "",
          possibleObstaclesAndSolutions: "",
        } as SmartDescription,
        comments: [],
        completedDays: [],
      };
      setHabits([...habits, newHabit]);
      setNewHabitName("");
    }
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits(habits.filter((habit) => habit.id !== habitId));
  };

  return (
    <Tabs defaultValue="week" className="min-w-[400px] h-max my-6 mx-2 ">
      <div className="flex flex-row gap-8">
        <TabsList className="flex flex-col sm:flex-row">
          {habitTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="w-32 py-3">
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex items-center gap-2">
          <Input
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="h-[64px] w-64"
            placeholder="Nuevo hábito"
          />
          <Button
            onClick={handleAddHabit}
            className="h-[64px] px-8 border-2"
            variant={"outline"}>
            <Plus />
            Añadir Tarea
          </Button>
        </div>
      </div>
      <TabsContent value="week" className="w-full">
        <div className="flex justify-between mb-4">
          <div className="flex justify-center items-center gap-2">
            <Button onClick={handlePrevWeek} size="icon">
              <ChevronLeft />
            </Button>
            <Button onClick={() => setCurrentWeekStart(new Date())}>
              Esta semana
            </Button>
            <Button onClick={handleNextWeek} size="icon">
              <ChevronRight />
            </Button>
          </div>
          <span>
            {currentWeekStart.toLocaleDateString()} -{" "}
            {addDays(currentWeekStart, 6).toLocaleDateString()}
          </span>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Hábito</th>
              {daysOfCurrentWeek.map((day) => (
                <th key={day} className="py-3 px-6 text-center">
                  {format(new Date(day), "EEE")}
                </th>
              ))}
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {getHabitsByPeriod("week").map((habit: Habit) => (
              <tr
                key={habit.id}
                className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {habit.name}
                </td>
                {daysOfCurrentWeek.map((day) => {
                  const isCompleted =
                    habit.completedDays?.some(
                      (completedDay) => completedDay.date === day
                    ) ?? false;
                  return (
                    <td key={day} className="py-3 px-6 text-center">
                      <Checkbox
                        color="red"
                        checked={isCompleted}
                        onChange={() => handleCompletedHabit(habit.id, day)}
                        className="form-checkbox h-5 w-5 bg-slate-200 border-none ring-rose-400 focus-visible:data-[state=checked]:bg-blue-500 focus-visible:ring-blue-500 transition duration-150 ease-in-out"
                      />
                    </td>
                  );
                })}
                <td className="py-3 px-6 text-center">
                  <Button
                    onClick={() => handleDeleteHabit(habit.id)}
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-500 hover:text-white">
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TabsContent>

      {/* Otros TabsContent */}
    </Tabs>
  );
};
