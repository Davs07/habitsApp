import { Route, Routes } from "react-router-dom";
import { HabitList } from "./pages/Habits/HabitList";
import { HabitPage } from "./pages/Habits/HabitPage";
import { HabitTry } from "./pages/Habits/HabitTry";
import { Navbar } from "./sections/Navbar";

function App() {
  return (
    <div className="h-screen overflow-hidden flex flex-row   bg-background ">
      {/* <Navbar /> */}
      <div className="w-full flex-1 flex justify-center overflow-y-auto max-w-screen overflow-x-hidden ">
        <Routes>
          <Route path="" element={<HabitTry />} />
          <Route path="/habitlist" element={<HabitList />} />
          <Route path="/habit/:id" element={<HabitPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
