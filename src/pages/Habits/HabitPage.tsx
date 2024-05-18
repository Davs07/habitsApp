import { habits } from "@/api/Habits/Habits";
import { Habit } from "@/api/habit-types";
import { Calendario } from "@/components/Calendario";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export const HabitPage = () => {
  const [habit, setHabit] = React.useState<Habit>(habits[1]);

  return (
    <div className=" h-full w-max justify-start items-start gap-2 grid grid-cols-1  py-12">
      <div className="flex flex-col gap-6">
        <div className="flex w-full justify-center">
          <h2>{habit.name}</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm ">
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
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            placeholder="Descripción"
            className="rounded-2xl"
            value={habit.description}
          />
        </div>

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
      </div>
      <div>
        <h3>Calendario</h3>
        <Calendario />
      </div>
      <div>
        <h3>Estadísticas</h3>
      </div>
    </div>
  );
};
