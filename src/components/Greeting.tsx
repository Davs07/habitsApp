import {  format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";

interface GreetingProps {
  user: any;
}

export const Greeting = ({ user }: GreetingProps) => {
  const currentHour = format(new Date(), "HH", { locale: es });
  const currentHourToInt = parseInt(currentHour);
  const getGreeting = () => {
    if (currentHourToInt >= 5 && currentHourToInt < 12) {
      return "Buenos días";
    } else if (currentHourToInt >= 12 && currentHourToInt < 18) {
      return "Buenas tardes";
    } else {
      return "Buenas noches";
    }
  };

  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    });
    return () => {
      clearInterval(interval);
    };
  }, [greeting]);
  return (
    <div className="my-4 w-full text-start">
      <h1 className="">
        {greeting}, {user.name}
      </h1>
      <h4 className="text-foreground">
        Hoy es una nueva oportunidad para mejorar.
      </h4>
    </div>
  );
};
