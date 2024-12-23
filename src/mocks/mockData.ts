import { SurveyData } from '../types/survey';
import { addDays, subDays, format, startOfDay } from 'date-fns';

// Generate mock data for the last 30 days
export const generateMockData = (): SurveyData[] => {
  const today = startOfDay(new Date());
  return Array.from({ length: 30 }).map((_, index) => {
    const date = subDays(today, index);
    return {
      date: format(date, 'yyyy-MM-dd'),
      ratings: {
        veryBad: Math.floor(Math.random() * 10),
        bad: Math.floor(Math.random() * 20),
        average: Math.floor(Math.random() * 30),
        good: Math.floor(Math.random() * 40),
        veryGood: Math.floor(Math.random() * 50),
      },
    };
  });
};