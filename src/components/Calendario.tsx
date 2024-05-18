import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export function Calendario() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border bg-white grid w-max place-items-center"
      disabled={(date) => date > new Date() || date < new Date("2024-01-01")}
      initialFocus
    />
  );
}
