
import React from 'react';
import { Warehouse, Factory, Truck, Store, BookCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TimelineItem {
  stage: string;
  coordinates: string;
  date: string;
  status: 'completed' | 'pending';
  actor: string;
  description: string;
}

interface TimelineProps {
  timeline: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  return (
    <div className="timeline-section">
      <h3>Detailed Timeline</h3>
      <div className="timeline">
        {timeline.map((item, index) => (
          <div 
            className={`timeline-item ${item.status === 'completed' ? 'completed' : 'pending'}`}
            key={index}
          >
            <div className="timeline-icon-container">
              <div className={`timeline-icon ${item.status}`}>
                {index === 0 ? <Warehouse size={28} /> : 
                 index === 1 ? <Factory size={28} /> : 
                 index === 2 ? <Truck size={28} /> : 
                 index === 3 ? <Store size={28} /> : 
                 <BookCheck size={28} />}
              </div>
              <div className="timeline-connector"></div>
            </div>
            <Card className="timeline-card">
              <CardContent className="timeline-content">
                <div className="timeline-header">
                  <h4 className="timeline-title">{item.stage}</h4>
                  <span className={`timeline-status ${item.status}`}>
                    {item.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </div >
                <div className = "timeline-data">
                <div className="timeline-coordinates">
                  {item.coordinates || ''}
                </div>
                <div className="timeline-date">
                  {item.date || ''}
                </div></div>
                <div className="timeline-description">
                  <strong>{item.actor}</strong>: {item.description}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;