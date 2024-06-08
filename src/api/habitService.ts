// api/habitService.ts
import axios from 'axios';
import { Habit } from '@/api/habit-types';

const API_URL = 'http://localhost:3000';

export const getHabits = async (): Promise<Habit[]> => {
  const response = await axios.get(`${API_URL}/habits`);
  return response.data;
};

export const addHabit = async (newHabit: Habit): Promise<Habit> => {
  const response = await axios.post(`${API_URL}/habits`, newHabit);
  return response.data;
};

// Puedes añadir más funciones para actualizar y eliminar hábitos si es necesario
