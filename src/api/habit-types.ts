// habit-types.ts
import { Category, Day } from "./shared-types";

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: Frequency;
  category: Category;
  goal: Goal;
  smartDescription: SmartDescription;
  comments: string[];
  completedDays?: CompletedDay[];
}

export interface CompletedDay {
  date: string; // Fecha en formato ISO (yyyy-mm-dd)
  completed: boolean;
  otherDetails?: any; // Cualquier otro detalle o métrica que desees almacenar
  /* Por ejemplo: otherDetails: {
    duration: 60, // 60 minutos de ejercicio
    type: 'Running'
  } */
}

export interface SmartDescription {
  purposeAndMotivation: string;
  benefitsAndConsequences: string;
  currentHabitsAndEnvironment: string;
  capacityAndResources: string;
  possibleObstaclesAndSolutions: string;
}

export type Frequency =
  | { type: "Diario" }
  | { type: "Semanal"; dias: Day[] }
  | { type: "Mensual"; dias: number[] }
  | { type: "PorPeriodo"; veces: number; periodo: Periodo }
  | { type: "CadaXdías"; veces: number };

export type Periodo = "Semana" | "Mes" | "Año";

export type Goal =
  | { type: "SiNo"; meta: boolean }
  | { type: "Cantidad"; meta: number }
  | { type: "Cronometro"; meta: number }
  | { type: "Subitems"; meta: string[] };

export function isValidFrequency(frequency: Frequency): boolean {
  switch (frequency.type) {
    case "Diario":
      return true;
    case "Semanal":
      return frequency.dias.length > 0;
    case "Mensual":
      return (
        frequency.dias.length > 0 &&
        frequency.dias.every((day) => day >= 1 && day <= 31)
      );
    case "PorPeriodo":
      return frequency.veces > 0;
    default:
      return false;
  }
}
