


import dotenv from 'dotenv'
dotenv.config();

export const INFURA_KEY = process.env.INFURA_KEY;
export const PUBLIC_KEY  = process.env.WALLET_PUBLIC_KEY;
export const PRIVATE_KEY= process.env.WALLET_PRIVATE_KEY;
export const FILE_SERVER_URL = process.env.FILE_SERVER_URL;
export const ABI_ID = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			}
		],
		"name": "Added",
		"type": "event"
	},
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
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "useItemId",
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
					}
				],
				"internalType": "struct IpContract.IpRecord",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// export const ABI_ID = [
// 	{
// 		"inputs": [],
// 		"name": "getString",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "useString",
// 				"type": "string"
// 			}
// 		],
// 		"name": "setString",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ]



export const CONTRACT_ADDRESS= process.env.CONTRACT_ADDRESS

