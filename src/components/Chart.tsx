import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const habit = {
  id: "2",
  name: "Lectura diaria",
  description: "Leer al menos 30 minutos cada día.",
  frequency: { type: "TodosLosDias" },
  category: "Productividad", // Asumiendo que el import de Category es correcto y está definido así
  goal: { type: "Cronometro", meta: 30 },
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
};

interface CompletadosPorMes {
  [key: string]: number; // Asumiendo que queremos contar los completados, usamos number
}

const completadosPorMes = habit.completedDays?.reduce<CompletadosPorMes>(
  (acc, day) => {
    const month = new Date(day.date).getMonth(); // Extraer el mes del formato "YYYY-MM-DD"
    acc[month] = (acc[month] || 0) + 1; // Incrementa el contador para el mes
    return acc;
  },
  {}
);

const monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
const data = monthNames.map((month, index) => ({
  name: month,
  completados: completadosPorMes[index] || 0,
}));

export default function Chart() {
  return (
    <BarChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" className="text-xs" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="completados" fill="#8884d8" />{" "}
    </BarChart>
  );
}
