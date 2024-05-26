import { HabitsTabs } from "@/sections/habits/HabitsTabs";

export const HabitsPage = () => {
  return (
    <div className=" h-max w-full flex items-center justify-center ">
      <div className="h-max flex justify-center flex-col mt-16">
        <h2>Buenos días, Davy</h2>
        <p className="tb text-gray-600">
          ¿Qué hábitos pondrás en práctica hoy?
        </p>
        <div className="flex justify-center">
          <HabitsTabs />
        </div>
      </div>
    </div>
  );
};
