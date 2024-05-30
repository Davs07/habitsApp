import HabitRadarChart from "@/components/habits/HabitRadarChart";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { HabitCardContent } from "@/sections/habits/HabitCardContent";
import { useHabitStore } from "@/store/habitStore";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  Ellipsis,
  Heart,
  MoveUpRight,
  Pencil,
  Plus,
  RefreshCcw,
  Share,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HabitList: React.FC = () => {
  const habits = useHabitStore((state) => state.habits);
  const onRemoveHabit = useHabitStore((state) => state.removeHabit);
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  const handleRedirect = (id: string) => {
    navigate(`/habit/${id}`);
  };

  const [openHabitForm, setOpenHabitForm] = useState<boolean>(false);

  const onClose = () => {
    setOpenHabitForm(false);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div className="h-full w-max justify-center items-start place-items-center gap-2 grid grid-cols-1 mt-32">
      <Tabs
        className=" grid place-items-center max-w-screen-xl w-screen "
        defaultValue={"habits"}>
        <div className="w-full flex justify-between">
          <TabsList className="w-max grid grid-cols-2 bg-transparent gap-2 ">
            <TabsTrigger
              value="habits"
              className="w-32 border data-[state=active]:border-card">
              <p>Hábitos</p>
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="w-32 border data-[state=active]:border-card">
              <p>Estadísticas</p>
            </TabsTrigger>
          </TabsList>
          <div>
            <Dialog open={openHabitForm} onOpenChange={setOpenHabitForm}>
              <DialogTrigger className="w-max">
                <Button
                  variant={"secondary"}
                  className="bg-main/80 hover:bg-main text-white">
                  <Plus />
                  Agregar Hábito
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0">
                <HabitForm onClose={onClose} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="w-full ">
          <TabsContent value="stats">
            <HabitRadarChart />
          </TabsContent>
          <TabsContent value="habits" className="w-full grid ">
            <div className="h-max w-full gap-4 grid grid-cols-3">
              {habits.map((habit) => {
                return (
                  <Card
                    className={cn(
                      "space-y-0 w-full max-w-[500px] py-2 rounded-2xl",

                      habit.color?.value
                        ? `bg-${habit.color.value}-500/60`
                        : "bg-card"
                    )}
                    key={habit.id}>
                    <CardHeader className="space-y-0 py-1 px-3  flex-row justify-between">
                      <div key={habit.id}>
                        {isEditMode ? (
                          <Input defaultValue={habit.name} />
                        ) : (
                          <p>{habit.name}</p>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button className="" variant={"ghost"} size={"icon"}>
                            <Ellipsis size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 rounded-2xl ">
                          <DropdownMenuItem>
                            <Button
                              className="flex justify-start gap-2 w-full rounded-lg font-normal"
                              variant={"ghost"}
                              onClick={() => {
                                handleRedirect(habit.id);
                              }}>
                              <MoveUpRight size={16} />
                              <p>Ver detalles</p>
                            </Button>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem>
                            <Button
                              className="flex justify-start gap-2 w-full rounded-lg font-normal"
                              variant={"ghost"}
                              onClick={toggleEditMode}>
                              <Pencil size={16} />
                              <p>Editar</p>
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button
                              className="flex justify-start gap-2 w-full rounded-lg font-normal"
                              variant={"ghost"}>
                              <Heart size={16} />
                              <p>Añadir a Favoritos</p>
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button
                              className="flex justify-start gap-2 w-full rounded-lg font-normal"
                              variant={"ghost"}>
                              <RefreshCcw size={16} />
                              <p>Reiniciar valor</p>
                            </Button>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Button
                              className="flex justify-start gap-2 w-full rounded-lg font-normal"
                              variant={"ghost"}>
                              <Share size={16} />
                              <p>Compartir</p>
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem>
                            <Button
                              className="flex justify-start gap-2 w-full rounded-lg font-normal text-destructive hover:text-destructive "
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
                    <HabitCardContent habit={habit} />
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
