import React, { Component } from 'react';
import './App.css';
import Web3, { Contract } from 'web3';

class App extends Component {
  // constructor(props) {
  //   super(props); // Call the parent constructor

  //   this.loadBlockchain(); // Call the loadBlockchain method
  // }

  // async loadBlockchain() {
  //   try {
  //     const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
  //     const networkId = await web3.eth.net.getId();
  //     const contract = new web3.eth.Contract(IpContract.abi, IpContract.networks[networkId].address);
  //     const account = web3.eth.accounts.privateKeyToAccount("0x6c73450bdea97857ea9cc8123a12a0c0e9e4f76308697ac105eae5927773e6da");

  //   } catch (error) {
  //     console.error('Error occurred while loading blockchain:', error);
  //   }
  // }

  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
