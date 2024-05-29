import { HabitForm } from "@/components/habits/habitForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useHabitStore } from "@/store/habitStore";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Copy, Ellipsis, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HabitList: React.FC = () => {
  const habits = useHabitStore((state) => state.habits);
  const onRemoveHabit = useHabitStore((state) => state.removeHabit);
  const navigate = useNavigate();

  const handleRedirect = (id: string) => {
    navigate(`/habit/${id}`);
  };

  const [openHabitForm, setOpenHabitForm] = useState<boolean>(false);

  const onClose = () => {
    setOpenHabitForm(false);
  };

  return (
    <div className="h-full w-max justify-start items-start gap-2 grid grid-cols-1 mt-32">
      <div className="h-max w-max gap-4 grid grid-cols-1 place-items-center">
        {habits.map((habit) => (
          <Card
            className={cn(
              "space-y-0 w-[500px] py-2 rounded-2xl",

              habit.color?.value ? `bg-${habit.color.value}-500/60` : "bg-card"
            )}
            key={habit.id}>
            <CardHeader
              className="space-y-0 py-1 px-3  flex-row justify-between"
              onClick={() => handleRedirect(habit.id)}>
              <div key={habit.id}>{habit.name}</div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="" variant={"ghost"} size={"icon"}>
                    <Ellipsis size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem>
                    <Button
                      className="flex justify-start gap-2 w-full rounded-lg"
                      variant={"ghost"}>
                      <Pencil size={16} />
                      <p>Editar</p>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      className="flex justify-start gap-2 w-full rounded-lg"
                      variant={"ghost"}>
                      <Copy size={16} />
                      <p>Duplicar</p>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button
                      className="flex justify-start gap-2 w-full rounded-lg text-destructive hover:text-destructive"
                      variant={"ghost"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveHabit(habit.id);
                      }}>
                      <Trash size={16} />
                      Eliminar
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-0 pt-0 pb-0 flex gap-2 px-3 text-slate-800">
              <p className="txs">{habit.category}</p>
              <p className="txs">{habit.frequency.type}</p>
              <p className="txs">{habit.priority}</p>
              <p className="txs">{habit.goal.meta.toString()}</p>
            </CardContent>
          </Card>
        ))}
        <Dialog open={openHabitForm} onOpenChange={setOpenHabitForm}>
          <DialogTrigger className="w-max">
            <Button>Agregar Hábito</Button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <HabitForm onClose={onClose} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
