
import Web3 from "web3";
import { ABI_ID, CONTRACT_ADDRESS, INFURA_KEY, PRIVATE_KEY } from "../conf/conf.js";

class Blockchain 
{
    
    
   // account = this.web3.eth.getAccounts();
    // async dfn(){
    //     this.account =  await this.web3.eth.requestAccounts();
    //          console.log(this.account);
         
    //  }
    constructor()
    {
        this.provider = `https://sepolia.infura.io/v3/${INFURA_KEY}`; 
        this.web3 =  new Web3(this.provider);

        this.contract_abi = ABI_ID;
        this.contract_address = CONTRACT_ADDRESS;

        this.contract = new this.web3.eth.Contract(this.contract_abi,this.contract_address);
            
    
    }
   

    async addIpRecordTocontract(newIpRecord)
    {
       const re = await this.readIpRecordToContract(0);

       return {re}; 


        let { newTitle, newIpType, newDescription, stnewProofs, stnewLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign } = newIpRecord;

    stnewLinks = stnewLinks.split(',');
    stnewProofs = stnewProofs.split(',');

    try {
        // Get gas price (adjust based on network conditions)
        const gasPrice = await this.web3.eth.gasPrice;

        // Construct the transaction object
        const tx = {
            from: this.account.address,
            to: this.contract_address, // Assuming the contract is the recipient
            value: '0', // Since you're not sending Ether in this call
            gas: 2000000, // Example gas limit, adjust as needed
            gasPrice,
            data: this.contract.methods.addIpRecord(newTitle, newIpType, newDescription, stnewProofs, stnewLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign).encodeABI(),
        };

        // Sign the transaction with the connected account (prompts MetaMask)
        const signedTx = await this.web3.eth.accounts.signTransaction(tx, null); // Assuming private key is managed by MetaMask

        // Send the signed transaction
        const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('IP record added successfully! Transaction hash:', receipt.transactionHash);
        console.log('Transaction details:', receipt);
        return receipt.transactionHash; // Or handle success differently

    } catch (error) {
        console.error('Task exited with error: ', error);
        return false;
    }
    //     let  {newTitle, newIpType, newDescription, stnewProofs, stnewLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign} =newIpRecord;
       
    //     stnewLinks = stnewLinks.split(',');
    //     stnewProofs= stnewProofs.split(',');

      
    //     //const IpRecord = {newTitle, newIpType, newDescription, stnewProofs, stnewLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign};
    // //      console.log("-=--------------------------------=-")
    // //      console.log(IpRecord);
    // //    // return "done";
    //     try{
    //         // const IpRecord = {
    //         //     newTitle: 'demo title',
    //         //     newIpType: 'demo',
    //         //     newDescription: 'demo',
    //         //     stnewProofs: ['demo1','demo2'],
    //         //     stnewLinks: ['demo1','demo2'],
    //         //     newExtrainfo: 'demo',
    //         //     newLicenseType: 'demo',
    //         //     newOwnerName: 'demo',
    //         //     newOwnerProofType: 'demo',
    //         //     newOwnerProofIdentifier: 'demo',
    //         //     newOwnerDigitalSign: 'demo'
    //         //   }
    //         // return this.account
            
    //         console.log(this.contract.methods);
    //         const documentId = await this.contract.methods.addIpRecord(newTitle, newIpType, newDescription, stnewProofs, stnewLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign)
    //         .send({ 
    //           from: this.account.address, 
    //           gas: 2000000, // Example gas limit, adjust as needed
    //           gasPrice: '1000000000' // Example gas price, adjust as needed
    //         })
            
    //         //handle storage of the document id in user's profile data
    //         console.log('IP record added successfully! Id: ', documentId);
    //         return documentId;
    //     }catch(error){
    //         console.log('Task exited with error: ', error);
    //         return false;
    //     }
    }
    
    async readIpRecordToContract(newIpId)
    {
        try {
            const ipRecord = await this.contract.methods.readIpRecord(newIpId)
                                              .call();
            console.log('IP Record:', ipRecord);
            return ipRecord;
        } catch (error) {
            console.error('Error reading IP record:', error);
            return false;
        }
    }

    async setContractString(){
        useString = "abc"
        useBool = await this.contract.methods.setString(useString).send({from: this.account.privateKey});
        console.log("-------------------", useBool, "-------------------");
    }

    async getContractString(){
        useString = await this.contract.methods.getString().call();
        console.log("-------------------", useString, "-------------------");
    }


    
}
export default Blockchain;