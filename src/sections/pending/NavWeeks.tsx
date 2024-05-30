import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationWeeksProps {
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  handleCurrentWeek: () => void;
  currentWeekStart: Date;
  currentWeekEnd: Date;
  capitalize: (string: string) => string;
}

export const NavigationWeeks = ({
  handlePreviousWeek,
  handleNextWeek,
  handleCurrentWeek,
  currentWeekStart,
  currentWeekEnd,
  capitalize,
}: NavigationWeeksProps) => {
  return (
    <div className="flex w-full mb-4 justify-between items-center">
      <div>
        <TabsList className="flex gap-4">
          <TabsTrigger
            value="day"
            className={cn(
              "px-4 py-2 w-24 bg-gray-200 text-black hover:text-main rounded-2xl"
            )}>
            Día
          </TabsTrigger>
          <TabsTrigger
            value="Week"
            className={cn(
              "px-4 py-2 w-24 bg-gray-200 text-black hover:text-main rounded-2xl"
            )}>
            Semana
          </TabsTrigger>
        </TabsList>
      </div>

      <div>
        <h3 className="mb-2">
          {capitalize(format(currentWeekStart, "EEEE", { locale: es }))},{" "}
          {format(currentWeekStart, "d", { locale: es })}{" "}
          {capitalize(format(currentWeekStart, "LLL", { locale: es }))} -{" "}
          {capitalize(format(currentWeekEnd, "EEEE", { locale: es }))},{" "}
          {format(currentWeekEnd, "d", { locale: es })}{" "}
          {capitalize(format(currentWeekEnd, "LLL", { locale: es }))}
        </h3>
      </div>

      <div className="flex space-x-2 justify-center items-center">
        <Button
          onClick={handlePreviousWeek}
          size={"icon"}
          className=" bg-gray-200 text-black hover:text-white rounded-2xl">
          <ChevronLeft />
        </Button>
        <Button
          onClick={handleCurrentWeek}
          className={cn(
            "px-4 py-2 bg-gray-200 text-black hover:text-white  rounded-2xl"
          )}>
          Hoy
        </Button>
        <Button
          onClick={handleNextWeek}
          size={"icon"}
          className=" bg-gray-200 text-black hover:text-white rounded-2xl">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
