
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import MedicineDetails from './MedicineDetails';
import JourneyProgress from './JourneyProgress';
import JourneyDisplay from './JourneyDisplay';
import Timeline from './Timeline';
import NoResult from './NoResult';

interface TimelineItem {
  stage: string;
  date: string;
  status: 'completed' | 'pending';
  actor: string;
  description: string;
}

interface TrackingInfo {
  id: string;
  name: string;
  batchNumber: string;
  manufacturer: string;
  manufactureDate: string;
  expiryDate: string;
  currentHolder: string;
  timeline: TimelineItem[];
}

interface ResultDisplayProps {
  searchResult: TrackingInfo | null;
  hasSearched: boolean;
  vanPosition: number;
  getProgress: () => number;
  isStageCompleted: (stage: string) => boolean;
  getStageInfo: (stage: string) => TimelineItem | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  searchResult, 
  hasSearched, 
  vanPosition, 
  getProgress, 
  isStageCompleted, 
  getStageInfo 
}) => {
  if (!hasSearched) return null;

  return (
    <div className="result-section">
      {searchResult ? (
        <Card className="result-card">
          <CardHeader className="result-header">
            <MedicineDetails result={searchResult} />
          </CardHeader>
          <CardContent>
            <JourneyProgress progress={getProgress()} />
            <JourneyDisplay 
              searchResult={searchResult} 
              vanPosition={vanPosition} 
              isStageCompleted={isStageCompleted} 
              getStageInfo={getStageInfo} 
            />
            <Timeline timeline={searchResult.timeline} />
          </CardContent>
        </Card>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

export default ResultDisplay;