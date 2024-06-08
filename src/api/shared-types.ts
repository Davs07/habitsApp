// Enum de categorías
export enum Category {
  Salud = "Salud y Bienestar",
  Crecimiento = "Crecimiento Personal y Espiritual",
  Relaciones = "Relaciones y Conexiones Sociales",
  Desarrollo = "Desarrollo Profesional",
  Finanzas = "Finanzas Personales",
}

// Colores asociados a cada categoría
export const CategoryColors: { [key in Category]: string } = {
  [Category.Salud]: "rose",
  [Category.Crecimiento]: "red",
  [Category.Relaciones]: "green",
  [Category.Desarrollo]: "blue",
  [Category.Finanzas]: "purple",
};

export enum Day {
  Lunes = "Lunes",
  Martes = "Martes",
  Miercoles = "Miércoles",
  Jueves = "Jueves",
  Viernes = "Viernes",
  Sabado = "Sábado",
  Domingo = "Domingo",
}
