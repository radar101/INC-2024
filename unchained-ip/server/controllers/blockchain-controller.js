
const {default : Web3} = require("web3");
//import Web3 from "web3";
const { ABI_ID, CONTRACT_ADDRESS, INFURA_KEY, PRIVATE_KEY, QUICK_NODE_KEY } = require("../conf/config.js");
//import { ABI_ID, CONTRACT_ADDRESS, INFURA_KEY, PRIVATE_KEY, QUICK_NODE_KEY } from "../conf/config.js";

class Blockchain 
{
    
    provider = `https://sepolia.infura.io/v3/${INFURA_KEY}`; 
    //provider = 'https://responsive-divine-flower.ethereum-sepolia.quiknode.pro/${QUICK_NODE_KEY}';
    web3 =  new Web3(this.provider);

    contract_abi = ABI_ID;
    contract_address = CONTRACT_ADDRESS;

    contract = new this.web3.eth.Contract(this.contract_abi,this.contract_address);
    account = this.web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    

    constructor()
    {
        //this.web3.eth.accounts[0] = this.account;
        this.web3.eth.accounts.wallet.add(this.account);
    }

    /*
    Test contract functions:

    async setContractString(){
        const useBool = await this.contract.methods.writeString("test String").send({from: this.account.address, gas: 3000000});
        // const signedTxn = await this.contract.methods.writeString("test String").signTransaction({from: this.account.address, gas: 3000000});
        // const useBool = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);
        console.log("-------------------", useBool, "-------------------");
    }

    // async setContractString(){
    //     const encodedABI = await this.contract.methods.writeString("test String").encodeABI();

    //     const signedTx = await this.web3.eth.accounts.signTransaction({
    //         from: this.account.address,
    //         gas: 3000000,
    //         gasPrice: 20000,
    //         to: CONTRACT_ADDRESS, // Assuming 'contract' has options property with address
    //         data: encodedABI,
    //         value:'0x00',
    //       });

    //     const useBool = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction)

    //     console.log("-------------------", useBool, "-------------------");
    // }


    async getContractString(){
        const useString = await this.contract.methods.readString().call();
        console.log("-------------------", useString, "-------------------");
    }
*/
    async addIpRecordToContract(newTitle, newIpType,newProofs, newDescription, newLinks, newExtraInfo, newLicenseType, newOwnerName, newOwnerProofIdentifier, newOwnerDigitalSign)
    {
        // const newIpRecord = {newTitle, newIpType, newDescription, newProofs, newLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign};
        /*const newIpRecord = {
            useTitle: 'newTitle',
            useIpType: 'newIpType',
            useDescription: 'newDescription',
            useProofs: ['newProof 1', 'newProof 2'],
            useLinks: ['newLink 1', 'newlink 2'],
            useExtraInfo: 'newExtrainfo',
            useLicenseType: 'newLicenseType',
            useOwnerName: 'newOwnerName',
            useOwnerProofType: 'newOwnerProofType',
            useOwnerProofIdentifier: 'newOwnerProofIdentifier',
            useOwnerDigitalSign: 'newOwnerDigitalSign',
        }*/
        const newOwnerProofType = "Adhar";
        console.log('~~~~~~~~~~proofs:~~~~',newProofs,'~~~~~~~~~~~~~~~');
        console.log('~~~~~~~~~links:~~~~~',newLinks,'~~~~~~~~~~~~~~~');

        try{
            const documentId = await this.contract.methods.addIpRecord(
            newTitle,
            newIpType,
            newDescription,
            newProofs,
            newLinks,
            newExtraInfo,
            newLicenseType,
            newOwnerName,
            newOwnerProofType,
            newOwnerProofIdentifier,
            newOwnerDigitalSign,
            ).send({from: this.account.address});
            const docId = await this.contract.methods.getIpId().call();
            console.log('!!!!!!!!!!!!!!docId: ',docId.toString(),'!!!!!!!!!!!');
            const serializedTransaction = {
                transactionHash: documentId.transactionHash,
                transactionIndex: documentId.transactionIndex.toString(),
                blockNumber: documentId.blockNumber.toString(),
                blockHash: documentId.blockHash,
                from: documentId.from,
                to: documentId.to,
                cumulativeGasUsed: documentId.cumulativeGasUsed.toString(),
                gasUsed: documentId.gasUsed.toString(),
                logs: documentId.logs,
                logsBloom: documentId.logsBloom,
                status: documentId.status.toString(),
                effectiveGasPrice: documentId.effectiveGasPrice.toString(),
                type: documentId.type.toString()
            };
            
            const docInfo = {
                blockNumber: serializedTransaction.blockNumber,
                trxnHash: serializedTransaction.transactionHash,
                documentId: docId.toString(),
            };
            return docInfo;
        }catch(error){
            console.log('------------------Task exited with error: ', error, '---------------------');
            return false;
        }
    }
    
    async readIpRecordToContract(newIpId)
    {
        try {
            const ipRecord = await this.contract.methods.readIpRecord(newIpId).call();
            return ipRecord;
        } catch (error) {
            console.error('---------------------Error reading IP record:', error, '------------------------');
            return false;
        }
    }

    //Will record handling:

    async addWillRecordToContract(
        newExecutorName,
        newExecutorIdProof,
        newExecutorDigitalSign,
        newTestatorName,
        newTestatorIdProof,
        newTestatorDigitalSign,
        newWitnessName,
        newWitnessIdProof,
        newWitnessDigitalSign,
        newDocument,
    )
    {
        try{
            const trxnData = await this.contract.methods.addWillRecord(
                newExecutorName,
                newExecutorIdProof,
                newExecutorDigitalSign,
                newTestatorName,
                newTestatorIdProof,
                newTestatorDigitalSign,
                newWitnessName,
                newWitnessIdProof,
                newWitnessDigitalSign,
                newDocument,
            ).send({from: this.account.address});
            const docId = await this.contract.methods.getWillId().call();
            const docInfo = {
                blockNumber: trxnData.blockNumber,
                trxnHash: trxnData.transactionHash,
                documentId: docId,
            };
            return docInfo;
        }catch(error){
            console.log('------------------Task exited with error: ', error, '---------------------');
            return false;
        }
    }
    
    async readWillRecordToContract(newWillId)
    {
        try {
            const willRecord = await this.contract.methods.readWillRecord(newWillId).call();
            return willRecord;
        } catch (error) {
            console.error('---------------------Error reading IP record:', error, '------------------------');
            return false;
        }
    }

}
module.exports = Blockchain;