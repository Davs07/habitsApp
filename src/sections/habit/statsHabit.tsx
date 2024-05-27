import { Label } from "@/components/ui/label";
import { Habit, CompletedDay } from "@/api/habit-types";
import {
  differenceInDays,
  isThisWeek,
  isThisMonth,
  isThisYear,
  parseISO,
} from "date-fns";
import { Card } from "@/components/ui/card";

// Define la interfaz para el componente StatsHabitProps
interface StatsHabitProps {
  // El objeto de hábito para mostrar estadísticas
  habit: Habit;
}

// Calcular la racha de días completos para un hábito
const calculateStreak = (completedDays: CompletedDay[]) => {
  // Si no hay días completos, devuelve una racha de 0
  if (completedDays.length === 0) return { current: 0, best: 0 };

  // Filtra y ordena los días completos por fecha
  const sortedDays = completedDays
    .filter((day) => day.completed)
    .map((day) => parseISO(day.date))
    .sort((a, b) => a.getTime() - b.getTime());

  // Inicializa variables para rastrear la racha actual y la mejor
  let currentStreak = 0;
  let bestStreak = 0;
  let streak = 1;

  // Itera a través de los días ordenados para calcular la racha
  for (let i = 1; i < sortedDays.length; i++) {
    if (differenceInDays(sortedDays[i], sortedDays[i - 1]) === 1) {
      // Si los días son consecutivos, incrementa la racha
      streak += 1;
    } else {
      // Si los días no son consecutivos, actualiza la mejor racha y reinicia la racha actual
      if (streak > bestStreak) {
        bestStreak = streak;
      }
      streak = 1;
    }
  }

  // Actualiza la mejor racha si la racha actual es mayor
  bestStreak = Math.max(bestStreak, streak);

  // Verifica si el último día completo fue ayer para determinar la racha actual
  const lastCompletionDate = sortedDays[sortedDays.length - 2];
  if (differenceInDays(new Date(), lastCompletionDate) === 1) {
    currentStreak = streak;
  }

  // Devuelve la racha actual y la mejor
  return { current: currentStreak, best: bestStreak };
};

// Contar el número de días completos dentro de un período especificado
const countCompletions = (
  completedDays: CompletedDay[],
  periodCheck: (date: Date) => boolean
) => {
  // Filtra los días completos según la verificación del período y devuelve la cuenta
  return completedDays.filter(
    (day) => day.completed && periodCheck(parseISO(day.date))
  ).length;
};

// Define el componente Streak para mostrar estadísticas de hábitos
export function Streak({ habit }: StatsHabitProps) {
  // Obtiene los días completos para el hábito
  const completedDays = habit.completedDays ?? [];

  // Calcula la racha actual y la mejor
  const { current, best } = calculateStreak(completedDays);

  // Renderiza las estadísticas de racha
  return (
    <div className="flex flex-col gap-3 items-center text-start ">
      <h4 className="w-full">Racha</h4>
      <div className=" w-full text-sm  grid grid-cols-2 grid-rows-1 gap-8 justify-between  sm:px-8 rounded-2xl">
        <Card className="w-full h-32 grid place-items-center px-0 py-8 ">
          <p>Actual</p>
          <Label>{current} días</Label>
        </Card>
        <Card className="w-full h-32 grid place-items-center px-0 py-8 ">
          <p>Mejor</p>
          <Label>{best} días</Label>
        </Card>
      </div>
    </div>
  );
}

// Define el componente Times para mostrar tiempos de completitud para un hábito
export const Times = ({ habit }: StatsHabitProps) => {
  // Obtiene los días completos para el hábito
  const completedDays = habit.completedDays ?? [];

  // Cuenta el número de días completos para cada período

  // Cuenta el número de días completados para la semana actual, considerando que la semana empieza el lunes
  const weekCount = countCompletions(completedDays, (date) =>
    isThisWeek(date, { weekStartsOn: 1 })
  );
  const monthCount = countCompletions(completedDays, isThisMonth);
  const yearCount = countCompletions(completedDays, isThisYear);

  // Renderiza los tiempos de completitud
  return (
    <div className="flex flex-col gap-3 items-center text-start ">
      <h4 className=" w-full">Veces</h4>
      <div className=" w-full text-sm  grid grid-rows-1 grid-cols-3  gap-8 justify-between  sm:px-8 rounded-2xl">
        <Card className="w-full h-32 grid place-items-center px-0 py-8 ">
          <p>Esta semana</p>
          <Label>{weekCount} días</Label>
        </Card>
        <Card className="w-full h-32 grid place-items-center px-0 py-8 ">
          <p>Este mes</p>
          <Label>{monthCount} días</Label>
        </Card>
        <Card className="w-full h-32 grid place-items-center px-0 py-8 ">
          <p>Este año</p>
          <Label>{yearCount} días</Label>
        </Card>
      </div>
    </div>
  );
};

