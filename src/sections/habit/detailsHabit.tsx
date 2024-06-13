import { Habit } from "@/api/habit-types";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

interface detailsHabitProps {
  habit: Habit;
}
export const DetailsHabit = ({ habit }: detailsHabitProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h4>Detalles</h4>
      <div className="w-full h-full sm:pr-8">
        <div className="grid grid-rows-7 grid-cols-2 gap-8 text-sm   h-full ">
          <Card className=" row-span-4 flex flex-col justify-center  gap-3 w-full">
            <div className="w-full ml-12">
              <p>Frecuencia</p>
            </div>
            <div className="flex flex-col p-2 w-full justify-center gap-2">
              {habit.frequency && (
                <>
                  <Label>{habit.frequency.type}</Label>
                  <Card className="flex p-2 w-full justify-center">
                    {habit.frequency.type === "DiasEspecificos" ? (
                      <p>{habit.frequency.dias.join(", ")}</p>
                    ) : habit.frequency.type === "CadaXdías" ? (
                      <p>{habit.frequency.veces}</p>
                    ) : null}
                  </Card>
                </>
              )}
            </div>
          </Card>
          <Card className=" row-span-4 flex flex-col justify-center  gap-3 w-full">
            <div className="w-full ml-12">
              <p>Meta</p>
            </div>
            <div className="flex  flex-col p-2 w-full justify-center gap-2 ">
              {habit.goal && (
                <>
                  <Label>{habit.goal.type}:</Label>
                  <Card>
                    <p>{habit.goal.meta} min</p>
                  </Card>
                </>
              )}
            </div>
          </Card>
          <Card className=" row-span-3 flex flex-col justify-center  gap-3 w-full">
            <div className="w-full ml-12">
              <p>Categoría</p>
            </div>
            <Card className="flex p-2 w-full justify-center">
              <Label>{habit.category}</Label>
            </Card>
          </Card>
          <Card className=" row-span-3 flex flex-col justify-center  gap-3 w-full">
            <div className="w-full ml-12">
              <p>Prioridad</p>
            </div>
            <Card className="flex p-2 w-full justify-center">
              <Label>Alta</Label>
            </Card>
          </Card>
        </div>
      </div>
    </div>
  );
};
