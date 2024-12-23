import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SurveyData } from '../types/survey';

interface SurveyChartProps {
  data: SurveyData[];
}

export const SurveyChart: React.FC<SurveyChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    date: item.date,
    'Very Bad': item.ratings.veryBad,
    'Bad': item.ratings.bad,
    'Average': item.ratings.average,
    'Good': item.ratings.good,
    'Very Good': item.ratings.veryGood,
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Very Bad" fill="#ef4444" />
          <Bar dataKey="Bad" fill="#f97316" />
          <Bar dataKey="Average" fill="#eab308" />
          <Bar dataKey="Good" fill="#22c55e" />
          <Bar dataKey="Very Good" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};