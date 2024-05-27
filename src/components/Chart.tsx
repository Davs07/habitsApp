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
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "@uidotdev/usehooks";

interface CompletadosPorMes {
  [key: string]: number;
}

interface ChartProps {
  habit: Habit;
  completedDays: CompletedDay[] | undefined;
}

export const Chart: React.FC<ChartProps> = ({ habit, completedDays }) => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const completadosPorMes = habit.completedDays?.reduce<CompletadosPorMes>(
    (acc, day) => {
      const month = parseISO(day.date).getMonth();
      acc[month] = (acc[month] || 0) + 1;
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
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: isLargeScreen ? 30 : 10,
          left: isLargeScreen ? -20 : -15,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 13 }}
          angle={isLargeScreen ? 0 : 270}
          textAnchor={isLargeScreen ? "middle" : "end"}
          tickMargin={isLargeScreen ? 10 : 0}
          orientation="bottom"
        />
        <YAxis tick={{ fontSize: 13 }} />
        <Tooltip contentStyle={{ fontSize: "12px" }} />
        <Legend wrapperStyle={{ fontSize: "14px" }} />
        <Bar dataKey="Completados" fill="#3B82F6" />
      </BarChart>
    </ResponsiveContainer>
  );
};
