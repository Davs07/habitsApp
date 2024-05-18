import { Route, Routes } from "react-router-dom";
import { HabitsPage } from "./pages/Habits/HabitsPage";
import { Try } from "./pages/Habits/Try";
import { HabitTry } from "./pages/Habits/HabitTry";
import { HabitList } from "./pages/Habits/HabitList";
import { HabitPage } from "./pages/Habits/HabitPage";

function App() {
  return (
    <div className="h-screen overflow-hidden grid place-items-center bg-background overflow-y-auto ">
      <Routes>
        <Route path="/" element={<HabitsPage />} />
        <Route path="/try" element={<Try />} />
        <Route path="/habittry" element={<HabitTry />} />
        <Route path="/habitlist" element={<HabitList />} />
        <Route path="/habitpage" element={<HabitPage />} />
      </Routes>
    </div>
  );
}

export default App;
