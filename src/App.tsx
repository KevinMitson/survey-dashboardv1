import React, { useState } from 'react';
import { TimeFrame } from './types/survey';
import { useSurveyData } from './hooks/useSurveyData';
import { SurveyDashboard } from './components/SurveyDashboard';

function App() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');
  const { data, loading, error } = useSurveyData(timeFrame);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <SurveyDashboard
          data={data}
          loading={loading}
          error={error}
          timeFrame={timeFrame}
          onTimeFrameChange={setTimeFrame}
        />
      </div>
    </div>
  );
}

export default App;