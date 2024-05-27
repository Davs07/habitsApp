import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, SquareCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Habit } from "@/api/habit-types";
import { useHabitStore } from "@/store/habitStore";

export const Navbar = () => {
  const habits = useHabitStore<Habit[]>((state) => state.habits);
  const location = useLocation();

  return (
    <aside className="col-span-2 bg-card h-full w-[280px] justify-start p-4">
      <div className="w-full h-full">
        <nav>
          <ul className="flex flex-col gap-1 ">
            <Button variant="outline" className="mb-2 hover:text-main">
              <Plus />
              Crear hábito
            </Button>
            <li>
              <Link to="/habittry">
                <Button
                  variant={"ghost"}
                  className={`w-full justify-start hover:text-main ${
                    location.pathname === "/habittry"
                      ? "bg-secondary text-main"
                      : ""
                  }`}>
                  Pendiente
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/habitlist">
                <Button
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
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
