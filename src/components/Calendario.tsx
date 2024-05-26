import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Habit } from "@/api/habit-types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface CalendarioProps {
  habit: Habit;
  handleCheckboxChange: (date: string) => void;
}

export const Calendario: React.FC<CalendarioProps> = ({
  habit,
  handleCheckboxChange,
}: CalendarioProps) => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>(
    habit.completedDays?.map((day) => parseISO(day.date)) || []
  );

  React.useEffect(() => {
    setSelectedDates(
      habit.completedDays?.map((day) => parseISO(day.date)) || []
    );
  }, [habit]); // Actualizar cuando el habit cambie

  return (
    <Calendar
      mode="multiple"
      locale={es}
      selected={selectedDates}
      onSelect={(dates) => {
        setSelectedDates(dates || []);
      }}
      onDayClick={(day) => {
        handleCheckboxChange(format(day, "yyyy-MM-dd"));
      }}
      className="border-none shadow-sm rounded-2xl bg-white grid w-max place-items-center"
      disabled={(date) => date > new Date() || date < new Date("2024-01-01")}
    />
  );
};
