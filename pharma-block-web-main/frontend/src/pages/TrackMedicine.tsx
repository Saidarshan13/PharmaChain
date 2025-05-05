
import React, { useState } from 'react';
import { Search, Archive, Factory, Truck, Building, Check, Clock } from 'lucide-react';
import './TrackMedicine.css';

interface TrackingInfo {
  id: string;
  name: string;
  batchNumber: string;
  manufacturer: string;
  manufactureDate: string;
  expiryDate: string;
  currentHolder: string;
  timeline: {
    stage: string;
    date: string;
    status: 'completed' | 'pending';
    actor: string;
    description: string;
  }[];
}

const TrackMedicine: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<TrackingInfo | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Mock data
  const sampleMedicines: Record<string, TrackingInfo> = {
    "MED123456": {
      id: "MED123456",
      name: "Painkiller X",
      batchNumber: "BT2023-05-001",
      manufacturer: "MediMake Ltd.",
      manufactureDate: "2023-05-15",
      expiryDate: "2025-05-15",
      currentHolder: "PharmaMart (Retailer)",
      timeline: [
        {
          stage: "Raw Material Sourcing",
          date: "2023-05-01",
          status: "completed",
          actor: "Raw Meds Inc.",
          description: "Raw materials verified and approved"
        },
        {
          stage: "Manufacturing",
          date: "2023-05-10",
          status: "completed",
          actor: "MediMake Ltd.",
          description: "Batch manufactured and quality checked"
        },
        {
          stage: "Distribution",
          date: "2023-05-12",
          status: "completed",
          actor: "MedShip Co.",
          description: "Medicines distributed to retailers"
        },
        {
          stage: "Retail",
          date: "2023-05-15",
          status: "completed",
          actor: "PharmaMart",
          description: "Medicines received and ready for sale"
        },
        {
          stage: "Quality Verification",
          date: "",
          status: "pending",
          actor: "Regulatory Body",
          description: "Final quality check pending"
        }
      ]
    },
    "MED789012": {
      id: "MED789012",
      name: "Antibiotic Y",
      batchNumber: "BT2023-04-002",
      manufacturer: "MediMake Ltd.",
      manufactureDate: "2023-04-20",
      expiryDate: "2025-04-20",
      currentHolder: "MedShip Co. (Distributor)",
      timeline: [
        {
          stage: "Raw Material Sourcing",
          date: "2023-04-01",
          status: "completed",
          actor: "Raw Meds Inc.",
          description: "Raw materials verified and approved"
        },
        {
          stage: "Manufacturing",
          date: "2023-04-15",
          status: "completed",
          actor: "MediMake Ltd.",
          description: "Batch manufactured and quality checked"
        },
        {
          stage: "Distribution",
          date: "2023-04-18",
          status: "completed",
          actor: "MedShip Co.",
          description: "Medicines in transit to retailers"
        },
        {
          stage: "Retail",
          date: "",
          status: "pending",
          actor: "Pending",
          description: "Awaiting receipt by retailer"
        }
      ]
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    
    // Simulate API call with the mock data
    const result = sampleMedicines[searchQuery];
    setSearchResult(result || null);
  };

  // Helper function to determine if a stage is completed for a medicine
  const isStageCompleted = (stage: string) => {
    if (!searchResult) return false;
    
    const stageEntry = searchResult.timeline.find(item => item.stage.toLowerCase().includes(stage.toLowerCase()));
    return stageEntry && stageEntry.status === 'completed';
  };

  // Helper function to get stage info from timeline
  const getStageInfo = (stage: string) => {
    if (!searchResult) return null;
    
    return searchResult.timeline.find(item => item.stage.toLowerCase().includes(stage.toLowerCase()));
  };

  return (
    <div className="track-page">
      <div className="track-container">
        <h1 className="track-title">Track Medicine</h1>
        <p className="track-description">
          Enter the medicine ID or batch number to track its journey through the supply chain. 
          Verify authenticity and ensure quality with our blockchain-based tracking.
        </p>
        
        <div className="search-container">
          <form className="search-form" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Enter Medicine ID (e.g., MED123456)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button type="submit" className="search-btn">Track</button>
          </form>
        </div>
        
        {hasSearched && (
          <div className="result-container">
            {searchResult ? (
              <>
                <div className="medicine-info">
                  <div className="medicine-header">
                    <h2 className="medicine-name">{searchResult.name}</h2>
                    <div className="medicine-id">ID: {searchResult.id}</div>
                  </div>
                  
                  <div className="medicine-details">
                    <div className="detail-item">
                      <span className="detail-label">Batch Number</span>
                      <span className="detail-value">{searchResult.batchNumber}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Manufacturer</span>
                      <span className="detail-value">{searchResult.manufacturer}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Manufacture Date</span>
                      <span className="detail-value">{searchResult.manufactureDate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Expiry Date</span>
                      <span className="detail-value">{searchResult.expiryDate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Current Holder</span>
                      <span className="detail-value">{searchResult.currentHolder}</span>
                    </div>
                  </div>
                </div>
                
                {/* Visual Supply Chain Road */}
                <div className="supply-chain-road">
                  <h3>Supply Chain Journey</h3>
                  <div className="road-container">
                    <div className="road-line"></div>
                    
                    {/* Supplier Stage */}
                    <div className={`road-stage ${isStageCompleted('raw material') ? 'completed' : 'pending'}`}>
                      <div className="stage-icon">
                        <Archive />
                        {isStageCompleted('raw material') ? <Check className="check-icon" /> : <Clock className="pending-icon" />}
                      </div>
                      <div className="stage-info">
                        <h4>Raw Material Supplier</h4>
                        <p>{getStageInfo('raw material')?.date || 'Pending'}</p>
                        <p>{getStageInfo('raw material')?.actor || '-'}</p>
                      </div>
                    </div>
                    
                    {/* Manufacturer Stage */}
                    <div className={`road-stage ${isStageCompleted('manufacturing') ? 'completed' : 'pending'}`}>
                      <div className="stage-icon">
                        <Factory />
                        {isStageCompleted('manufacturing') ? <Check className="check-icon" /> : <Clock className="pending-icon" />}
                      </div>
                      <div className="stage-info">
                        <h4>Manufacturer</h4>
                        <p>{getStageInfo('manufacturing')?.date || 'Pending'}</p>
                        <p>{getStageInfo('manufacturing')?.actor || '-'}</p>
                      </div>
                    </div>
                    
                    {/* Distributor Stage */}
                    <div className={`road-stage ${isStageCompleted('distribution') ? 'completed' : 'pending'}`}>
                      <div className="stage-icon">
                        <Truck />
                        {isStageCompleted('distribution') ? <Check className="check-icon" /> : <Clock className="pending-icon" />}
                      </div>
                      <div className="stage-info">
                        <h4>Distributor</h4>
                        <p>{getStageInfo('distribution')?.date || 'Pending'}</p>
                        <p>{getStageInfo('distribution')?.actor || '-'}</p>
                      </div>
                    </div>
                    
                    {/* Retailer Stage */}
                    <div className={`road-stage ${isStageCompleted('retail') ? 'completed' : 'pending'}`}>
                      <div className="stage-icon">
                        <Building />
                        {isStageCompleted('retail') ? <Check className="check-icon" /> : <Clock className="pending-icon" />}
                      </div>
                      <div className="stage-info">
                        <h4>Retailer</h4>
                        <p>{getStageInfo('retail')?.date || 'Pending'}</p>
                        <p>{getStageInfo('retail')?.actor || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3>Supply Chain Timeline</h3>
                <div className="track-timeline">
                  {searchResult.timeline.map((item, index) => (
                    <div className="timeline-item" key={index}>
                      <div className={`timeline-dot ${item.status}`}></div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <div className="timeline-title">{item.stage}</div>
                          <div className="timeline-date">{item.date || 'Pending'}</div>
                        </div>
                        <div className="timeline-description">
                          <strong>{item.actor}</strong>: {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-result">
                <Search size={60} />
                <h3>No results found</h3>
                <p>The medicine ID you entered could not be found. Please check the ID and try again.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackMedicine;