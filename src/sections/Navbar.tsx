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
          <ul className="flex flex-col gap-1">
            <Button variant="outline" className="mb-2">
              <Plus />
              Crear hábito
            </Button>
            <li>
              <Link to="/habittry">
                <Button
                  variant={"ghost"}
                  className={`w-full justify-start ${
                    location.pathname === "/habittry" ? "bg-secondary" : ""
                  }`}>
                  Pendiente
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/habitlist">
                <Button
                  variant={"ghost"}
                  className={`w-full justify-between font-bold ${
                    location.pathname === "/habitlist" ? "bg-secondary" : ""
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
                    className={`w-full justify-start gap-2 font-normal ${
                      location.pathname === `/habit/${habit.id}`
                        ? "bg-secondary"
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
