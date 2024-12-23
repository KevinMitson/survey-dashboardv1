export interface SurveyRating {
  veryBad: number;
  bad: number;
  average: number;
  good: number;
  veryGood: number;
}

export interface SurveyData {
  date: string;
  ratings: SurveyRating;
}

export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'yearly';