import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Habit } from "@/api/habit-types";
import { HabitForm } from "@/components/habits/habitForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useHabitStore } from "@/store/habitStore";
import { useState } from "react";

export const Navbar = () => {
  const habits = useHabitStore<Habit[]>((state) => state.habits);
  const location = useLocation();

  const [openHabitForm, setOpenHabitForm] = useState<boolean>(false);

  const onClose = () => {
    setOpenHabitForm(false);
  };

  return (
    <aside className="col-span-2 bg-card h-full w-[280px] flex justify-start p-4">
      <div className="w-full h-full">
        <nav>
          <ul className="flex flex-col gap-1 text-primary">
            <Dialog open={openHabitForm} onOpenChange={setOpenHabitForm}>
              <DialogTrigger>
                <Button variant="outline" className="mb-2 hover:text-main">
                  <Plus />
                  Crear hábito
                </Button>
              </DialogTrigger>
              <DialogContent>
                <HabitForm onClose={onClose} />
              </DialogContent>
            </Dialog>
             <li>
              <Link to="">
                <Button
                  asChild
                  variant={"ghost"}
                  className={`w-full justify-start hover:text-main ${
                    location.pathname === "/" ? "bg-secondary text-main" : ""
                  }`}>
                  Pendiente
                </Button>
              </Link>
            </li>

            {/*
            <li>
              <Link to="/habitlist">
                <Button
                  asChild
                  variant={"ghost"}
                  className={`w-full justify-between font-bold hover:text-main ${
                    location.pathname === "/habitlist"
                      ? "bg-secondary text-main"
                      : ""
                  }`}>
                  Hábitos
                  <ChevronDown />
                </Button>
              </Link>
            </li>

            {habits.map((habit) => (
              <li key={habit.id}>
                <Link to={`/habit/${habit.id}`}>
                  <Button
                    asChild
                    variant={"ghost"}
                    className={`w-full justify-start gap-2 font-normal hover:text-main ${
                      location.pathname === `/habit/${habit.id}`
                        ? "bg-secondary text-main"
                        : ""
                    }`}>
                    <SquareCheck strokeWidth={1} height={15} />
                    {habit.name}
                  </Button>
                </Link>
              </li>
            ))} */}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
