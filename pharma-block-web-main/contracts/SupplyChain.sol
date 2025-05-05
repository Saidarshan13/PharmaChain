// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";
contract SupplyChain {
    //Smart Contract owner will be the person who deploys the contract only he can authorize various roles like retailer, Manufacturer,etc
    address public Owner;

    //note this constructor will be called when smart contract will be deployed on blockchain
    constructor() public {
        Owner = msg.sender;
    }



    //Roles (flow of pharma supply chain)
     // RawMaterialSupplier; //This is where Manufacturer will get raw materials to make medicines
    // Manufacturer;  //Various WHO guidelines should be followed by this person
    // Distributor; //This guy distributes the medicines to retailers
    // Retailer; //Normal customer buys from the retailer

    //modifier to make sure only the owner is using the function
    modifier onlyByOwner() {
        require(msg.sender == Owner);
        _;
    }

    //stages of a medicine in pharma supply chain
    enum STAGE {
        Init,
        RawMaterialSupply,
        Manufacture,
        Distribution,
        Retail,
        sold
    }
    //using this we are going to track every single medicine the owner orders
    //Medicine count
    uint256 public medicineCtr = 0;
    //Raw material supplier count
    uint256 public rmsCtr = 0;
    //Manufacturer count
    uint256 public manCtr = 0;
    //distributor count
    uint256 public disCtr = 0;
    //retailer count
    uint256 public retCtr = 0;


    //To store information about the medicine
    struct medicine {
        uint256 id; //unique medicine id
        string name; //name of the medicine
        string description; //about medicine
        uint256 RMSid; //id of the Raw Material supplier for this particular medicine
        string newRMS;

        uint256 MANid; //id of the Manufacturer for this particular medicine
        string newMAN;

        uint256 DISid; //id of the distributor for this particular medicine
        string newDIS;

        uint256 RETid; //id of the retailer for this particular medicine
        string newRET;
        string newSold;
 
        STAGE stage; //current medicine stage
    }


    //To store all the medicines on the blockchain
    mapping(uint256 => medicine) public MedicineStock;

    //To show status to client applications
    function showStage(uint256 _medicineID)
        public
        view
        returns (string memory)
    {
        require(medicineCtr > 0);
        if (MedicineStock[_medicineID].stage == STAGE.Init)
            return "Medicine Ordered";
        else if (MedicineStock[_medicineID].stage == STAGE.RawMaterialSupply)
            return "Raw Material Supply Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Manufacture)
            return "Manufacturing Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Distribution)
            return "Distribution Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.Retail)
            return "Retail Stage";
        else if (MedicineStock[_medicineID].stage == STAGE.sold)
            return "Medicine Sold";
    }

    //To store information about raw material supplier
    struct rawMaterialSupplier {
        address addr;
        uint256 id; //supplier id
        string name; //Name of the raw material supplier
        string place; //Place the raw material supplier is based in
    }

    //To store all the raw material suppliers on the blockchain
    mapping(uint256 => rawMaterialSupplier) public RMS;

    //To store information about manufacturer
    struct manufacturer {
        address addr;
        uint256 id; //manufacturer id
        string name; //Name of the manufacturer
        string place; //Place the manufacturer is based in
    }

    //To store all the manufacturers on the blockchain
    mapping(uint256 => manufacturer) public MAN;

    //To store information about distributor
    struct distributor {
        address addr;
        uint256 id; //distributor id
        string name; //Name of the distributor
        string place; //Place the distributor is based in
    }

    //To store all the distributors on the blockchain
    mapping(uint256 => distributor) public DIS;

    //To store information about retailer
    struct retailer {
        address addr;
        uint256 id; //retailer id
        string name; //Name of the retailer
        string place; //Place the retailer is based in
    }

    //To store all the retailers on the blockchain
    mapping(uint256 => retailer) public RET;

    //Role mappings for permission checks
    mapping(address => bool) public isRMS;
    mapping(address => bool) public isMAN;
    mapping(address => bool) public isDIS;
    mapping(address => bool) public isRET;

    //To add raw material suppliers. Only contract owner can add a new raw material supplier
    function addRMS(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        rmsCtr++;
        RMS[rmsCtr] = rawMaterialSupplier(_address, rmsCtr, _name, _place);
        isRMS[_address] = true;
    }

    //To add manufacturer. Only contract owner can add a new manufacturer
    function addManufacturer(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        manCtr++;
        MAN[manCtr] = manufacturer(_address, manCtr, _name, _place);
        isMAN[_address] = true;
    }

    //To add distributor. Only contract owner can add a new distributor
    function addDistributor(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        disCtr++;
        DIS[disCtr] = distributor(_address, disCtr, _name, _place);
        isDIS[_address] = true;
    }

    //To add retailer. Only contract owner can add a new retailer
    function addRetailer(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        retCtr++;
        RET[retCtr] = retailer(_address, retCtr, _name, _place);
        isRET[_address] = true;
    }

    //To supply raw materials from RMS supplier to the manufacturer
    function RMSsupply(uint256 _medicineID, uint256 _MANid, string memory _locationData) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findRMS(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.Init);
        require(_id==MedicineStock[_medicineID].RMSid);
        MedicineStock[_medicineID].newRMS = _locationData;
        MedicineStock[_medicineID].stage = STAGE.RawMaterialSupply;
        MedicineStock[_medicineID].MANid=_MANid;
    }
    
    //To check if RMS is available in the blockchain
    function findRMS(address _address) public view returns (uint256) {
        require(rmsCtr > 0);
        for (uint256 i = 1; i <= rmsCtr; i++) {
            if (RMS[i].addr == _address) return RMS[i].id;
        }
        return 0;
    }

    //To manufacture medicine
    function Manufacturing(uint256 _medicineID, uint256 _DISid, string memory _locationData) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findMAN(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.RawMaterialSupply);
        require(_id==MedicineStock[_medicineID].MANid);
        MedicineStock[_medicineID].newMAN = _locationData;
        MedicineStock[_medicineID].stage = STAGE.Manufacture;
        MedicineStock[_medicineID].DISid=_DISid;
    }

    //To check if Manufacturer is available in the blockchain
    function findMAN(address _address) public view returns (uint256) {
        require(manCtr > 0);
        for (uint256 i = 1; i <= manCtr; i++) {
            if (MAN[i].addr == _address) return MAN[i].id;
        }
        return 0;
    }

    //To supply medicines from Manufacturer to distributor
    function Distribute(uint256 _medicineID, string memory _locationData) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findDIS(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.Manufacture);
        require(_id==MedicineStock[_medicineID].DISid);
        MedicineStock[_medicineID].newDIS = _locationData;
        MedicineStock[_medicineID].stage = STAGE.Distribution;
        // RETid is already set when accepting retailer request, so we don't need to set it here
    }

    //To check if distributor is available in the blockchain
    function findDIS(address _address) public view returns (uint256) {
        require(disCtr > 0);
        for (uint256 i = 1; i <= disCtr; i++) {
            if (DIS[i].addr == _address) return DIS[i].id;
        }
        return 0;
    }

    //To supply medicines from distributor to retailer
    function Retail(uint256 _medicineID, string memory _locationData) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.Distribution);
        require(_id == MedicineStock[_medicineID].RETid, "Only the requesting retailer can perform this action");
        MedicineStock[_medicineID].newRET = _locationData;
        MedicineStock[_medicineID].stage = STAGE.Retail;
    }

    //To check if retailer is available in the blockchain
    function findRET(address _address) public view returns (uint256) {
        if (retCtr == 0) return 0;
        for (uint256 i = 1; i <= retCtr; i++) {
            if (RET[i].addr == _address) return RET[i].id;
        }
        return 0;
    }

    //To sell medicines from retailer to consumer
    function sold(uint256 _medicineID, string memory _locationData) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(_id == MedicineStock[_medicineID].RETid, "Only the requesting retailer can perform this action");
        require(MedicineStock[_medicineID].stage == STAGE.Retail);
        MedicineStock[_medicineID].newSold = _locationData;
        MedicineStock[_medicineID].stage = STAGE.sold;
    }

    // To add new medicines to the stock
    function addMedicine(string memory _name, string memory _description, uint256 _newid)
        public
        onlyByOwner()
    {
        require((rmsCtr >= 0) && (manCtr >= 0) && (disCtr >= 0) && (retCtr >= 0));
        medicineCtr++;
        // MedicineStock[medicineCtr] = medicine(
        //     medicineCtr,
        //     _name,
        //     _description,
        //     0,
        //     0,
        //     0,
        //     0,
        //     STAGE.Init
        // );
        MedicineStock[medicineCtr].id = medicineCtr;
        MedicineStock[medicineCtr].name = _name;
        MedicineStock[medicineCtr].description = _description;
        MedicineStock[medicineCtr].RMSid = _newid;
        MedicineStock[medicineCtr].MANid = 0;
        MedicineStock[medicineCtr].DISid = 0;
        MedicineStock[medicineCtr].RETid = 0;
        MedicineStock[medicineCtr].stage = STAGE.Init;
    }

    // Batch tracking
    uint256 public batchCtr = 0;
    
    struct Batch {
        uint256 id;
        uint256[] medicineIds;
        uint256 RMSid;
        uint256 MANid;
        uint256 DISid;
        uint256 RETid;
    }

    mapping(uint256 => Batch) public Batches;
    mapping(uint256 => uint256) public MedicineToBatch; // Maps medicine ID to batch ID

    // Modified addMultipleMedicines function
    function addMultipleMedicines(
        string[] memory _names,
        string[] memory _descriptions,
        uint256 _RMSid
    ) public onlyByOwner() {
        require(_names.length == _descriptions.length, "Arrays must be of equal length");
        require(_names.length > 0, "Must add at least one medicine");
        require(_RMSid > 0 && _RMSid <= rmsCtr, "Invalid RMS ID");
        
        batchCtr++;
        uint256[] memory medicineIds = new uint256[](_names.length);
        
        for (uint i = 0; i < _names.length; i++) {
            medicineCtr++;
            MedicineStock[medicineCtr] = medicine({
                id: medicineCtr,
                name: _names[i],
                description: _descriptions[i],
                RMSid: _RMSid,
                newRMS: "",
                MANid: 0,
                newMAN: "",
                DISid: 0,
                newDIS: "",
                RETid: 0,
                newRET: "",
                newSold:"",
                stage: STAGE.Init
            });
            medicineIds[i] = medicineCtr;
            MedicineToBatch[medicineCtr] = batchCtr;
        }

        Batches[batchCtr] = Batch({
            id: batchCtr,
            medicineIds: medicineIds,
            RMSid: _RMSid,
            MANid: 0,
            DISid: 0,
            RETid: 0
        });
    }

    // Function to get medicines in a batch
    function getMedicinesInBatch(uint256 _batchId) public view returns (uint256[] memory) {
        require(_batchId > 0 && _batchId <= batchCtr, "Invalid batch ID");
        return Batches[_batchId].medicineIds;
    }

    // Function to get batch details
    function getBatchDetails(uint256 _batchId) public view returns (
        uint256 id,
        uint256[] memory medicineIds,
        uint256 RMSid,
        uint256 MANid,
        uint256 DISid,
        uint256 RETid
    ) {
        require(_batchId > 0 && _batchId <= batchCtr, "Invalid batch ID");
        Batch memory batch = Batches[_batchId];
        return (
            batch.id,
            batch.medicineIds,
            batch.RMSid,
            batch.MANid,
            batch.DISid,
            batch.RETid
        );
    }

    

    // Retailer Request System
    struct RetailerRequest {
        uint256 id;
        uint256 retailerId;
        string name;
        string description;
        bool isApproved;
        bool isProcessed;
    }

    uint256 public requestCtr = 0;
    mapping(uint256 => RetailerRequest) public RetailerRequests;
    mapping(uint256 => uint256[]) public RetailerToRequests; // Maps retailer ID to their request IDs

    // Function for retailers to submit requests
    function submitRetailerRequest(string memory _name, string memory _description) public {
        uint256 retailerId = findRET(msg.sender);
        require(retailerId > 0, "Only registered retailers can submit requests");
        
        requestCtr++;
        RetailerRequests[requestCtr] = RetailerRequest(
            requestCtr,
            retailerId,
            _name,
            _description,
            false,
            false
        );
        RetailerToRequests[retailerId].push(requestCtr);
    }

    // Function for owner to approve requests
    function approveRetailerRequest(uint256 _requestId, uint256 _rmsId) public onlyByOwner {
        require(_requestId > 0 && _requestId <= requestCtr, "Invalid request ID");
        require(_rmsId > 0 && _rmsId <= rmsCtr, "Invalid RMS ID");
        require(!RetailerRequests[_requestId].isApproved, "Request already approved");
        
        RetailerRequests[_requestId].isApproved = true;
        
        // Get the retailer ID from the request
        uint256 retailerId = RetailerRequests[_requestId].retailerId;
        
        // Automatically add the medicine to the system with the retailer ID
        addMedicine(
            RetailerRequests[_requestId].name,
            RetailerRequests[_requestId].description,
            _rmsId
        );
        
        // Set the retailer ID for the newly added medicine
        MedicineStock[medicineCtr].RETid = retailerId;
    }

    // Function to get all requests for a retailer
    function getRetailerRequests(uint256 _retailerId) public view returns (uint256[] memory) {
        return RetailerToRequests[_retailerId];
    }

    // Function to get request details
    function getRequestDetails(uint256 _requestId) public view returns (
        uint256 id,
        uint256 retailerId,
        string memory name,
        string memory description,
        bool isApproved,
        bool isProcessed
    ) {
        require(_requestId > 0 && _requestId <= requestCtr, "Invalid request ID");
        RetailerRequest memory request = RetailerRequests[_requestId];
        return (
            request.id,
            request.retailerId,
            request.name,
            request.description,
            request.isApproved,
            request.isProcessed
        );
    }

    // Function to update medicine location data
    function updateMedicineLocation(uint256 _medicineID, string memory _locationData) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr, "Invalid medicine ID");
        uint256 _id = findRMS(msg.sender);
        require(_id > 0, "Only registered RMS can update location");
        require(_id == MedicineStock[_medicineID].RMSid, "Unauthorized RMS for this medicine");
        
        MedicineStock[_medicineID].newRMS = _locationData;
    }
}
