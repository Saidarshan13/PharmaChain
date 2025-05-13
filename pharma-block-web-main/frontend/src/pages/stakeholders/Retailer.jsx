import React, { useState , useEffect } from 'react';
import { Building } from 'lucide-react';
import '../../components/StakeholderLogin.css';
import Web3 from "web3";
import SupplyChainABI from "../../artifacts/SupplyChain.json";
import Loader from "../../components/loader";
import StyledAlert from "../../components/alert";
import ErrorPage from "../../components/ErrorPage";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../../track/scanner.css";

const Retailer = () => {
  const username = 'Retailer';

const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [SupplyChain, setSupplyChain] = useState();
  const [Alert, setAlert] = useState("");
  const [errorPage, setErrorPage] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [currentaccount, setCurrentaccount] = useState("");
  const [Tablar, setTablar] = useState([]);
  const [Tablar2, setTablar2] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [medicineDescription, setMedicineDescription] = useState("");
  const [myRequests, setMyRequests] = useState([]);
  const [placeRequest, setPlaceRequest] = useState(false);
  const [viewRequest, setviewRequest] = useState(false);
  const [recieve, setRecieve] = useState(false);
  const [sellMed, setsellMed] = useState(false);
  const [latitude, setLatitude] = useState({});
  const [longitude, setLongitude] = useState({});
  const [timestamp, setTimestamp] = useState({});
  const [smallLoader, setSmallLoader] = useState({});
  const [activeTab, setActiveTab] = useState('request');
  const [DisBtn, SetDisBtn] = useState(() => {
      const initialState = {};
      for (let i = 0; i < 100; i++) {
        initialState[i] = 0;
      }
      return initialState;
    });
  const [showScanner, setShowScanner] = useState(false);

useEffect(() => {
  loadWeb3()
  loadBlockchaindata()
    .catch((err) => {
      setAlert(`Error initializing: ${err.message || err}`);
      setErrorPage(true);
      setisLoading(false);
    });
}, []);

const getCurrentLocation = (id) => {
  setSmallLoader((prev) => ({ ...prev, [id]: true }));
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude((prev) => ({ ...prev, [id]: position.coords.latitude.toFixed(6) }));
        setLongitude((prev) => ({ ...prev, [id]: position.coords.longitude.toFixed(6) }));
        const currentTime = new Date();
        setTimestamp((prev) => ({ ...prev, [id]: currentTime.toLocaleString() }));
        
        setSmallLoader((prev) => ({ ...prev, [id]: false })); // ✅ stop loader after success
      },
      (error) => {
        alert("Error getting location: " + error.message);
        setSmallLoader((prev) => ({ ...prev, [id]: false })); // ✅ stop loader after error too
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
    setSmallLoader((prev) => ({ ...prev, [id]: false })); // ✅ stop loader if not supported
  }
};


const loadWeb3 = async()=>{
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      alert("User denied account access or Account isn't connected");
    }
  }
   else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}

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
      
      let curId = 0;
      try{
        curId = await supplychain.methods.findRET(account).call();
      }
      catch{
        setAlert("No registered Distributors  ");
        setErrorPage(true);
        return;
      }

      try {
        const requestIds = await supplychain.methods.getRetailerRequests(curId).call();
        const requests = [];
        
        for (const requestId of requestIds) {
            const request = await supplychain.methods.getRequestDetails(requestId).call();
            requests.push({
                id: parseInt(request.id),
                name: request.name,
                description: request.description,
                isApproved: request.isApproved,
                isProcessed: request.isProcessed
            });
        }
        setMyRequests(requests);
        // requests[1];
        // console.log(requests[1]);
      } catch (err) {
          setAlert("Failed to load requests: " + err.message);
          setErrorPage(true);
        setisLoading(false);
      }
    

      if(parseInt(curId) == 0){
        setAlert("You are not a Authorized user");
        setErrorPage(true);
        setisLoading(false);
      }

      setSupplyChain(supplychain);
      var i;
      
      const tablar = [];
      const tablar2 = [];
      const medCtr = await supplychain.methods.medicineCtr().call();
      for (i = 0; i < medCtr; i++) {
        const medStage = await supplychain.methods.showStage(i + 1).call();
        const med = await supplychain.methods.MedicineStock(i + 1).call();
        // console.log(medStage);

        if(med.RETid == curId){
          if(medStage == "Distribution Stage" || medStage == "Retail Stage") tablar.push({medStage: medStage ,...med});
          if(medStage == "Retail Stage" || medStage == "Medicine Sold"){
            const newDISData = med.newRET.split(",");
            const formattedData = {
              latitude: newDISData[0],
              longitude: newDISData[1],
              date: newDISData[2],
              time: newDISData[3],
            };
            const newDISData2 = med.newSold.split(",");
            const formattedData2 = {
              latitude: newDISData2[0],
              longitude: newDISData2[1],
              date: newDISData2[2],
              time: newDISData2[3],
            };
          
          tablar2.push({
            id: med.id,
            name: med.name,
            description: med.description,
            stage:medStage,
            newDIS: formattedData,
            newSold: formattedData2
          });    
        }      
        }
      }
      setTablar(tablar);
      // console.log(tablar2);
      setTablar2(tablar2);
      setisLoading(false);
    } else {
      setAlert("The smart contract is not deployed to current network");
    }
  };




  const handleSubmit = async (e, medicineId, flag) => {
    e.preventDefault();
    try {

      const transactionTime = new Date().toLocaleString();
      const locationData = `${latitude[medicineId]},${longitude[medicineId]},${transactionTime}`;
    if(!flag){
        const reciept = await SupplyChain.methods
        .Retail(medicineId, locationData)
        .send({ from: currentaccount });
        if (reciept) loadBlockchaindata();
    }else{
      const reciept = await SupplyChain.methods
      .sold(medicineId, locationData)
      .send({ from: currentaccount });
      if (reciept) loadBlockchaindata();
      setShowPopup(true);
    }
        
        
    } catch (err) {
      setAlert("An error occured!!! 200");
    }
    
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleMedicineSubmit = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
          .submitRetailerRequest(medicineName, medicineDescription)
          .send({ from: currentaccount });
          
          setMedicineName("");
          setMedicineDescription("");
          if (reciept) {
            loadBlockchaindata();
          }
        } catch (err) {
          setAlert("An error occured!!!");
        }
        setShowPopup2(true);
        setTimeout(() => {
          setShowPopup2(false);
        }, 3000);
};

