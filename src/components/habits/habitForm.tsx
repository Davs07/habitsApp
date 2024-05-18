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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Checkbox } from "../ui/checkbox";

export const HabitForm = () => {
  return (
    <Card className="w-[400px] rounded-2xl">
      <CardHeader>
        <CardTitle>Crea un nuevo hábito</CardTitle>
        <CardDescription>
          Construye hábitos que te construyan a ti.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Nombre" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" placeholder="Descripción" />
            </div>
            <div>
              <Label htmlFor="goal">Meta</Label>
              <div className="grid grid-cols-3 gap-3">
                <Select>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Meta" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Sí/No</SelectItem>
                    <SelectItem value="sveltekit">Cantidad</SelectItem>
                    <SelectItem value="astro">Cronómetro</SelectItem>
                    <SelectItem value="nuxt">Subitems</SelectItem>
                  </SelectContent>
                </Select>
                <Input id="goal" placeholder="Nombre" />
                <Input id="goal" placeholder="Nombre" />
              </div>
            </div>
            <div>
              <Label htmlFor="frequency">Frequencia</Label>
              <div className="grid grid-cols-3 gap-3">
                <Tabs defaultValue="diary" className="">
                  <TabsList>
                    <TabsTrigger value="diary">Todos los días</TabsTrigger>
                    <TabsTrigger value="especific">
                      Días específicos
                    </TabsTrigger>
                    <TabsTrigger value="interval">Cada x días</TabsTrigger>
                  </TabsList>

                  <TabsContent value="especific" className="w-max">
                    <div className="grid w-full grid-cols-3 space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="monday" />
                        <Label htmlFor="monday">Lun</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tuesday" />
                        <Label htmlFor="tuesday">Mar</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="wednesday" />
                        <Label htmlFor="wednesday">Mié</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="thursday" />
                        <Label htmlFor="thursday">Jue</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="friday" />
                        <Label htmlFor="friday">Vie</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="saturday" />
                        <Label htmlFor="saturday">Sáb</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sunday" />
                        <Label htmlFor="sunday">Dom</Label>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="interval">
                    <Label>Intervalo de días</Label>
                    <Input
                      type="number"
                      id="interval"
                      placeholder="Cada cuántos días"
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Salud">Salud</SelectItem>
                    <SelectItem value="Educación">Educación</SelectItem>
                    <SelectItem value="Productividad">Productividad</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Prioridad</Label>
                <Select>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="p1">P1</SelectItem>
                    <SelectItem value="p2">P2</SelectItem>
                    <SelectItem value="p3">P3</SelectItem>
                    <SelectItem value="p4">P4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Crear</Button>
      </CardFooter>
    </Card>
  );
};
