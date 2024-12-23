import { useState, useEffect } from 'react';
import { TimeFrame, SurveyData } from '../types/survey';
import { fetchSurveyData } from '../services/api';

export const useSurveyData = (timeFrame: TimeFrame) => {
  const [data, setData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const surveyData = await fetchSurveyData(timeFrame);
        setData(surveyData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeFrame]);

  return { data, loading, error };
};