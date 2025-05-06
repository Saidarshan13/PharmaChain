
import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const NoResult: React.FC = () => {
  return (
    <Card className="no-result-card">
      <CardContent className="no-result">
        <Search size={80} />
        <h3>No results found</h3>
        <p>The medicine ID you entered could not be found. Please check the ID and try again.</p>
      </CardContent>
    </Card>
  );
};

export default NoResult;