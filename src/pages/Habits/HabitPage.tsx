import { Habit } from "@/api/habit-types";
import { Calendario } from "@/components/Calendario";
import { Chart } from "@/components/Chart";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DetailsHabit } from "@/sections/habit/detailsHabit";
import { Streak, Times } from "@/sections/habit/statsHabit";
import { useHabitStore } from "@/store/habitStore";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const HabitPage = () => {
  const { id } = useParams<{ id: string }>();

  const [editMode, setEditMode] = useState<boolean>(false);

  const habit = useHabitStore<Habit>((state) => {
    const foundHabit = state.habits.find((habit) => habit.id === id);
    if (!foundHabit) {
      throw new Error(`Hábito con el id ${id} no encontrado`);
    }
    return foundHabit;
  });
  const updateHabit = useHabitStore((state) => state.updateHabit);

  const handleCheckboxChange = (date: string) => {
    const newCompletedDays = habit?.completedDays?.some(
      (day) => day.date === date
    )
      ? habit.completedDays.filter((day) => day.date !== date)
      : [...(habit.completedDays ?? []), { date, completed: true }];

    if (id !== undefined && habit) {
      updateHabit(id, { completedDays: newCompletedDays });
    } else {
      return;
    }
  };

  if (!habit) {
    return <div>Hábito no encontrado</div>;
  }

  return (
    <div className="h-full w-full max-w-[900px] justify-start items-start gap-12 col-span-6 grid grid-cols-1 py-12 px-2 ">
      <div className="flex flex-col gap-12">
        <div className="flex w-full justify-center">
          {editMode ? (
            <h2
              onClick={() => setEditMode(true)}
              className="w-full text-center py-1 text-4xl font-medium text-primary">
              {habit.name}
            </h2>
          ) : (
            <Input
              id="name"
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditMode(false);
                }
              }}
              onChange={(event) => {
                updateHabit(habit.id, {
                  name: event.target.value,
                });
              }}
              placeholder="Hábito sin nombre"
              className="rounded-2xl h-12 w-full max-w-full text-center text-4xl font-medium text-primary border-none resize-none "
              value={habit.name}
            />
          )}
        </div>
        <h3>Información</h3>
        <div className="flex flex-col gap-8">
          <h4>Descripción</h4>
          <div className="w-full sm:px-8">
            <Textarea
              id="description"
              placeholder="Descripción"
              onChange={(event) => {
                updateHabit(habit.id, {
                  description: event.target.value,
                });
              }}
              className="rounded-2xl bg-white border-none resize-none"
              value={habit.description}
            />
          </div>
        </div>
        <div className="grid grid-rows-1 md:grid-cols-2 gap-8  ">
          <div className="flex flex-col gap-6">
            <h4>Calendario</h4>
            <div className="w-full h-full grid place-items-center  sm:pl-8">
              <Calendario
                habit={habit}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>
          <DetailsHabit habit={habit} />
        </div>
      </div>
      <div className="flex flex-col gap-12 ">
        <h3 className="mb-2">Estadísticas</h3>
        <div className="flex w-full flex-col gap-8 ">
          <Streak habit={habit} />
          <Times habit={habit} />
          <div className="flex flex-col gap-6 w-full ">
            <h4>Mes</h4>
            <div className=" w-full sm:px-8 mb-8">
              <Chart habit={habit} completedDays={habit.completedDays} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
