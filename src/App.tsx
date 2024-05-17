import { Route, Router, Routes } from "react-router-dom";
import { HabitsPage } from "./pages/Habits/HabitsPage";
import { Try } from "./layouts/Try";
import { HabitTry } from "./layouts/HabitTry";

function App() {
  return (
    <div className="h-screen overflow-hidden ">
      <Routes>
        <Route path="/" element={<HabitsPage />} />
        <Route path="/try" element={<Try />} />
        <Route path="/habittry" element={<HabitTry />} />
      </Routes>
    </div>
  );
}

export default App;
