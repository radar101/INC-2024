


import dotenv from 'dotenv'


export const INFURA_KEY = process.env.INFURA_KEY;
export const PUBLIC_KEY  = process.env.WALLET_PUBLIC_KEY;
export const PRIVATE_KEY= process.env.WALLET_PRIVATE_KEY;
export const QUICK_NODE_KEY	 = process.env.QUICK_NODE_KEY;


//Test contract abi:
// export const ABI_ID = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "_newString",
// 				"type": "string"
// 			}
// 		],
// 		"name": "writeString",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "readString",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]

//Final contract abi:
export const ABI_ID = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "useTitle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useIpType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useDescription",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "useProofs",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "useLinks",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "useExtrainfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useLicenseType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useOwnerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useOwnerProofType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useOwnerProofIdentifier",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useOwnerDigitalSign",
				"type": "string"
			}
		],
		"name": "addIpRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "useExecutorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useExecutorIdProof",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useExecutorDigitalSign",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useTestatorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useTestatorIdProof",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useTestatorDigitalSign",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useWitnessName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useWitnessIdProof",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useWitnessDigitalSign",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "useDocument",
				"type": "string"
			}
		],
		"name": "addWillRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getIpId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWillId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "useIpItemId",
				"type": "uint256"
			}
		],
		"name": "readIpRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "proofs",
						"type": "string[]"
					},
					{
						"internalType": "string[]",
						"name": "links",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "extraInfo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "licenseType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ownerName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ownerProofType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ownerProofIdentifier",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ownerDigitalSign",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct IpContract.IpRecord",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "useWillItemId",
				"type": "uint256"
			}
		],
		"name": "readWillRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "executorName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "executorIdProof",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "executorDigitalSign",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "testatorName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "testatorIdProof",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "testatorDigitalSign",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "witnessName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "witnessIdProof",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "witnessDigitalSign",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "document",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct IpContract.WillRecord",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


export const CONTRACT_ADDRESS= process.env.CONTRACT_ADDRESS

