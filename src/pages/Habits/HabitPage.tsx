import { useParams } from "react-router-dom";
import React from "react";
import { useHabitStore } from "@/store/habitStore";
import { Calendario } from "@/components/Calendario";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Chart } from "@/components/Chart";
import { Habit } from "@/api/habit-types";

export const HabitPage = () => {
  const { id } = useParams<{ id: string }>();

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
    <div className="h-full w-max max-w-[700px] justify-start items-start gap-12 col-span-6 grid grid-cols-1 py-12">
      <div className="flex flex-col gap-6">
        <div className="flex w-full justify-center">
          <h2>{habit.name}</h2>
        </div>
        <h3>Información</h3>
        <div className="flex flex-col space-y-1.5">
          <h4>Descripción</h4>
          <Textarea
            id="description"
            placeholder="Descripción"
            className="rounded-2xl bg-white border-none resize-none"
            value={habit.description}
          />
        </div>
        <div className="grid grid-cols-2">
          <div>
            <h4>Calendario</h4>
            <Calendario
              habit={habit}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <div className="">
            <h4>Datos</h4>
            <div className="grid grid-rows-3 gap-2 text-sm bg-white rounded-2xl h-full">
              <div className="grid place-items-center grid-cols-2">
                <Label>Frecuencia</Label>
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
              </div>
              <div className="grid place-items-center grid-cols-2">
                <Label>Meta</Label>
                <div className="flex  flex-col p-2 w-full justify-center gap-2">
                  <p>{habit.goal.type}:</p>
                  <Card>
                    <p>{habit.goal.meta} min</p>
                  </Card>
                </div>
              </div>
              <div className="grid place-items-center grid-cols-2">
                <Label>Categoría</Label>
                <Card className="flex p-2 w-full justify-center">
                  <p>{habit.category}</p>
                </Card>
              </div>
              <div className="grid place-items-center grid-cols-2">
                <Label>Prioridad</Label>
                <Card className="flex p-2 w-full justify-center">
                  <p>Alta</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3>Estadísticas</h3>
        <div>
          <div>
            <h4>Racha</h4>
            <div className="text-blue-500 flex justify-around items-center bg-white p-8 rounded-2xl">
              <div>
                <p>Actual</p>
                <Label>0 días</Label>
              </div>
              <div>
                <p>Mejor</p>
                <Label>0 días</Label>
              </div>
            </div>
          </div>
          <div>
            <h4>Veces</h4>
            <div className="text-blue-500 grid grid-cols-3 justify-between bg-white p-8 rounded-2xl">
              <div className="flex flex-col justify-between items-center">
                <p>Esta semana</p>
                <Label>{habit.completedDays?.length}</Label>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p>Esta mes</p>
                <Label>7 días</Label>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p>Esta año</p>
                <Label>12 días</Label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>Mes</h4>
          <div>
            <div className="bg-white py-8 rounded-2xl">
              <Chart habit={habit} completedDays={habit.completedDays} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
