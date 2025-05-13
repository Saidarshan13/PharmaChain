
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface MedicineDetailsProps {
  result: {
    id: string;
    name: string;
    batchNumber: string;
    manufacturer: string;
    manufactureDate: string;
    expiryDate: string;
    currentHolder: string;
  };
}

const MedicineDetails: React.FC<MedicineDetailsProps> = ({ result }) => {
  return (
    <div className="medicine-header">
      <CardTitle className="medicine-name">{result.name}</CardTitle>
      <span className="medicine-id">ID: {result.id}</span>
      <CardDescription>
        Current holder: <span className="current-holder">{result.currentHolder}</span>
      </CardDescription>
      <div className="medicine-details">
        <div className="detail-column">
          <div className="detail-item">
            <span className="detail-label">Description</span>
            <span className="detail-value">{result.batchNumber}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Manufacturer</span>
            <span className="detail-value">{result.manufacturer}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MedicineDetails;