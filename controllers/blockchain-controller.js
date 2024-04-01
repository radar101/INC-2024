
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

    async addIpRecordTocontract()
    {
            
    }  


    
}
