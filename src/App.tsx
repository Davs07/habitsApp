import { ChevronDown, Plus, SquareCheck } from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";
import { Habit } from "./api/habit-types";
import { Button } from "./components/ui/button";
import { HabitList } from "./pages/Habits/HabitList";
import { HabitPage } from "./pages/Habits/HabitPage";
import { HabitTry } from "./pages/Habits/HabitTry";
import { HabitsPage } from "./pages/Habits/HabitsPage";
import { useHabitStore } from "./store/habitStore";

function App() {
  const habits = useHabitStore<Habit[]>((state) => state.habits);

  return (
    <div className="h-screen overflow-hidden flex flex-row   bg-background ">
      <aside className=" col-span-2 bg-card h-full w-[280px] justify-start p-4">
        <div className="w-full h-full ">
          <nav>
            <ul className="flex flex-col">
              <Button variant="outline" className="mb-2 ">
                <Plus />
                Crear hábito
              </Button>
              <li>
                <Link to="/habittry">
                  <Button variant={"ghost"} className="w-full justify-start ">
                    Pendiente
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/habitlist">
                  <Button
                    variant={"ghost"}
                    className="w-full justify-between font-bold ">
                    Hábitos
                    <ChevronDown />
                  </Button>
                </Link>
              </li>
             
              {
                habits.map(
                  (habit) => (
                    <li key={habit.id}>
                      <Link to={`/habit/${habit.id}`}>
                        <Button
                          variant={"ghost"}
                          className="w-full justify-start gap-2 font-normal">
                          <SquareCheck strokeWidth={1} height={15} />
                          {habit.name}
                        </Button>
                      </Link>
                    </li>
                  )
                )
              }
            </ul>
          </nav>
        </div>
      </aside>
      <div className="w-full flex-1 flex justify-center overflow-y-auto ">
        <Routes>
          <Route path="/" element={<HabitsPage />} />
          <Route path="/habittry" element={<HabitTry />} />
          <Route path="/habitlist" element={<HabitList />} />
          <Route path="/habit/:id" element={<HabitPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
