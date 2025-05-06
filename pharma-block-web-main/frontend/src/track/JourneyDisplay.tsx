
import React from 'react';
import { Warehouse, Factory, Truck, Store, Check, Clock, ArrowRight } from 'lucide-react';

interface StageInfo {
  stage: string;
  date: string;
  status: 'completed' | 'pending';
  actor: string;
  description: string;
}

interface JourneyDisplayProps {
  searchResult: {
    timeline: StageInfo[];
  } | null;
  vanPosition: number;
  getStageInfo: (stage: string) => StageInfo | null;
  isStageCompleted: (stage: string) => boolean;
}

const JourneyDisplay: React.FC<JourneyDisplayProps> = ({ 
  searchResult, 
  vanPosition, 
  getStageInfo, 
  isStageCompleted 
}) => {
  if (!searchResult) return null;

  return (
    <div className="supply-chain-journey">
      <h3>Medicine Journey</h3>
      <div className="journey-road-container">
        <div className="journey-road">
          {/* The moving van */}
          <div 
            className="journey-van" 
            style={{ left: `${vanPosition}%` }}
          >
            <Truck className="van-icon" size={48} />
          </div>
          
          {/* Road markers */}
          <div className="road-markers">
            <div className={`road-marker ${isStageCompleted('raw material') ? 'completed' : 'pending'}`} style={{ left: '0%' }}>
              <div className="marker-icon-container">
                <Warehouse className="marker-icon" size={38} />
                {isStageCompleted('raw material') ? <Check className="check-icon" size={24} /> : <Clock className="pending-icon" size={24} />}
              </div>
              <div className="marker-label">Supplier</div>
            </div>
            <div className={`road-marker ${isStageCompleted('manufacturing') ? 'completed' : 'pending'}`} style={{ left: '33%' }}>
              <div className="marker-icon-container">
                <Factory className="marker-icon" size={38} />
                {isStageCompleted('manufacturing') ? <Check className="check-icon" size={24} /> : <Clock className="pending-icon" size={24} />}
              </div>
              <div className="marker-label">Manufacturer</div>
            </div>
            <div className={`road-marker ${isStageCompleted('distribution') ? 'completed' : 'pending'}`} style={{ left: '66%' }}>
              <div className="marker-icon-container">
                <Truck className="marker-icon" size={38} />
                {isStageCompleted('distribution') ? <Check className="check-icon" size={24} /> : <Clock className="pending-icon" size={24} />}
              </div>
              <div className="marker-label">Distributor</div>
            </div>
            <div className={`road-marker ${isStageCompleted('retail') ? 'completed' : 'pending'}`} style={{ left: '100%' }}>
              <div className="marker-icon-container">
                <Store className="marker-icon" size={38} />
                {isStageCompleted('retail') ? <Check className="check-icon" size={24} /> : <Clock className="pending-icon" size={24} />}
              </div>
              <div className="marker-label">Retailer</div>
            </div>
          </div>
        </div>
        
        {/* Stage labels below the road */}
        <div className="stage-labels">
          <div className="stage-label">
            <h4>Raw Material</h4>
            <div className="stage-date">{getStageInfo('raw material')?.date || 'Pending'}</div>
            <div className="stage-actor">{getStageInfo('raw material')?.actor || 'Unknown'}</div>
          </div>
          <div className="stage-connector">
            <ArrowRight size={28} />
          </div>
          <div className="stage-label">
            <h4>Manufacturing</h4>
            <div className="stage-date">{getStageInfo('manufacturing')?.date || 'Pending'}</div>
            <div className="stage-actor">{getStageInfo('manufacturing')?.actor || 'Unknown'}</div>
          </div>
          <div className="stage-connector">
            <ArrowRight size={28} />
          </div>
          <div className="stage-label">
            <h4>Distribution</h4>
            <div className="stage-date">{getStageInfo('distribution')?.date || 'Pending'}</div>
            <div className="stage-actor">{getStageInfo('distribution')?.actor || 'Unknown'}</div>
          </div>
          <div className="stage-connector">
            <ArrowRight size={28} />
          </div>
          <div className="stage-label">
            <h4>Retail</h4>
            <div className="stage-date">{getStageInfo('retail')?.date || 'Pending'}</div>
            <div className="stage-actor">{getStageInfo('retail')?.actor || 'Unknown'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyDisplay;