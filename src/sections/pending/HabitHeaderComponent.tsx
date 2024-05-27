import { Card } from "@/components/ui/card";

interface HabitHeaderComponentProps {
  daysOfCurrentWeek: Array<{
    formattedDate: string;
    displayDate: string;
    dayName: string;
    dayNumber: string;
  }>;
}

export const HabitHeaderComponent = ({
  daysOfCurrentWeek,
}: HabitHeaderComponentProps) => {
  return (
    <Card className="text-gray-600 bg-transparent shadow-none font-bold uppercase text-sm leading-normal grid grid-cols-8 w-full">
      <div className="py-3 px-6 text-left">Hábito</div>
      {daysOfCurrentWeek.map(({ formattedDate, dayName }) => (
        <div key={formattedDate} className="py-3 px-6 text-center">
          {`${dayName}`}
        </div>
      ))}
    </Card>
  );
};
