// habitService.ts (en el frontend)
import axios from "axios";
import { Habit } from "./habit-types";

const API_URL = "http://localhost:3000/api/habits"; // Reemplaza con la URL de tu API

export const getHabits = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addHabit = async (newHabit: Habit) => {
  const response = await axios.post(API_URL, newHabit);
  return response.data;
};

