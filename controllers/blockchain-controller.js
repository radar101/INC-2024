
import Web3 from "web3";
import { ABI_ID, CONTRACT_ADDRESS, INFURA_KEY, PRIVATE_KEY } from "../conf/conf.js";

class Blockchain 
{
    
    provider = `htps://mainnet.infura.io/v3/${INFURA_KEY}`; 
    web3 =  new Web3(this.provider);

    contract_abi = ABI_ID;
    contract_address = CONTRACT_ADDRESS;

    contract = new this.web3.eth.Contract(this.contract_abi,this.contract_address);
    account = this.web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);

    constructor()
    {

    }

    async addIpRecordTocontract(newTitle, newIpType, newDescription, stnewProofs, stnewLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign)
    {
        const newIpRecord = {newTitle, newIpType, newDescription, stnewProofs, stnewLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign};
        //var documentId;

        try{
            const documentId = await contract.methods.addIpRecord(newIpRecord).send({from: account});
            //handle storage of the document id in user's profile data
            console.log('IP record added successfully! Id: ', documentId);
            return documentId;
        }catch(error){
            console.log('Task exited with error: ', error);
            return false;
        }
    }
    
    async readIpRecordToContract(newIpId)
    {
        try {
            const ipRecord = await contract.methods.readIpRecord(newIpId)
                                              .call();
            console.log('IP Record:', ipRecord);
            return ipRecord;
        } catch (error) {
            console.error('Error reading IP record:', error);
            return false;
        }
    }


    
}
