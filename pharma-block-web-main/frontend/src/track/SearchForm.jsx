import React from 'react';
import { Search, QrCode, Info, FileText, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import "./scanner.css";


const SearchForm = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      });

      const onScanSuccess = (decodedText) => {
        setSearchQuery(parseInt(decodedText.trim()));
        scanner.clear();
        setShowScanner(false);

        // Automatically trigger the search
        setTimeout(() => {
          handleSearch({ preventDefault: () => {} });
        }, 300);
      };

      const onScanError = (error) => {
        //console.warn(`QR Scan Error: ${error}`);
      };

      scanner.render(onScanSuccess, onScanError);

      return () => {
        scanner.clear().catch((e) => console.error('Failed to clear scanner', e));
      };
    }
  }, [showScanner]);

  function handleScanClick(){
    setShowScanner(true);
  }

  return (
    <Card className="search-card">
      <CardHeader className="search-card-header">
        <CardTitle>
          <Package size={28} className="inline-block mr-2" /> Track Your Medicine
        </CardTitle>
        <CardDescription>
          Enter a medicine  to verify authenticity and track its entire journey through our secure blockchain network
        </CardDescription>
      </CardHeader>

      <CardContent className="search-card-content">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-container">
            <Search className="search-icon" size={28} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Enter Medicine ID (e.g., MED1)" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              required
            />
          </div>
          
          <div className="search-buttons">
            <Button type="button" variant="outline" className="scan-btn" onClick={handleScanClick}>
              <QrCode size={22} />
              Scan QR
            </Button>
  {showScanner && (
    <div className="scanner-overlay">
      <div className="scanner-modal">
        <button className="close-button" onClick={() => setShowScanner(false)}>
          &times;
        </button>
        <div id="reader" className="scanner-box"></div>
      </div>
    </div>
  )}
  


            
            <Button type="submit" className="search-btn">
              <Search size={22} />
              Track Medicine
            </Button>
          </div>
        </form>
        
        <div className="search-tips-panel">
          <div className="search-tip">
            <div className="tip-icon">
              <FileText size={22} />
            </div>
            <div className="tip-content">
              <h4>Where to find your Medicine ID</h4>
              <p>The Medicine ID is printed on the packaging of the medicine</p>
            </div>
          </div>
          
          <div className="search-tip">
            <div className="tip-icon">
              <QrCode size={22} />
            </div>
            <div className="tip-content">
              <h4>Use QR Code Scanning</h4>
              <p>Click the "Scan QR" button and point your camera at the QR code on the medicine packaging</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="search-footer">
        <p className="privacy-note">
          <Info size={16} className="inline-block mr-1" /> 
          All tracking information is encrypted and secured by our blockchain technology. Your search data is never shared with third parties.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SearchForm;

