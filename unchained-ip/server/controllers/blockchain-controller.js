const { default: Web3 } = require("web3");
const IpContract = require('../abis/IpContract.json');

class Blockchain {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
        this.loadBlockchain();
    }

    async loadBlockchain() {
        try {
            this.web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
            const networkId = await this.web3.eth.net.getId();
            this.contract = new this.web3.eth.Contract(IpContract.abi, IpContract.networks[networkId].address);
            this.account = this.web3.eth.accounts.privateKeyToAccount("0x47d5c913be7077ca7a76de2e25c1e7fe480ea9ed95dfff25902a243a8d652bf2");
            this.web3.eth.getBalance(this.account.address)
                .then(balance => {
                    const etherBalance = this.web3.utils.fromWei(balance, 'ether');
                    console.log("Total Ether Balance:", etherBalance, "ETH");
                })
                .catch(error => {
                    console.error('Error fetching account balance:', error);
                });

        } catch (error) {
            console.error('Error occurred while loading blockchain:', error);
        }
    }

    async addIpRecordTocontract(newIpRecord) {
        let { newTitle, newIpType, newDescription, stnewProofs, stnewLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign } = newIpRecord;
        stnewLinks = stnewLinks.split(',');
        stnewProofs = stnewProofs.split(',');
        try {
            const documentId = await this.contract.methods.addIpRecord(newTitle, newIpType, newDescription, stnewProofs, stnewLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign)
                .send({ from: this.account.address, gas: 3000000 }); // Adjust gas limit as needed
            //handle storage of the document id in user's profile data
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
            
            console.log('Serialized transaction:', serializedTransaction);
            return serializedTransaction;
            // const gasPrice = await this.web3.eth.getGasPrice();
            // console.log(gasPrice);
            // // Construct the transaction object
            // const tx = {
            //     from: this.account.address,
            //     to: IpContract.networks[5777].address, 
            //     value: '0', 
            //     gas: 2000000,
            //     gasPrice,
            //     data: this.contract.methods.addIpRecord(newTitle, newIpType, newDescription, stnewProofs, stnewLinks, newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, newOwnerProofIdentifier, newOwnerDigitalSign).encodeABI(),
            // };

            // // Sign the transaction with the connected account (prompts MetaMask)
            const signedTx = await this.web3.eth.accounts.signTransaction(documentId, null); // Assuming private key is managed by MetaMask

            // // Send the signed transaction
            const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            console.log('IP record added successfully! Transaction hash:', receipt.transactionHash);
            console.log('Transaction details:', receipt);
            return receipt.transactionHash;

        } catch (error) {
            console.log('Task exited with error: ', error);
            return false;
        }
    }

    async readIpRecordToContract(newIpId) {
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
module.exports = Blockchain;