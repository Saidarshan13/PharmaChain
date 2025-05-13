import React, { useState, useEffect } from 'react';
import './Owner.css';
import SupplyChainABI from "../artifacts/SupplyChain.json";
import Web3 from "web3";
import Loader from "../components/loader";
import StyledAlert from "../components/alert";
import ErrorPage from "../components/ErrorPage";
import { useNavigate } from 'react-router-dom';


const Owner = () => {
  
   const Navigate=useNavigate();
     // const [activeComponent, setActiveComponent] = useState("");
  const [Alert, setAlert] = useState("");
  const [errorPage, setErrorPage] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [RMSlist, setRMSlist] = useState([]);
  const [activeTab, setActiveTab] = useState('stakeholders'); //<---
  const [nextIds, setNextIds] = useState({});
  const [ Allmedicines, setMedicine] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    ethAddress: "",
    location: "",
    stakeholderType: "",
  });

  useEffect(() => {
    loadWeb3();
    loadBlockchaindata().catch((err) => {
      setAlert(`Error initializing: ${err.message || err}`);
      setErrorPage(true);
      setisLoading(false);
    });
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [SupplyChain, setSupplyChain] = useState();
  const [stakeholders, setStakeholders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [DisBtn, SetDisBtn] = useState({}); 


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
      setAlert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  };


  const loadBlockchaindata = async () => {
    // setisLoading(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
      setSupplyChain(supplychain);
      const allStakeholders = [];

    // Fetch suppliers
    const rmsCtr = await supplychain.methods.rmsCtr().call();
    const RMSList = [];
    for (let i = 0; i < rmsCtr; i++) {
      const data = await supplychain.methods.RMS(i + 1).call();
      RMSList[i] = await supplychain.methods.RMS(i + 1).call();
      allStakeholders.push({ ...data, type: "supplier" });
    }
    setRMSlist(RMSList);

    // Fetch manufacturers
    const manCtr = await supplychain.methods.manCtr().call();
    for (let i = 0; i < manCtr; i++) {
      const data = await supplychain.methods.MAN(i + 1).call();
      allStakeholders.push({ ...data, type: "manufacturer" });
    }

    // Fetch distributors
    const disCtr = await supplychain.methods.disCtr().call();
    for (let i = 0; i < disCtr; i++) {
      const data = await supplychain.methods.DIS(i + 1).call();
      allStakeholders.push({ ...data, type: "distributor" });
    }

    // Fetch retailers
    const retCtr = await supplychain.methods.retCtr().call();
    for (let i = 0; i < retCtr; i++) {
      const data = await supplychain.methods.RET(i + 1).call();
      allStakeholders.push({ ...data, type: "retailer" });
    }

    const allMedicines = []
    const medCtr = await supplychain.methods.medicineCtr().call();
    for (let i = 0; i < medCtr; i++) {
      const data = await supplychain.methods.MedicineStock(i + 1).call();
      const medStage = await supplychain.methods.showStage(i + 1).call();
      allMedicines.push({ ...data, medStage: medStage });
    }
    setMedicine(allMedicines);
    // console.log(allMedicines);

    // Set a single unified state
    setStakeholders(allStakeholders);


     /////add Medicine

  const curId = await supplychain.methods.Owner().call();
      
  if(curId.toLowerCase() !== account.toLowerCase()){
    setAlert("You are not a Authorized user");
    setErrorPage(true);
  }
  
  try {
    const requestCount = await supplychain.methods.requestCtr().call();
    const allRequests = [];
    
    for (let i = 1; i <= requestCount; i++) {
        const request = await supplychain.methods.getRequestDetails(i).call();
        const retailer = await supplychain.methods.RET(request.retailerId).call();
        if(!request.isApproved){
          allRequests.push({
              id: request.id,
              retailerId: request.retailerId,
              retailerName: retailer.name,
              medicineName: request.name,
              description: request.description,
              isApproved: request.isApproved,
              isProcessed: request.isProcessed
          });
      }
    }
    
    setRequests(allRequests);
} catch (error) {
    setAlert("Error loading requests:", error);
}


      // setisLoading(false);
    } else {
      setAlert("The smart contract is not deployed to current network");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleChange2 = (id, value) => {
    SetDisBtn((prev) => ({ ...prev, [id]: true }));
    setNextIds((prev) => ({ ...prev, [id]: value }));
    };


  const handleApprove = async (e, requestId) => {
    e.preventDefault();
      try {
          
        var reciept = await SupplyChain.methods
              .approveRetailerRequest(requestId, nextIds[requestId])
              .send({ from: currentaccount });
          
          if (reciept) {
            loadBlockchaindata();
          }
      } catch (error) {
          setAlert("Error approving request: " + error.message);
      }
      setShowPopup2(true);
  setTimeout(() => {
    setShowPopup2(false);
  }, 3000);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let reciept = "";
      if (formData.stakeholderType === "Supplier") {
        console.log("jsns");
        reciept = await SupplyChain.methods
          .addRMS(formData.ethAddress, formData.name, formData.location)
          .send({ from: currentaccount });
      } else if (formData.stakeholderType === "Manufacturer") {

        reciept = await SupplyChain.methods
          .addManufacturer(formData.ethAddress, formData.name, formData.location)
          .send({ from: currentaccount });
      } else if (formData.stakeholderType === "Distributor") {
        reciept = await SupplyChain.methods
          .addDistributor(formData.ethAddress, formData.name, formData.location)
          .send({ from: currentaccount });
      } else if (formData.stakeholderType === "Retailer") {
        reciept = await SupplyChain.methods
          .addRetailer(formData.ethAddress, formData.name, formData.location)
          .send({ from: currentaccount });
      }
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      setAlert("An error occured!!!");
    }
    setShowPopup(true);
    setFormData({
      name: "",
      ethAddress: "",
      location: "",
      stakeholderType: "",
      additionalInfo: "",
    });


    setTimeout(() => setShowPopup(false), 3000);
  };




  return (
    <>{Alert !== "" && <StyledAlert message={Alert} onClose={() => setAlert("")} />}
            {isLoading && <Loader />}
            {errorPage && <ErrorPage />}
    {!errorPage && <div className="owner-page">
      <div className="owner-container">
        <h1 className="owner-title">Owner Dashboard</h1>

        <div className="owner-tabs">
          <button
            className={`owner-tab ${activeTab === 'stakeholders' ? 'active' : ''}`}
            onClick={() => setActiveTab('stakeholders')}
          >
            Stakeholders Management
          </button>
          <button
            className={`owner-tab ${activeTab === 'medicines' ? 'active' : ''}`}
            onClick={() => setActiveTab('medicines')}
          >
            Medicine Requests
          </button>
          <button
            className={`owner-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Medicine History
          </button>
         
        </div>

        <div className={`tab-content ${activeTab === 'stakeholders' ? 'active' : ''}`}>
          <div className="stakeholder-form">
            <h2 className="form-title">Add New Stakeholder</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="stakeholderName">Name</label>
                  <input
                    name="name"
                    type="text"
                    id="stakeholderName"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="stakeholderaddress">Ethureum Address</label>
                  <input
                    type="text"
                    id="stakeholderEmail"
                    name="ethAddress"
                    className="form-input"
                    value={formData.ethAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="stakeholderType">Type</label>
                  <select
                    id="stakeholderType"
                    name="stakeholderType"
                    className="form-select"
                    value={formData.stakeholderType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select StakeHolder Type</option>
                    <option value="Supplier">Raw Material Supplier</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Retailer">Retailer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="stakeholderCompany">Location</label>
                  <input
                    type="text"
                    id="stakeholderCompany"
                    className="form-input"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">Add Stakeholder</button>
              {showPopup && <div className="popup2">✅ StakeHolder added successfully!</div>}
            </form>
          </div>

          <div className="stakeholders-list">
            <div className="list-header">
              <h3>Registered Stakeholders</h3>
            </div>

            <table className="list-items">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>EthAddress</th>
                  <th>Type</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {stakeholders.map((stakeholder, index) => (
                  <tr key={index}>
                    <td>{stakeholder.name}</td>
                    <td>{stakeholder.addr}</td>
                    <td>{stakeholder.type.charAt(0).toUpperCase() + stakeholder.type.slice(1)}</td>
                    <td>{stakeholder.place}</td>
                  </tr>
                ))}
  </tbody>
</table>

          </div>
        </div>

        <div className={`tab-content ${activeTab === 'medicines' ? 'active' : ''}`}>
          <div className="medicines-list">
            <div className="list-header">
              <h3>Medicine Requests</h3>
            </div>
              {requests.length == 0 ? <h3 style={{ padding: '15px' }}
              >No Medicines to Approve</h3>:
              <>
              <table className="list-items">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Medicine Name</th>
                    <th>Description</th>
                    <th>Retailer ID</th>
                    <th>Retailer Name</th>
                    <th>Status</th>
                    <th>Select Supplier</th>
                    <th>Action</th>
                  </tr>
                </thead>
            <tbody>
    {requests.map((medicine, index) => (
                <tr key={index}>
                  <td>{medicine.id}</td>
                  <td>{medicine.medicineName}</td>
                  <td>{medicine.description}</td>
                  <td>{medicine.retailerId}</td>
                  <td>{medicine.retailerName}</td>
                  <td>{medicine.isApproved ? 'Approved' : 'Pending'}</td>
                  <td>
                    <select
                      name="Supplier"
                      value={nextIds[medicine.id] || ""}
                      onChange={(e) => handleChange2(medicine.id, e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a Supplier</option>
                      {RMSlist.map((supplier, i) => (
                        <option key={i} value={i + 1} >
                          {supplier.name}, {supplier.place}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {!medicine.isApproved && (
                      <form onSubmit={(e) => handleApprove(e, medicine.id)}>
                         <button disabled={!DisBtn[medicine.id]} type="submit" className="submit-button">
                          Approve
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showPopup2 && <div className="popup2">✅ Medicine Appoved!</div>}
          </>}

          </div>
        </div>

        <div className={`tab-content ${activeTab === 'history' ? 'active' : ''}`}>
          <div className="medicines-list">
            <div className="list-header">
              <h3>Medicine History</h3>
            </div>
              {Allmedicines.length == 0 ? <h3 style={{ padding: '15px' }}
              >No Medicinal History</h3>:
              <>
              <table className="list-items">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Medicine Name</th>
                    <th>Description</th>
                    <th>Medicine Stage</th>
                  </tr>
                </thead>
            <tbody>
    {Allmedicines.map((medicine, index) => (
                <tr key={index} onClick={()=>Navigate(`/trackMedicine/${medicine.id}`)}>
                  <td>{medicine.id}</td>
                  <td>{medicine.name}</td>
                  <td>{medicine.description}</td>
                  <td>{medicine.medStage}</td>
                </tr>
              ))}
            </tbody>
          </table></>}

          </div>
        </div>
      </div>
    </div>}</>
  );
};

export default Owner;