const handleScanAndAction = async (medicineId) => {
  if (navigator.geolocation) {
    setisLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const currentTime = new Date();
        const timeStr = currentTime.toLocaleString();
        setLatitude((prev) => ({ ...prev, [medicineId]: lat }));
        setLongitude((prev) => ({ ...prev, [medicineId]: lng }));
        setTimestamp((prev) => ({ ...prev, [medicineId]: timeStr }));
        try {
          const locationData = `${lat},${lng},${timeStr}`;
          // Fetch stage from blockchain
          const stage = await SupplyChain.methods.showStage(medicineId).call();
          let receipt;
          if (stage === "Distribution Stage") {
            receipt = await SupplyChain.methods
              .Retail(medicineId, locationData)
              .send({ from: currentaccount });
          } else if (stage === "Retail Stage") {
            receipt = await SupplyChain.methods
              .sold(medicineId, locationData)
              .send({ from: currentaccount });
          } else {
            setAlert("Medicine is not eligible for receive or sell at this stage.");
            setisLoading(false);
            return;
          }
          if (receipt) loadBlockchaindata();
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000);
        } catch (err) {
          setAlert("An error occurred during transaction!");
        }
        setisLoading(false);
      },
      (error) => {
        setAlert("Error getting location: " + error.message);
        setisLoading(false);
      }
    );
  } else {
    setAlert("Geolocation is not supported by this browser.");
  }
};

