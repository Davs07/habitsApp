import { Habit } from "@/api/habit-types";
import { Calendario } from "@/components/Calendario";
import { Chart } from "@/components/Chart";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Times, Streak } from "@/sections/habit/statsHabit";
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
        <div className="grid grid-rows-0 sm:grid-cols-2 gap-8  ">
          <div className="flex flex-col gap-6">
            <h4>Calendario</h4>
            <div className="w-full h-full grid place-items-center  sm:pl-8">
              <Calendario
                habit={habit}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4>Detalles</h4>
            <div className="w-full h-full sm:pr-8">
              <div className="grid grid-rows-4 gap-8 text-sm   h-full ">
                <Card className="grid place-items-center grid-cols-2 gap-3 text-left w-full">
                  <div className="w-full text-left ml-12">
                    <Label>Frecuencia</Label>
                  </div>
                  <div className="flex flex-col p-2 w-full justify-center gap-2">
                    <p>{habit.frequency.type}</p>
                    <Card className="flex p-2 w-full justify-center">
                      {habit.frequency.type === "DiasEspecificos" ? (
                        <p>{habit.frequency.dias.join(", ")}</p>
                      ) : habit.frequency.type === "CadaXdías" ? (
                        <p>{habit.frequency.veces}</p>
                      ) : null}
                    </Card>
                  </div>
                </Card>
                <Card className="grid place-items-center grid-cols-2 gap-3 text-left w-full">
                  <div className="w-full text-left ml-12">
                    <Label>Meta</Label>
                  </div>
                  <div className="flex  flex-col p-2 w-full justify-center gap-2 ">
                    <p>{habit.goal.type}:</p>
                    <Card>
                      <p>{habit.goal.meta} min</p>
                    </Card>
                  </div>
                </Card>
                <Card className="grid place-items-center grid-cols-2 gap-3 text-left w-full">
                  <div className="w-full text-left ml-12">
                    <Label>Categoría</Label>
                  </div>
                  <Card className="flex p-2 w-full justify-center">
                    <p>{habit.category}</p>
                  </Card>
                </Card>
                <Card className="grid place-items-center grid-cols-2 gap-3 text-left w-full">
                  <div className="w-full text-left ml-12">
                    <Label>Prioridad</Label>
                  </div>
                  <Card className="flex p-2 w-full justify-center">
                    <p>Alta</p>
                  </Card>
                </Card>
              </div>
            </div>
          </div>
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
