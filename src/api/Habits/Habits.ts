import { Habit } from "../habit-types";

import { Category, Day } from "../shared-types";

// Ejemplo de hábitos
export const habits: Habit[] = [
  {
    id: "2",
    name: "Lectura diaria",
    description: "Leer al menos 30 minutos cada día.",
    frequency: { type: "TodosLosDias" },
    category: Category.Productividad,
    goal: { type: "Cronometro", meta: 30 },
    smartDescription: {
      purposeAndMotivation:
        "Quiero leer más para ampliar mis conocimientos y mejorar mi concentración.",
      benefitsAndConsequences:
        "Leer regularmente me ayudará a adquirir conocimientos y mejorar mis habilidades cognitivas.",
      currentHabitsAndEnvironment:
        "Suelo pasar mucho tiempo en redes sociales. Planifico dedicar tiempo específico para la lectura.",
      capacityAndResources:
        "Tengo libros y acceso a bibliotecas y recursos en línea.",
      possibleObstaclesAndSolutions:
        "La falta de tiempo puede ser un obstáculo, así que ajustaré mi horario para incluir la lectura.",
    },
    comments: [
      "Leer diariamente ha mejorado mi enfoque y mi conocimiento en varias áreas.",
    ],
    priority: "Alta",
    completedDays: [
      {
        date: "2024-02-13",
        completed: true,
        otherDetails: "Caminé 10,000 pasos",
      },
      {
        date: "2024-03-13",
        completed: true,
        otherDetails: "Caminé 10,000 pasos",
      },
      {
        date: "2024-05-13",
        completed: true,
        otherDetails: "Caminé 10,000 pasos",
      },
      {
        date: "2024-05-15",
        completed: true,
        otherDetails: "Caminé 10,000 pasos",
      },
      {
        date: "2024-05-16",
        completed: true,
        otherDetails: "Caminé 10,000 pasos",
      },
      {
        date: "2024-05-17",
        completed: true,
        otherDetails: "Caminé 10,000 pasos",
      },
    ],
  },
  {
    id: "3",
    name: "Estudio de programación",
    description:
      "Estudiar programación durante al menos 1 hora los lunes, miércoles y viernes.",
    frequency: {
      type: "DiasEspecificos",
      dias: [Day.Lunes, Day.Miercoles, Day.Viernes],
    },
    category: Category.Bienestar,
    goal: { type: "Cronometro", meta: 60 },
    smartDescription: {
      purposeAndMotivation:
        "Quiero mejorar mis habilidades de programación para avanzar en mi carrera profesional.",
      benefitsAndConsequences:
        "Estudiar programación regularmente me ayudará a adquirir nuevas habilidades y conocimientos, lo que puede aumentar mis oportunidades laborales y mi potencial de ingresos. Si no estudio, podría quedarme rezagado en comparación con mis colegas y perder oportunidades de crecimiento profesional.",
      currentHabitsAndEnvironment:
        "Actualmente, paso mucho tiempo viendo televisión en mi tiempo libre, lo que no contribuye a mi crecimiento profesional. Para facilitar el hábito de estudio de programación, planeo establecer un horario dedicado para estudiar los lunes, miércoles y viernes.",
      capacityAndResources:
        "Tengo suficiente tiempo libre los lunes, miércoles y viernes para estudiar programación, y cuento con acceso a recursos en línea como cursos y tutoriales.",
      possibleObstaclesAndSolutions:
        "Un obstáculo podría ser el agotamiento o la falta de motivación. Para superar esto, planeo establecer pequeños objetivos alcanzables y recompensarme por mi progreso.",
    },
    comments: [
      "Este hábito me ha ayudado a sentirme más preparado y confiado en mi carrera profesional.",
    ],
    priority: "Baja",

    completedDays: [],
  },
  {
    id: "4",
    name: "Meditación diaria",
    description: "Practicar meditación durante 15 minutos cada mañana.",
    frequency: { type: "TodosLosDias" },
    category: Category.Bienestar,
    goal: { type: "Cronometro", meta: 15 },
    smartDescription: {
      purposeAndMotivation:
        "Quiero reducir el estrés y aumentar la claridad mental mediante la meditación diaria.",
      benefitsAndConsequences:
        "La meditación regular puede mejorar mi bienestar emocional y reducir el estrés.",
      currentHabitsAndEnvironment:
        "Actualmente, me siento estresado y disperso. Planeo dedicar tiempo específico por la mañana para meditar.",
      capacityAndResources:
        "Tengo acceso a aplicaciones y guías de meditación.",
      possibleObstaclesAndSolutions:
        "La falta de constancia podría ser un problema, así que estableceré recordatorios diarios y empezaré con sesiones cortas.",
    },
    priority: "Muy alta",

    comments: [
      "La meditación diaria ha mejorado mi bienestar emocional y mi capacidad de concentración.",
    ],
    completedDays: [],
  },
  {
    id: "5",
    name: "Diario de gratitud",
    description: "Escribir tres cosas por las que estoy agradecido cada noche.",
    frequency: {
      type: "CadaXdías",
      veces: 3,
    },
    category: Category.Bienestar,
    goal: {
      type: "Subitems",
      meta: ["Escribir tres cosas por las que estoy agradecido"],
    },
    smartDescription: {
      purposeAndMotivation:
        "Quiero fomentar una actitud positiva y mejorar mi felicidad general mediante la práctica diaria de gratitud.",
      benefitsAndConsequences:
        "Escribir un diario de gratitud puede aumentar mi bienestar emocional y fomentar una mentalidad positiva.",
      currentHabitsAndEnvironment:
        "A menudo me enfoco en aspectos negativos del día. Planeo dedicar unos minutos cada noche a reflexionar sobre lo positivo.",
      capacityAndResources: "Tengo un diario y un bolígrafo listos para usar.",
      possibleObstaclesAndSolutions:
        "La pereza nocturna podría ser un problema, así que dejaré el diario en mi mesita de noche para facilitar el acceso.",
    },
    priority: "Media",

    comments: [
      "El diario de gratitud ha mejorado mi perspectiva y mi felicidad general.",
    ],
    completedDays: [],
  },
];
