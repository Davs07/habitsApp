import { Route, Routes } from "react-router-dom";
import { HabitsPage } from "./pages/Habits/HabitsPage";
import { Try } from "./layouts/Try";
import { HabitTry } from "./layouts/HabitTry";
import { HabitList } from "./layouts/HabitList";

function App() {
  return (
    <div className="h-screen overflow-hidden grid place-items-center bg-background overflow-y-auto ">
      <Routes>
        <Route path="/" element={<HabitsPage />} />
        <Route path="/try" element={<Try />} />
        <Route path="/habittry" element={<HabitTry />} />
        <Route path="/habitlist" element={<HabitList />} />
      </Routes>
    </div>
  );
}

export default App;
