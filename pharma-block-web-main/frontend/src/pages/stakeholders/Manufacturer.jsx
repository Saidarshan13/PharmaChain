import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SupplyChainABI from "../../artifacts/SupplyChain.json";
import { Archive } from "lucide-react";
import "../../components/StakeholderLogin.css";
import Loader from "../../components/loader";
import StyledAlert from "../../components/alert";
import ErrorPage from "../../components/ErrorPage";
import { QRCodeCanvas } from "qrcode.react";

const Manufacturer = () => {
  const [Alert, setAlert] = useState("");
    const [errorPage, setErrorPage] = useState(false);
    const [isLoading, setisLoading] = useState(false);
  const [SupplyChain, setSupplyChain] = useState();
  const [currentaccount, setCurrentaccount] = useState("");
  const [DISlist, setDISlist] = useState([]);
  const [Tablar, setTablar] = useState([]);
  const [Tablar2, setTablar2] = useState([]);
  const [nextIds, setNextIds] = useState({});
  const [latitude, setLatitude] = useState({});
  const [longitude, setLongitude] = useState({});
  const [timestamp, setTimestamp] = useState({});
  const [smallLoader, setSmallLoader] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("medicine");
  const [DisBtn, SetDisBtn] = useState(() => {
      const initialState = {};
      for (let i = 0; i < 100; i++) {
        initialState[i] = 0;
      }
      return initialState;
    });

  const handleChange = (id, value) => {
    SetDisBtn((prev) => ({ ...prev, [id]: DisBtn[id]+1 }));
    setNextIds((prev) => ({ ...prev, [id]: value }));
  };

  const handlerChangeLatitude = (event, id) => {
    SetDisBtn((prev) => ({ ...prev, [id]: DisBtn[id]+1 }));
    setLatitude((prev) => ({ ...prev, [id]: event.target.value }));
  };

  const handlerChangeLongitude = (event, id) => {
    SetDisBtn((prev) => ({ ...prev, [id]: DisBtn[id]+1 }));
    setLongitude((prev) => ({ ...prev, [id]: event.target.value }));
  };

  const getCurrentLocation = (id) => {
    setSmallLoader((prev) => ({ ...prev, [id]: true }));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude((prev) => ({
            ...prev,
            [id]: position.coords.latitude.toFixed(6),
          }));
          setLongitude((prev) => ({
            ...prev,
            [id]: position.coords.longitude.toFixed(6),
          }));
          const currentTime = new Date();
          setTimestamp((prev) => ({
            ...prev,
            [id]: currentTime.toLocaleString(),
          }));
          setSmallLoader((prev) => ({ ...prev, [id]: false }));
    SetDisBtn((prev) => ({ ...prev, [id]: DisBtn[id]+1 }));
        },
        (error) => {
          setAlert("Error getting location: " + error.message);
          setSmallLoader((prev) => ({ ...prev, [id]: false }));
        }
      );
    } else {
      setAlert("Geolocation is not supported by this browser.");
      setSmallLoader((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleSubmit = async (e, medicineId) => {
    e.preventDefault();
    try {
      const locationData = `${latitude[medicineId]},${longitude[medicineId]},${timestamp[medicineId]}`;
      var receipt = await SupplyChain.methods
        .Manufacturing(medicineId, nextIds[medicineId], locationData)
        .send({ from: currentaccount });
        setShowPopup(true);

      if (receipt) loadBlockchaindata();
    } catch (err) {
      setAlert("An error occurred!");
    }
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchaindata().catch((err) => {
      setAlert(`Error initializing: ${err.message || err}`);
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
      setAlert("Non-Ethereum browser detected. Consider MetaMask!");
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
      let curId = 0;
      try{
        curId = await supplychain.methods.findMAN(account).call();
      }
      catch{
        setAlert("No registered Manufacturers  ");
        setErrorPage(true);
        setisLoading(false);
        return;
      }
      if (parseInt(curId) === 0) {
        setAlert("You are not an Authorized user");
        setisLoading(false);
        setErrorPage(true);
        return;
      }

      setSupplyChain(supplychain);
      const disCtr = await supplychain.methods.disCtr().call();
      const DISList = [];
      for (let i = 0; i < disCtr; i++) {
        DISList[i] = await supplychain.methods.DIS(i + 1).call();
      }
      setDISlist(DISList);

      const tablar = [];
      const tablar2 = [];
      const medCtr = await supplychain.methods.medicineCtr().call();
      for (let i = 0; i < medCtr; i++) {
        const medStage = await supplychain.methods.showStage(i + 1).call();
        const med = await supplychain.methods.MedicineStock(i + 1).call();
        if (parseInt(med.MANid) === parseInt(curId)) {
          if (medStage === "Raw Material Supply Stage") tablar.push(med);
          else {
            const newMANData = med.newMAN.split(",");
            const formattedData = {
              latitude: newMANData[0],
              longitude: newMANData[1],
              date: newMANData[2],
              time: newMANData[3],
            };
            tablar2.push({ id: med.id, name: med.name,description: med.description, newMAN: formattedData });
          }
        }
      }
      setTablar(tablar);
      setTablar2(tablar2);
      setisLoading(false);
    } 
    else {
      alert("Smart contract not deployed to the current network");
    }
  };

  return (
    <>{Alert !== "" && <StyledAlert message={Alert} onClose={() => setAlert("")} />}
                {isLoading && <Loader />}
                {errorPage && <ErrorPage />}
        {!errorPage && !isLoading &&
    <div className="stakeholders-page">
      <div className="stakeholders-container">
        <div className="stakeholder-dashboard">
          <div className="dashboard-header">
            <h2 className="welcome-text">Welcome, Manufacturer</h2>
          </div>

          <div className="owner-tabs">
            <button
              className={`owner-tab ${activeTab === "medicine" ? "active" : ""}`}
              onClick={() => setActiveTab("medicine")}
            >
              Incoming Medicines
            </button>
            <button
              className={`owner-tab ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Medicine History
            </button>
          </div>

          <div className={`tab-content ${activeTab === 'medicine' ? 'active' : ''}`}>
  <div className="list-items">
    <div className="medicines-list">
      <div className="list-header">
        <h3>Incoming Medicines</h3>
      </div>

      {Tablar.length === 0 ? (
        <h3 style={{ padding: '15px' }}>No Received Medicines</h3>
      ) : (
        <table className="list-items">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Description</th>
              <th>Select Distributor</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Tablar.map((medicine, index) => (
              <tr key={index}>
                <td>{medicine.name}</td>
                <td>{medicine.description}</td>
                <td>
                  <select
                    value={nextIds[medicine.id] || ""}
                    onChange={(e) => handleChange(medicine.id, e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Distributor
                    </option>
                    {DISlist.map((distributor, idx) => (
                      <option key={idx} value={idx + 1}>
                        {distributor.name}, {distributor.place}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
                  </div>
                </td>
                <td>
                  <form onSubmit={(e) => handleSubmit(e, medicine.id)}>
                    <button type="submit" disabled={DisBtn[medicine.id] < 2} className="submit-button">
                      Confirm Receipt
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
</div>


<div className={`tab-content ${activeTab === 'history' ? 'active' : ''}`}>
  <div className="medicines-list">
    <div className="list-header">
      <h3>Medicine History</h3>
    </div>

    {Tablar2.length === 0 ? (
      <h3 style={{ padding: '15px' }}>No History Available</h3>
    ) : (
      <table className="list-items">
        <thead>
          <tr>
            <th>ID & Name</th>
            <th>Description</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Date</th>
            <th>Time</th>
            <th>QR code</th>
          </tr>
        </thead>
        <tbody>
          {Tablar2.map((medicine, index) => (
            <tr key={index}>
              <td>{medicine.id + ": " + medicine.name}</td>
              <td>{medicine.description}</td>
              <td>{medicine.newMAN.latitude}</td>
              <td>{medicine.newMAN.longitude}</td>
              <td>{medicine.newMAN.date}</td>
              <td>{medicine.newMAN.time}</td>
              <td>
                <QRCodeCanvas value={`${medicine.id}`} size={128} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>


          {showPopup && (
            <div className="popup2">Medicine Accepted and Status Updated ✅</div>
          )}
        </div>
      </div>
    </div>}</>
  );
};

export default Manufacturer;
