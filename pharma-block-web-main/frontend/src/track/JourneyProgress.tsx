
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface JourneyProgressProps {
  progress: number;
}

const JourneyProgress: React.FC<JourneyProgressProps> = ({ progress }) => {
  return (
    <div className="journey-progress">
      <div className="progress-header">
        <h3>Supply Chain Progress</h3>
        <span className="progress-percentage">{progress}%</span>
      </div>
      <div className="progress-bar-container">
        <Progress value={progress} className="progress-bar" />
      </div>
    </div>
  );
};

export default JourneyProgress;