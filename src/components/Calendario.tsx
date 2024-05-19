import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Habit } from "@/api/habit-types";

interface CalendarioProps {
  habit: Habit;
  handleCheckboxChange: (date: string) => void;
}
export const Calendario: React.FC<CalendarioProps> = (
  habit,
  handleCheckboxChange
) => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([
    new Date("2024-05-02"),
  ]);

  // Maneja la selección de fechas
  const handleSelect = (dates: Date | Date[] | undefined) => {
    if (dates === undefined) {
      // Si dates es undefined, significa que se han deseleccionado todas las fechas
      setSelectedDates([]);
    } else if (Array.isArray(dates)) {
      setSelectedDates((prevDates) => [
        ...prevDates,
        ...dates.filter((date) => !prevDates.includes(date)),
      ]);
    } else {
      setSelectedDates((prevDates) =>
        prevDates.includes(dates) ? prevDates : [...prevDates, dates]
      );
      handleCheckboxChange(dates);
      console.log(dates);
      console.log("Selected Dates:", selectedDates);
    }
  };

  return (
    <Calendar
      mode="multiple"
      selected={selectedDates}
      onSelect={handleSelect}
      className="border-none shadow-sm rounded-2xl bg-white grid w-max place-items-center"
      disabled={(date) => date > new Date() || date < new Date("2024-01-01")}
    />
  );
};
