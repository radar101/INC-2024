// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract IpContract{

    uint256 ipItemCount = 1;
    uint256 willItemCount = 0;

    event Added(
        uint256 ipItemCount,
        string description,
        IpRecord record
    );
    
    constructor() public {
        IpMap[0].id = 1;
        IpMap[0].title = "Demo";
        IpMap[0].ipType = "Demo";
        IpMap[0].description = "Demo";
        IpMap[0].proofs.push("Demo");
        IpMap[0].links.push("Demo");
        IpMap[0].extraInfo = "Demo";
        IpMap[0].licenseType = "Demo";
        IpMap[0].ownerName = "Demo";
        IpMap[0].ownerProofType = "Demo";
        IpMap[0].ownerProofIdentifier = "Demo";
        IpMap[0].ownerDigitalSign = "Demo";
    }

    struct IpRecord{
        uint256 id;
        string title;
        string ipType;
        string description;
        string[] proofs;
        string[] links;
        string extraInfo;
        string licenseType;
        string ownerName;
        string ownerProofType;
        string ownerProofIdentifier;
        string ownerDigitalSign;
    }

    struct WillRecord{
        uint256 id;
        string executorName;
        //string executorIdProofType;
        string executorIdProof;
        string executorDigitalSign;
        string testatorName;
        //string testatorIdProofType;
        string testatorIdProof;
        string testatorDigitalSign;
        string witnessName;
        //string witnessIdProofType;
        string witnessIdProof;
        string witnessDigitalSign;
        string document;
    }

    mapping(uint256 => IpRecord) IpMap;
    mapping(uint256 => WillRecord) WillMap;

    function addIpRecord(string memory useTitle, string memory useIpType, string memory useDescription, string[] memory useProofs, string[] memory useLinks, string memory useExtrainfo, string memory useLicenseType, string memory useOwnerName, string memory useOwnerProofType, string memory useOwnerProofIdentifier, string memory useOwnerDigitalSign) public returns (uint256){

        IpRecord memory newIpRecord = IpRecord({
            id: ipItemCount,
            title: useTitle,
            ipType: useIpType,
            description: useDescription,
            proofs: useProofs,
            links: useLinks,
            extraInfo: useExtrainfo,
            licenseType: useLicenseType,
            ownerName: useOwnerName,
            ownerProofType: useOwnerProofType,
            ownerProofIdentifier: useOwnerProofIdentifier,
            ownerDigitalSign: useOwnerDigitalSign
        });
        IpMap[ipItemCount] = newIpRecord;
        ipItemCount++;
        emit Added(ipItemCount, "Data added", IpMap[ipItemCount-1]);
        return ipItemCount-1;
    }

    function readIpRecord(uint256 useIpItemId) public view returns (IpRecord memory){
        require(ipItemCount > useIpItemId, "Invalid Ip ID");
        return(IpMap[useIpItemId]);
    }

    function addWillRecord(
        string memory useExecutorName,
        //string memory useExecutorIdProofType,
        string memory useExecutorIdProof,
        string memory useExecutorDigitalSign,
        string memory useTestatorName,
        //string memory useTestatorIdProofType,
        string memory useTestatorIdProof,
        string memory useTestatorDigitalSign,
        string memory useWitnessName,
        //string memory useWitnessIdProofType,
        string memory useWitnessIdProof,
        string memory useWitnessDigitalSign,
        string memory useDocument
    ) public returns (uint256) {

        WillRecord memory newWillRecord = WillRecord({
            id: willItemCount,
            executorName: useExecutorName,
            //executorIdProofType: useExecutorIdProofType,
            executorIdProof: useExecutorIdProof,
            executorDigitalSign: useExecutorDigitalSign,
            testatorName: useTestatorName,
            //testatorIdProofType: useTestatorIdProofType,
            testatorIdProof: useTestatorIdProof,
            testatorDigitalSign: useTestatorDigitalSign,
            witnessName: useWitnessName,
            //witnessIdProofType: useWitnessIdProofType,
            witnessIdProof: useWitnessIdProof,
            witnessDigitalSign: useWitnessDigitalSign,
            document: useDocument
        });

        WillMap[willItemCount] = newWillRecord;
        willItemCount++;
        //emit Added(willItemCount - 1);

        return willItemCount-1;
    }

    function readWillRecord(uint256 useWillItemId) public view returns (WillRecord memory) {
        require(willItemCount > useWillItemId, "Invalid Will ID");
        return WillMap[useWillItemId];
    }
}