import React from 'react';
import { TimeFrame } from '../types/survey';

interface TimeFrameSelectorProps {
  timeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
}

export const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({
  timeFrame,
  onTimeFrameChange,
}) => {
  return (
    <div className="flex space-x-2">
      {(['daily', 'weekly', 'monthly', 'yearly'] as TimeFrame[]).map((frame) => (
        <button
          key={frame}
          onClick={() => onTimeFrameChange(frame)}
          className={`px-4 py-2 rounded-lg ${
            timeFrame === frame
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {frame.charAt(0).toUpperCase() + frame.slice(1)}
        </button>
      ))}
    </div>
  );
};