const { default: Web3 } = require("web3");
const {
  ABI_ID,
  CONTRACT_ADDRESS,
  INFURA_KEY,
  PRIVATE_KEY,
  QUICK_NODE_KEY,
} = require("../conf/config.js");

class Blockchain {
  provider = `https://sepolia.infura.io/v3/${INFURA_KEY}`;
  web3 = new Web3(this.provider);

  contract_abi = ABI_ID;
  contract_address = CONTRACT_ADDRESS;

  contract = new this.web3.eth.Contract(
    this.contract_abi,
    this.contract_address
  );
  account = this.web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);

  constructor() {
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
  async addIpRecordToContract(
    newTitle,
    newIpType,
    newProofs,
    newDescription,
    newLinks,
    newExtraInfo,
    newLicenseType,
    newOwnerName,
    newOwnerProofIdentifier,
    newOwnerDigitalSign
  ) {
    console.log(
      newTitle,
      newIpType,
      newProofs,
      newDescription,
      newLinks,
      newExtraInfo,
      newLicenseType,
      newOwnerName,
      newOwnerProofIdentifier,
      newOwnerDigitalSign
    );
    const newOwnerProofType = "Aadhar";
    console.log("~~~~~~~~~~proofs:~~~~", newProofs, "~~~~~~~~~~~~~~~");
    console.log("~~~~~~~~~links:~~~~~", newLinks, "~~~~~~~~~~~~~~~");

    try {
      const documentId = await this.contract.methods
        .addIpRecord(
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
          newOwnerDigitalSign
        )
        .send({ from: this.account.address, gas: 3000000 });
      const docId = await this.contract.methods.getIpId().call();
      //console.log('!!!!!!!!!!!!!!docId: ',docId.toString(),'!!!!!!!!!!!');
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
        type: documentId.type.toString(),
      };

      const docInfo = {
        title: newTitle,
        blockNumber: serializedTransaction.blockNumber,
        trxnHash: serializedTransaction.transactionHash,
        documentId: docId.toString(),
      };
      return docInfo;
    } catch (error) {
      console.log(
        "------------------Task exited with error: ",
        error,
        "---------------------"
      );
      return false;
    }
  }

  async readIpRecordToContract(newIpId) {
    try {
      const ipRecord = await this.contract.methods.readIpRecord(newIpId).call();
      const resIpRecord = {
        id: ipRecord.id.toString(),
        title: ipRecord.title,
        ipType: ipRecord.ipType,
        description: ipRecord.description,
        proofs: ipRecord.proofs,
        links: ipRecord.links,
        extraInfo: ipRecord.extraInfo,
        licenseType: ipRecord.licenseType,
        ownerName: ipRecord.ownerName,
        ownerProofType: ipRecord.ownerProofType,
        ownerProofIdentifier: ipRecord.ownerProofIdentifier,
        ownerDigitalSign: ipRecord.ownerDigitalSign,
        timestamp: ipRecord.timestamp.toString(),
      };
      return resIpRecord;
    } catch (error) {
      console.error(
        "---------------------Error reading IP record:",
        error,
        "------------------------"
      );
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
    newDocument
  ) {
    try {
      const documentId = await this.contract.methods
        .addWillRecord(
          newExecutorName,
          newExecutorIdProof,
          newExecutorDigitalSign,
          newTestatorName,
          newTestatorIdProof,
          newTestatorDigitalSign,
          newWitnessName,
          newWitnessIdProof,
          newWitnessDigitalSign,
          newDocument
        )
        .send({ from: this.account.address, gas: 3000000 });
      const docId = await this.contract.methods.getWillId().call();
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
        type: documentId.type.toString(),
      };
      const docInfo = {
        type: "will",
        blockNumber: serializedTransaction.blockNumber,
        trxnHash: serializedTransaction.transactionHash,
        documentId: docId.toString(),
      };
      return docInfo;
    } catch (error) {
      console.log(
        "------------------Task exited with error: ",
        error,
        "---------------------"
      );
      return false;
    }
  }

  async readWillRecordToContract(newWillId) {
    try {
      const willRecord = await this.contract.methods
        .readWillRecord(newWillId)
        .call();
      const resWillRecord = {
        id: willRecord.id.toString(),
        executorName: willRecord.executorName,
        executorIdProof: willRecord.executorIdProof,
        executorDigitalSign: willRecord.executorDigitalSign,
        testatorName: willRecord.testatorName,
        testatorIdProof: willRecord.testatorIdProof,
        testatorDigitalSign: willRecord.testatorDigitalSign,
        witnessName: willRecord.witnessName,
        witnessIdProof: willRecord.witnessIdProof,
        witnessDigitalSign: willRecord.witnessDigitalSign,
        willDocument: willRecord.document,
        timestamp: willRecord.timestamp.toString(),
      };

      return resWillRecord;
    } catch (error) {
      console.error(
        "---------------------Error reading IP record:",
        error,
        "------------------------"
      );
      return false;
    }
  }
}
module.exports = Blockchain;
