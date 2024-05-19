import { CompletedDay, Habit } from "@/api/habit-types";
import { parseISO } from "date-fns";
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

interface CompletadosPorMes {
  [key: string]: number; // Asumiendo que queremos contar los completados, usamos number
}
interface ChartProps {
  habit: Habit;
  completedDays: CompletedDay[] | undefined;
}

export const Chart: React.FC<ChartProps> = (props) => {
  const { habit, completedDays } = props;

  const completadosPorMes = habit.completedDays?.reduce<CompletadosPorMes>(
    (acc, day) => {
      const month = parseISO(day.date).getMonth(); // Extraer el mes correctamente
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
    Completados: completadosPorMes ? completadosPorMes[index] : 0,
  }));

  if (!completedDays) {
    return null;
  }
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
      <Bar dataKey="Completados" fill="#3B82F6" />{" "}
    </BarChart>
  );
};
