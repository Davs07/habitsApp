import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "../ui/checkbox";
import React, { useState } from "react";
import {
  Habit,
  CompletedDay,
  Frequency,
  Goal,
  SmartDescription,
} from "@/api/habit-types";
import { v4 as uuidv4 } from "uuid";
import { Category, Day } from "@/api/shared-types";

interface HabitFormProps {
  addHabit: (habit: Habit) => void;
}

export const HabitForm: React.FC<HabitFormProps> = ({ addHabit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goalType, setGoalType] = useState<Goal["type"]>("SiNo");
  const [goalMeta, setGoalMeta] = useState<Goal["meta"]>(false);
  const [frequencyType, setFrequencyType] =
    useState<Frequency["type"]>("TodosLosDias");
  const [specificDays, setSpecificDays] = useState<Day[]>([]);
  const [intervalDays, setIntervalDays] = useState<number>(1);
  const [category, setCategory] = useState<Category>(Category.Otro);
  const [smartDescription, setSmartDescription] = useState<SmartDescription>({
    purposeAndMotivation: "",
    benefitsAndConsequences: "",
    currentHabitsAndEnvironment: "",
    capacityAndResources: "",
    possibleObstaclesAndSolutions: "",
  });
  const [comments, setComments] = useState<string[]>([]);
  const [completedDays, setCompletedDays] = useState<CompletedDay[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    switch (id) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "goalMeta":
        setGoalMeta(goalType === "Cantidad" ? Number(value) : Boolean(value));
        break;
      case "interval":
        setIntervalDays(Number(value));
        break;
      case "purposeAndMotivation":
      case "benefitsAndConsequences":
      case "currentHabitsAndEnvironment":
      case "capacityAndResources":
      case "possibleObstaclesAndSolutions":
        setSmartDescription((prev) => ({
          ...prev,
          [id]: value,
        }));
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (day: Day) => {
    setSpecificDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHabit: Habit = {
      id: uuidv4(),
      name,
      description,
      goal:
        goalType === "SiNo"
          ? { type: "SiNo", meta: goalMeta as boolean }
          : goalType === "Cantidad"
          ? { type: "Cantidad", meta: goalMeta as number }
          : goalType === "Cronometro"
          ? { type: "Cronometro", meta: goalMeta as number }
          : { type: "Subitems", meta: goalMeta as string[] },
      frequency:
        frequencyType === "TodosLosDias"
          ? { type: "TodosLosDias" }
          : frequencyType === "DiasEspecificos"
          ? { type: "DiasEspecificos", dias: specificDays }
          : { type: "CadaXdías", veces: intervalDays },
      category,
      smartDescription,
      comments,
      completedDays,
    };
    addHabit(newHabit);
    // Reset form
    setName("");
    setDescription("");
    setGoalType("SiNo");
    setGoalMeta(false);
    setFrequencyType("TodosLosDias");
    setSpecificDays([]);
    setIntervalDays(1);
    setCategory(Category.Otro);
    setSmartDescription({
      purposeAndMotivation: "",
      benefitsAndConsequences: "",
      currentHabitsAndEnvironment: "",
      capacityAndResources: "",
      possibleObstaclesAndSolutions: "",
    });
    setComments([]);
    setCompletedDays([]);
  };

  return (
    <Card className="w-[400px] rounded-2xl">
      <CardHeader>
        <CardTitle>Crea un nuevo hábito</CardTitle>
        <CardDescription>
          Construye hábitos que te construyan a ti.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Nombre"
                className="rounded-2xl"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Descripción"
                className="rounded-2xl"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="goal">Meta</Label>
              <div className="grid grid-cols-3 gap-3">
                <Select
                  onValueChange={(value) => setGoalType(value as Goal["type"])}>
                  <SelectTrigger id="goal" className="rounded-2xl">
                    <SelectValue placeholder="Meta" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="rounded-2xl">
                    <SelectItem value="SiNo">Sí/No</SelectItem>
                    <SelectItem value="Cantidad">Cantidad</SelectItem>
                    <SelectItem value="Cronometro">Cronómetro</SelectItem>
                    <SelectItem value="Subitems">Subitems</SelectItem>
                  </SelectContent>
                </Select>
                {goalType === "SiNo" && (
                  <Select
                    onValueChange={(value) => setGoalMeta(value === "true")}>
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Meta" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="rounded-2xl">
                      <SelectItem value="true">Sí</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {(goalType === "Cantidad" || goalType === "Cronometro") && (
                  <Input
                    id="goalMeta"
                    type="number"
                    placeholder="Meta"
                    className="rounded-2xl"
                    value={goalMeta as number}
                    onChange={handleChange}
                  />
                )}
                {goalType === "Subitems" && (
                  <Textarea
                    id="goalMeta"
                    placeholder="Subitems separados por comas"
                    className="rounded-2xl"
                    value={goalMeta.toString()}
                    onChange={(e) => setGoalMeta(e.target.value.split(","))}
                  />
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="frequency">Frecuencia</Label>
              <Tabs
                value={frequencyType}
                onValueChange={(value: string) =>
                  setFrequencyType(value as Frequency["type"])
                }>
                <TabsList>
                  <TabsTrigger value="TodosLosDias">Todos los días</TabsTrigger>
                  <TabsTrigger value="DiasEspecificos">
                    Días específicos
                  </TabsTrigger>
                  <TabsTrigger value="CadaXdías">Cada x días</TabsTrigger>
                </TabsList>
                <TabsContent value="DiasEspecificos">
                  <div className="grid grid-cols-3 gap-3">
                    {Object.values(Day).map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={specificDays.includes(day)}
                          onCheckedChange={() => handleCheckboxChange(day)}
                        />
                        <Label htmlFor={day}>{day}</Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="CadaXdías">
                  <Label htmlFor="interval">Intervalo de días</Label>
                  <Input
                    type="number"
                    id="interval"
                    placeholder="Cada cuántos días"
                    value={intervalDays}
                    onChange={handleChange}
                  />
                </TabsContent>
              </Tabs>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select
                  onValueChange={(value) => setCategory(value as Category)}>
                  <SelectTrigger id="category" className="rounded-2xl">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value={Category.Salud}>Salud</SelectItem>
                    <SelectItem value={Category.Bienestar}>
                      Bienestar
                    </SelectItem>
                    <SelectItem value={Category.Productividad}>
                      Productividad
                    </SelectItem>
                    <SelectItem value={Category.Otro}>Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="purposeAndMotivation">
                Propósito y Motivación
              </Label>
              <Textarea
                id="purposeAndMotivation"
                placeholder="Propósito y Motivación"
                className="rounded-2xl"
                value={smartDescription.purposeAndMotivation}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="benefitsAndConsequences">
                Beneficios y Consecuencias
              </Label>
              <Textarea
                id="benefitsAndConsequences"
                placeholder="Beneficios y Consecuencias"
                className="rounded-2xl"
                value={smartDescription.benefitsAndConsequences}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="currentHabitsAndEnvironment">
                Hábitos Actuales y Entorno
              </Label>
              <Textarea
                id="currentHabitsAndEnvironment"
                placeholder="Hábitos Actuales y Entorno"
                className="rounded-2xl"
                value={smartDescription.currentHabitsAndEnvironment}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="capacityAndResources">Capacidad y Recursos</Label>
              <Textarea
                id="capacityAndResources"
                placeholder="Capacidad y Recursos"
                className="rounded-2xl"
                value={smartDescription.capacityAndResources}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="possibleObstaclesAndSolutions">
                Posibles Obstáculos y Soluciones
              </Label>
              <Textarea
                id="possibleObstaclesAndSolutions"
                placeholder="Posibles Obstáculos y Soluciones"
                className="rounded-2xl"
                value={smartDescription.possibleObstaclesAndSolutions}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" type="button">
          Cancelar
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Crear
        </Button>
      </CardFooter>
    </Card>
  );
};
