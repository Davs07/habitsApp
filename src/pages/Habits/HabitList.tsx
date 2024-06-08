import SearchComponent from "@/components/SearchComponent";
import HabitRadarChart from "@/components/habits/HabitRadarChart";
import { HabitForm } from "@/components/habits/habitForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/custom/text";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { HabitCardContent } from "@/sections/habits/HabitCardContent";
import { useHabitStore } from "@/store/habitStore";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  ArrowDownUp,
  Ellipsis,
  Heart,
  LayoutGrid,
  ListFilter,
  MoveUpRight,
  Pencil,
  Plus,
  RefreshCcw,
  Share,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CategoryColors } from "@/api/shared-types";

export const HabitList: React.FC = () => {
  const habits = useHabitStore((state) => state.habits);
  const onRemoveHabit = useHabitStore((state) => state.removeHabit);
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => console.log(data));

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
        <div className="w-full flex justify-between items-center">
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
        <Separator orientation="horizontal" />
        <div className="w-full px-2">
          <TabsContent value="stats">
            <HabitRadarChart />
          </TabsContent>
          <TabsContent value="habits" className="w-full flex flex-col gap-4 ">
            <div className="w-full justify-between items-center flex  flex-row">
              <SearchComponent />

              <div>
                <Button variant={"ghost"}>
                  <ListFilter size={16} />
                  <Text variant={"psm"}>Filtrar</Text>
                </Button>
                <Button variant={"ghost"}>
                  <ArrowDownUp size={16} />
                  Ordenar
                </Button>
                <Button variant={"ghost"}>
                  <LayoutGrid size={16} />
                  Mostrar
                </Button>
              </div>
            </div>

            <div className="h-max w-full gap-4 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => {
                return (
                  <Card
                    className={`border border-${
                      CategoryColors[habit.category]
                    }-500/60 space-y-0 w-full max-w-[500px] py-2 rounded-lg `}
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
                              <p>Abrir</p>
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
