import React from 'react';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import { TimeFrameSelector } from './TimeFrameSelector';
import { SurveyChart } from './SurveyChart';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { TimeFrame, SurveyData } from '../types/survey';
import { exportToPDF, exportToExcel } from '../utils/export';

interface SurveyDashboardProps {
  data: SurveyData[];
  loading: boolean;
  error: Error | null;
  timeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
}

export const SurveyDashboard: React.FC<SurveyDashboardProps> = ({
  data,
  loading,
  error,
  timeFrame,
  onTimeFrameChange,
}) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Survey Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => exportToPDF(data)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Export PDF
          </button>
          <button
            onClick={() => exportToExcel(data)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export Excel
          </button>
        </div>
      </div>

      <TimeFrameSelector
        timeFrame={timeFrame}
        onTimeFrameChange={onTimeFrameChange}
      />

      <div className="mt-8">
        <SurveyChart data={data} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-5 gap-4">
          {data.length > 0 &&
            Object.entries(data[data.length - 1].ratings).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h3>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};