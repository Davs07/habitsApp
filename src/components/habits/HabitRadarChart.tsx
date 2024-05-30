// src/types.ts
export interface Metric {
    name: string;
    points: number;
  }
  
  export interface Area {
    name: string;
    metrics: Metric[];
  }
  
  // src/RadarChartComponent.tsx
  import React from 'react';
  import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
  
  const calculateAreaScore = (metrics: Metric[]): number => {
    const totalPoints = metrics.reduce((sum, metric) => sum + metric.points, 0);
    return totalPoints / metrics.length;
  };
  
  const HabitRadarChart: React.FC = () => {
    const areas: Area[] = [
      {
        name: 'Salud y Bienestar',
        metrics: [
          { name: 'Ejercicio', points: 80 },
          { name: 'Nutrición', points: 70 },
          { name: 'Sueño', points: 90 },
          { name: 'Meditación y Mindfulness', points: 60 },
        ],
      },
      {
        name: 'Desarrollo Profesional',
        metrics: [
          { name: 'Aprendizaje Continuo', points: 85 },
          { name: 'Productividad', points: 80 },
          { name: 'Networking', points: 90 },
        ],
      },
      {
        name: 'Relaciones y Conexiones Sociales',
        metrics: [
          { name: 'Familia', points: 70 },
          { name: 'Amistades', points: 75 },
          { name: 'Comunidad', points: 65 },
        ],
      },
      {
        name: 'Finanzas Personales',
        metrics: [
          { name: 'Ahorro', points: 90 },
          { name: 'Presupuesto', points: 85 },
          { name: 'Inversiones', points: 80 },
        ],
      },
      {
        name: 'Crecimiento Personal y Espiritual',
        metrics: [
          { name: 'Lectura', points: 80 },
          { name: 'Reflexión Personal', points: 70 },
          { name: 'Espiritualidad', points: 90 },
        ],
      },
    ];
  
    const data = areas.map(area => ({
      subject: area.name,
      A: calculateAreaScore(area.metrics),
      fullMark: 100,
    }));
  
    return (
      <RadarChart  outerRadius={150} width={800} height={600} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Puntuación" dataKey="A" stroke="#2440F5" fill="#2440F5" fillOpacity={0.6} />
        <Tooltip />
      </RadarChart>
    );
  };
  
  export default HabitRadarChart;
  