useEffect(() => {
  if (showScanner) {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });
    const onScanSuccess = (decodedText) => {
      setShowScanner(false);
      // Only medicine ID is expected in QR
      const id = parseInt(decodedText.trim());
      if (id) {
        handleScanAndAction(id);
      } else {
        setAlert("Invalid QR code format. QR should contain only the medicine ID.");
      }
      scanner.clear();
    };
    scanner.render(onScanSuccess, () => {});
    return () => {
      scanner.clear().catch(() => {});
    };
  }
}, [showScanner]);

  return (
    <>{Alert !== "" && <StyledAlert message={Alert} onClose={() => setAlert("")} />}
                    {isLoading && <Loader />}
                    {errorPage && <ErrorPage />}
            {!errorPage && !isLoading &&
    <div className="stakeholders-page">
      {showPopup && (
            <div className="popup2">Medicine Accepted and Status Updated ✅</div>
          )}
      <div className="stakeholders-container">
        <div className="stakeholder-dashboard">

        <div className="dashboard-header">
            <h2 className="welcome-text">Welcome, {username}</h2>
          </div>


        <div className="owner-tabs">
          <button
            className={`owner-tab ${activeTab === 'request' ? 'active' : ''}`}
            onClick={() => setActiveTab('request')}
          >
            Request New Medicine
          </button>
          <button
            className={`owner-tab ${activeTab === 'medicine' ? 'active' : ''}`}
            onClick={() => setActiveTab('medicine')}
          >
            Recieve & Sell
          </button>
          <button
            className={`owner-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Medicine History
          </button>
         
        </div>


      <div className={`tab-content ${activeTab === 'request' ? 'active' : ''}`}>
          <div className="request-form">
            <h3>Request New Medicine</h3>
            <form onSubmit={handleMedicineSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="medicineName">Medicine Name</label>
                  <input
                    type="text"
                    id="medicineName"
                    className="form-input"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    placeholder="Enter medicine name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="medicineDescription">Description</label>
                  <input
                    id="medicineDescription"
                    className="form-input"
                    value={medicineDescription}
                    onChange={(e) => setMedicineDescription(e.target.value)}
                    placeholder="Enter medicine description"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="login-button">Submit Request</button>
            </form>

          </div> <br /><br />

          <div className="medicine-list">
            <div className="medicine-list-header">
              <h3>Current Inventory</h3>
            </div>

            <table className="list-items">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                
                {myRequests.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>{medicine.name}</td>
                    <td>{medicine.description}</td>
                    <td>{medicine.isApproved ? "Approved": "Not Approved"}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>

        
          <div className={`tab-content ${activeTab === 'medicine' ? 'active' : ''}`}>
            <div className="medicine-list">
          <div className="list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Scan QR to Receive or Sell Medicine</h3>
                  <button type="button" className="scan-btn" onClick={() => setShowScanner(true)} style={{ height: '40px', borderRadius: '8px', background: 'linear-gradient(135deg, #6E59A5 0%, #9b87f5 100%)', color: 'white', fontWeight: 600, fontSize: '1rem', border: 'none', padding: '0 20px', cursor: 'pointer' }}>
                    Scan QR
                  </button>
                </div>
                {showScanner && (
                  <div className="scanner-overlay">
                    <div className="scanner-modal">
                      <button className="close-button" onClick={() => setShowScanner(false)}>&times;</button>
                      <div id="reader" className="scanner-box"></div>
                    </div>
                  </div>
                )}
                {Tablar.length == 0? <h3>No data Found</h3> :
          <table className="list-items">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Accept</th>
                  <th>Sell</th>
                </tr>
              </thead>
              <tbody>
                
                
                {Tablar.map((medicine) => (
  <tr key={medicine.id}>
    <td>{medicine.name}</td>
    <td>{medicine.description}</td>
    <td> <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                              <input
                                type="text"
                                value={latitude[medicine.id] || ""}
                                onChange={(e) => handlerChangeLatitude(e, medicine.id)}
                                placeholder="Latitude"
                                required
                                style={{ width: "100px" }}
                              />
                              <input
                                type="text"
                                value={longitude[medicine.id] || ""}
                                onChange={(e) => handlerChangeLongitude(e, medicine.id)}
                                placeholder="Longitude"
                                required
                                style={{ width: "100px" }}
                              />
                              <input
                                type="text"
                                value={timestamp[medicine.id] || ""}
                                placeholder="Timestamp"
                                readOnly
                                style={{ width: "130px" }}
                              />
                              <button
                                type="button"
                                disabled={smallLoader[medicine.id]}
                                onClick={() => getCurrentLocation(medicine.id)}
                              >
                                {smallLoader[medicine.id] ? "Fetching..." : "Get Location"}
                              </button>
                            </div></td>
    <td>
      {medicine.medStage === "Distribution Stage" ? (
        <button onClick={(e) => handleSubmit(e, medicine.id, false)}>Receive</button>
      ) : (
        "In Stock"
      )}
    </td>
    <td>
      {medicine.medStage === "Retail Stage" ? (
        <button onClick={(e) => handleSubmit(e, medicine.id, true)}>Sell</button>
      ) : ( medicine.medStage === "Distribution Stage" ? "":
        "Sold"
      )}
    </td></tr>
  ))}
              </tbody>
            </table>}
            </div>
          </div>

         <div className={`tab-content ${activeTab === 'history' ? 'active' : ''}`}>
         <div className="medicine-list">
            <div className="medicine-list-header">
              <h3>Current Inventory</h3>
            </div>
            {Tablar2.length == 0 ? <h3 style={{ padding: '15px' }}>No History Available</h3> :
            <table className="list-items">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Receive details</th>
                  <th>Selling details</th>
                </tr>
              </thead>
              <tbody>
                {Tablar2.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>{medicine.name}</td>
                    <td>{medicine.description}</td>
                    {/* <td>{medicine.stage}</td> */}
                    <td><p>{medicine.newDIS.latitude}, {medicine.newDIS.longitude}, {medicine.newDIS.date}, {medicine.newDIS.time}</p></td>
                    <td><p>{medicine.newSold.latitude}, {medicine.newSold.longitude}, {medicine.newSold.date}, {medicine.newSold.time}</p></td>
                    
                  </tr>
                ))}
                
              </tbody>
            </table>}

          </div>
         </div>

      </div>
    </div></div>}</>
  );
};

export default Retailer;
