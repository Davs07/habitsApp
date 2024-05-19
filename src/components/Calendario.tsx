import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Habit } from "@/api/habit-types";
import { format } from "date-fns";

interface CalendarioProps {
  habit: Habit;
  handleCheckboxChange: (date: string) => void;
}
export const Calendario: React.FC<CalendarioProps> = (props) => {
  const { habit, handleCheckboxChange } = props;
  const [selectedDates, setSelectedDates] = React.useState<Date[]>(
    habit.completedDays?.map((day) => new Date(day.date)) || []
  );

  return (
    <Calendar
      mode="multiple"
      selected={selectedDates}
      onSelect={(dates) => {
        setSelectedDates(dates || []);
      }}
      onDayClick={(day) => {
        handleCheckboxChange(format(day, "yyyy-MM-dd"));
        // console.log(format(day, "yyyy-MM-dd"));
      }}
      className="border-none shadow-sm rounded-2xl bg-white grid w-max place-items-center"
      disabled={(date) => date > new Date() || date < new Date("2024-01-01")}
    />
  );
};

// Maneja la selección de fechas
/*  const handleSelect = (dates: Date | Date[] | undefined) => {
    if (dates === undefined) {
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
    }
    console.log("Selected Dates:", selectedDates);
  }; */
