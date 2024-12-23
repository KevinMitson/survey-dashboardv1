import axios from 'axios';
import { TimeFrame, SurveyData } from '../types/survey';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust this to match your Node.js server URL

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const transformMongoDataToSurveyData = (mongoData: any[]): SurveyData[] => {
  // Create an object to store aggregated ratings
  const ratingCounts = {
    veryBad: 0,
    bad: 0,
    average: 0,
    good: 0,
    veryGood: 0,
  };

  // Map MongoDB ratings (1-5) to our survey categories
  mongoData.forEach((item) => {
    switch (item._id) { // MongoDB aggregation returns _id as the rating
      case 1:
        ratingCounts.veryBad = item.count;
        break;
      case 2:
        ratingCounts.bad = item.count;
        break;
      case 3:
        ratingCounts.average = item.count;
        break;
      case 4:
        ratingCounts.good = item.count;
        break;
      case 5:
        ratingCounts.veryGood = item.count;
        break;
    }
  });

  // Return in the format expected by the dashboard
  return [{
    date: new Date().toISOString(),
    ratings: ratingCounts
  }];
};

export const fetchSurveyData = async (timeFrame: TimeFrame): Promise<SurveyData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/surveys`, {
      params: {
        range: timeFrame
      }
    });

    if (!response.data) {
      throw new ApiError(500, 'No data received from server');
    }

    return transformMongoDataToSurveyData(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.status || 500,
        error.response?.data?.error || 'Network error occurred'
      );
    }
    throw new Error('An unexpected error occurred');
  }
};

// Add export endpoints if needed
export const exportToExcel = async (): Promise<void> => {
  try {
    window.open(`${API_BASE_URL}/export/excel`, '_blank');
  } catch (error) {
    throw new ApiError(500, 'Failed to export Excel file');
  }
};

export const exportToPDF = async (): Promise<void> => {
  try {
    window.open(`${API_BASE_URL}/export/pdf`, '_blank');
  } catch (error) {
    throw new ApiError(500, 'Failed to export PDF file');
  }
};