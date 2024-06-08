import {
  Habit,
  Frequency,
  Goal,
  SmartDescription,
  isValidFrequency,
} from "./habit-types";
import { Category, Day } from "./shared-types";

export function createHabit(data: Partial<Habit>): Habit {
  // Validar y completar la información faltante
  const id = data.id || generateUniqueId();
  const name = data.name || "";
  const description = data.description || "";
  const frequency = validateFrequency(data.frequency);
  const category = validateCategory(data.category);
  const goal = validateGoal(data.goal);
  const smartDescription = validateSmartDescription(data.smartDescription);
  const comments = data.comments || [];

  // Crear y retornar la instancia de Habit
  return {
    id,
    name,
    description,
    frequency,
    category,
    goal,
    smartDescription,
    comments,
  };
}

function validateFrequency(frequency?: Frequency): Frequency {
  if (!frequency) {
    return { type: "TodosLosDias" };
  }

  if (!isValidFrequency(frequency)) {
    throw new Error("La frecuencia proporcionada no es válida");
  }

  return frequency;
}

function validateCategory(category?: Category): Category {
  if (!category) {
    return Category.Crecimiento;
  }

  return category;
}

function validateGoal(goal?: Goal): Goal {
  if (!goal) {
    return { type: "SiNo", meta: false };
  }

  return goal;
}

function validateSmartDescription(
  smartDescription?: SmartDescription
): SmartDescription {
  if (!smartDescription) {
    return {
      purposeAndMotivation: "",
      benefitsAndConsequences: "",
      currentHabitsAndEnvironment: "",
      capacityAndResources: "",
      possibleObstaclesAndSolutions: "",
    };
  }

  return smartDescription;
}

function generateUniqueId(): string {
  // Implementación para generar un identificador único
  return Math.random().toString(36).substr(2, 9);
}


