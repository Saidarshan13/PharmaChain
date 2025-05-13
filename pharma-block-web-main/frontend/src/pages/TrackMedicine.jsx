import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";
import './TrackMedicine.css';
import SearchForm from '../track/SearchForm.jsx';
import ResultDisplay from '../track/ResultDisplay';
import Loader from "../components/loader";
import StyledAlert from "../components/alert";
import ErrorPage from "../components/ErrorPage";
import { SearchCheck } from 'lucide-react';
import { useParams } from 'react-router-dom';

const TrackMedicine = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [vanPosition, setVanPosition] = useState(0);
  const [SupplyChain, setSupplyChain] = useState();
  const [Alert, setAlert] = useState("");
  const [errorPage, setErrorPage] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [currentaccount, setCurrentaccount] = useState("");
   useEffect(() => {
       loadWeb3();
       loadBlockchaindata().catch((err) => {
         setAlert(`Error initializing: Ganache is not Connected`);
         setErrorPage(true);
         setisLoading(false);
       });
     }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
          } catch (error) {
            setAlert("User denied account access or Account isn't connected");
          }
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          setAlert("Non-Ethereum browser detected. You should consider MetaMask!");
        }
      };

      const loadBlockchaindata = async () => {
       
        setisLoading(true);
        
            const web3 = window.web3;
            
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            setCurrentaccount(account);
            
            const networkId = await web3.eth.net.getId();
            const networkData = SupplyChainABI.networks[networkId];
        
            if (networkData) {
              const supplychain = new web3.eth.Contract(
                SupplyChainABI.abi,
                networkData.address
              );
              setSupplyChain(supplychain);
              ///....
              setisLoading(false);
            }
        else {
          setAlert("The smart contract is not deployed to current network");
        }
      };


      const parseLocationData = (locationString) => {
        if (!locationString) return { coordinates: null, locationTime: null, transactionTime: null };
        const [latitude, longitude, locationTime, transactionTime] = locationString.split(',');
        return {
          coordinates: latitude && longitude ? `${latitude}, ${longitude}` : null,
          locationTime: locationTime || null,
          transactionTime: transactionTime || null
        };
      };

      const handleSearch = async(e) => {
        console.log(searchQuery)
        if(searchQuery === '') return;
        if(e !== null) e.preventDefault();
        
        setHasSearched(true);
        try {
          const count = await SupplyChain.methods.medicineCtr().call();
          // console.log("true");
          if (count < parseInt(searchQuery)){
            setSearchResult(null);
            const halfPageHeight = window.innerHeight * 1.1;
            window.scrollBy({ top: halfPageHeight, behavior: 'smooth' });
            return;
          }
          const medicine = await SupplyChain.methods.MedicineStock(parseInt(searchQuery)).call();
          const stage = await SupplyChain.methods.showStage(parseInt(searchQuery)).call();
          
          // Get stakeholder details
          const stakeholders = {
            RMS: medicine.RMSid !== '0' ? await SupplyChain.methods.RMS(medicine.RMSid).call() : "...",
            MAN: medicine.MANid !== '0' ? await SupplyChain.methods.MAN(medicine.MANid).call() : "...",
            DIS: medicine.DISid !== '0' ? await SupplyChain.methods.DIS(medicine.DISid).call() : "...",
            RET: medicine.RETid !== '0' ? await SupplyChain.methods.RET(medicine.RETid).call() : "..."
          };
    
          // Parse location data for each stage
          const locationData = {
            RMS: parseLocationData(medicine.newRMS),
            MAN: parseLocationData(medicine.newMAN),
            DIS: parseLocationData(medicine.newDIS),
            RET: parseLocationData(medicine.newRET),
            SOL: parseLocationData(medicine.newSold),
          };

          const result = {
            id: searchQuery,
            name: medicine.name,
            batchNumber: medicine.description,
            manufacturer: stakeholders.MAN.name,
            manufactureDate: locationData.MAN.locationTime,
            expiryDate: "",
            currentHolder:stage,
            timeline : [
              {
                stage: "Raw Material Sourcing",
                coordinates:  locationData.RMS?.coordinates || "",
                date: locationData.RMS?.locationTime && locationData.RMS?.transactionTime ? locationData.RMS?.locationTime +",  "+ locationData.RMS?.transactionTime : "",
                status: stakeholders.MAN?.id ? "completed" : "pending",
                actor: stakeholders.RMS?.name || "Unknown",
                description: stakeholders.MAN?.id
                  ? "Raw materials verified and approved"
                  : "Pending raw material verification",
              },
              {
                stage: "Manufacturing",
                coordinates:  locationData.MAN?.coordinates || "",
                date: locationData.MAN?.locationTime && locationData.MAN?.transactionTime ? locationData.MAN?.locationTime +",  "+ locationData.MAN?.transactionTime : "",
                status: stakeholders.DIS?.id ? "completed" : "pending", 
                actor: stakeholders.MAN?.name || "Unknown",
                description: stakeholders.DIS?.id
                  ? "Batch manufactured and quality checked"
                  : "Pending manufacturing confirmation",
              },
              {
                stage: "Distribution",
                coordinates:  locationData.DIS?.coordinates || "",
                date: locationData.DIS?.locationTime && locationData.DIS?.transactionTime ? locationData.DIS?.locationTime +",  "+ locationData.DIS?.transactionTime : "",
                status: stage === "Retail Stage" || stage === "Medicine Sold" || stage === "Distribution Stage" ? "completed" : "pending",
                actor: stakeholders.DIS?.name || "Unknown",
                description: stakeholders.RET?.id
                  ? "Medicines distributed to retailers"
                  : "Pending distribution process",
              },
              {
                stage: "Retail",
                coordinates:  locationData.RET?.coordinates || "",
                date: locationData.RET?.locationTime && locationData.RET?.transactionTime ? locationData.RET?.locationTime +",  "+ locationData.RET?.transactionTime : "",
                status: stage === "Retail Stage" || stage === "Medicine Sold" ? "completed" : "pending",
                actor: stakeholders.RET?.name || "Unknown",
                description: stakeholders.RET?.id
                  ? "Medicines received and ready for sale"
                  : "Pending retail confirmation",
              },
              {
                stage: "Sold",
                coordinates:  locationData.SOL?.coordinates || "",
                date: locationData.SOL?.locationTime && locationData.SOL?.transactionTime ? locationData.SOL?.locationTime +",  "+ locationData.SOL?.transactionTime : "",
                status: stage === "Retail Stage" || stage === "Medicine Sold" ? "completed" : "pending",
                actor: stakeholders.RET?.name || "Regulatory Body",
                description: stakeholders.RET?.id
                  ? "Final quality check completed"
                  : "Final quality check pending",
              },
            ]            
          }

          console.log(result)
          setSearchResult(result || null);
          setVanPosition(0);
          const halfPageHeight = window.innerHeight * 1.1;
          window.scrollBy({ top: halfPageHeight, behavior: 'smooth' });
        }
        catch{
          setAlert("Medicine not found or error occurred");
        }
        
      };

      const {medicineId}=useParams();
      useEffect(() => {
        if (medicineId && SupplyChain !== null) {
          setSearchQuery(medicineId);
            handleSearch(null);
        }
      }, [medicineId, SupplyChain]);

  useEffect(() => {
    if (searchResult) {
      const completedStages = searchResult.timeline.filter(item => item.status === 'completed').length;
      const progressPercentage = Math.min(100, Math.round((completedStages / 4) * 100));
      let currentPos = 0;
      const interval = setInterval(() => {
        if (currentPos < progressPercentage) {
          currentPos += 1;
          setVanPosition(currentPos);
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [searchResult]);

  const isStageCompleted = (stage) => {
    if (!searchResult) return false;
    const stageEntry = searchResult.timeline.find(item => item.stage.toLowerCase().includes(stage.toLowerCase()));
    return stageEntry && stageEntry.status === 'completed';
  };

  const getStageInfo = (stage) => {
    if (!searchResult) return null;
    return searchResult.timeline.find(item => item.stage.toLowerCase().includes(stage.toLowerCase()));
  };

  const getProgress = () => {
    if (!searchResult) return 0;
    const completedStages = searchResult.timeline.filter(item => item.status === 'completed').length;
    return Math.min(100, Math.round((completedStages / 4) * 100));
  };
  return (
    <>
          {Alert !== "" && (
            <StyledAlert message={Alert} onClose={() => setAlert("")} />
          )}
          {isLoading && <Loader />}
          {errorPage && <ErrorPage />}
          {!errorPage && !isLoading && <>
    <div className="track-page">
      <div className="track-container">
        <h1 className="track-title">Medicine Tracker</h1>
        <p className="track-description">
          Enter the medicine ID to track its journey through the supply chain. 
          Verify authenticity and ensure quality with our blockchain-based tracking.
        </p>

        <SearchForm 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch} 
        />

        <ResultDisplay 
          searchResult={searchResult}
          hasSearched={hasSearched}
          vanPosition={vanPosition}
          getProgress={getProgress}
          isStageCompleted={isStageCompleted}
          getStageInfo={getStageInfo}
        />
      </div>
    </div></>}</>
  );
};

export default TrackMedicine;