/*

import { Label } from "@/components/ui/label";
import { Habit, CompletedDay } from "@/api/habit-types";
import {
  differenceInDays,
  isThisWeek,
  isThisMonth,
  isThisYear,
  parseISO,
} from "date-fns";
import { Card, CardHeader } from "@/components/ui/card";

// Define la interfaz para el componente StatsHabitProps
interface StatsHabitProps {
  // El objeto de hábito para mostrar estadísticas
  habit: Habit;
}

// Calcular la racha de días completos para un hábito
const calculateStreak = (completedDays: CompletedDay[]) => {
  // Si no hay días completos, devuelve una racha de 0
  if (completedDays.length === 0) return { current: 0, best: 0 };

  // Filtra y ordena los días completos por fecha
  const sortedDays = completedDays
    .filter((day) => day.completed)
    .map((day) => parseISO(day.date))
    .sort((a, b) => a.getTime() - b.getTime());

  // Inicializa variables para rastrear la racha actual y la mejor
  let currentStreak = 0;
  let bestStreak = 0;
  let streak = 1;

  // Itera a través de los días ordenados para calcular la racha
  for (let i = 1; i < sortedDays.length; i++) {
    if (differenceInDays(sortedDays[i], sortedDays[i - 1]) === 1) {
      // Si los días son consecutivos, incrementa la racha
      streak += 1;
    } else {
      // Si los días no son consecutivos, actualiza la mejor racha y reinicia la racha actual
      if (streak > bestStreak) {
        bestStreak = streak;
      }
      streak = 1;
    }
  }

  // Actualiza la mejor racha si la racha actual es mayor
  bestStreak = Math.max(bestStreak, streak);

  // Verifica si el último día completo fue ayer para determinar la racha actual
  const lastCompletionDate = sortedDays[sortedDays.length - 2];
  if (differenceInDays(new Date(), lastCompletionDate) === 1) {
    currentStreak = streak;
  }

  // Devuelve la racha actual y la mejor
  return { current: currentStreak, best: bestStreak };
};

// Contar el número de días completos dentro de un período especificado
const countCompletions = (
  completedDays: CompletedDay[],
  periodCheck: (date: Date) => boolean
) => {
  // Filtra los días completos según la verificación del período y devuelve la cuenta
  return completedDays.filter(
    (day) => day.completed && periodCheck(parseISO(day.date))
  ).length;
};

// Define el componente Streak para mostrar estadísticas de hábitos
export function Streak({ habit }: StatsHabitProps) {
  // Obtiene los días completos para el hábito
  const completedDays = habit.completedDays ?? [];

  // Calcula la racha actual y la mejor
  const { current, best } = calculateStreak(completedDays);

  // Renderiza las estadísticas de racha
  return (
    <div className="flex flex-col gap-3 items-center text-start ">
      <h4 className="w-full">Racha</h4>
      <div className=" w-[80%]  sm:w-full  grid grid-rows-2 grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 gap-8 justify-between  px-8 rounded-2xl">

        <Card className="w-full h-32 grid place-items-center px-0 py-8 ">
          <p>Actual</p>
          <Label>{current} días</Label>
        </Card>
        <Card className="w-full h-32 grid place-items-center px-0 py-8 ">
          <p>Mejor</p>
          <Label>{best} días</Label>
        </Card>
      </div>
    </div>
  );
}

// Define el componente Times para mostrar tiempos de completitud para un hábito
export const Times = ({ habit }: StatsHabitProps) => {
  // Obtiene los días completos para el hábito
  const completedDays = habit.completedDays ?? [];

  // Cuenta el número de días completos para cada período

  // Cuenta el número de días completados para la semana actual, considerando que la semana empieza el lunes
  const weekCount = countCompletions(completedDays, (date) =>
    isThisWeek(date, { weekStartsOn: 1 })
  );
  const monthCount = countCompletions(completedDays, isThisMonth);
  const yearCount = countCompletions(completedDays, isThisYear);

  // Renderiza los tiempos de completitud
  return (
    <div className="flex flex-col gap-3 items-center text-start ">
      <h4 className=" w-full">Veces</h4>
      <div className=" w-[80%]  sm:w-full  grid grid-rows-3 grid-cols-1 sm:grid-cols-3 sm:grid-rows-1 gap-8 justify-between  px-8 rounded-2xl">
        <Card className="w-full h-32 grid place-items-center px-0 py-8 ">
          <p>Esta semana</p>
          <Label>{weekCount} días</Label>
        </Card>
        <Card className="w-full h-32 grid place-items-center px-0 py-8 ">
          <p>Este mes</p>
          <Label>{monthCount} días</Label>
        </Card>
        <Card className="w-full h-32 grid place-items-center px-0 py-8 ">
          <p>Este año</p>
          <Label>{yearCount} días</Label>
        </Card>
      </div>
    </div>
  );
};

*/
