require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PATIENT_PUBLIC_KEY = process.env.PATIENT_PUBLIC_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/vaxNFT.sol/VaxNFT.json");
const contractAddress = "0x981d49437bA0cE0fDbB18f485482252d05a7ecC0";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(firstName, lastName, manufacturer, phase) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // Get latest nonce

  // The transaction that connects the clinic account to the smart contract
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNFT(firstName, lastName, manufacturer, phase).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function(err, hash) {
      if (!err) {
        console.log("The hash of your mint transaction is: ", hash); 
        while(await web3.eth.getTransactionReceipt(hash) == null) {}
        transferNFT();
      } else {
        console.log("Something went wrong when submitting your mint transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

async function transferNFT() {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // Get latest nonce

  // The transaction that connects the clinic account to the smart contract
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.transferNFT(PATIENT_PUBLIC_KEY).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transfer transaction is: ", hash); 
      } else {
        console.log("Something went wrong when submitting your transfer transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

mintNFT('Sharan', 'Somas', 'Pfizer', 2)

// nftContract.methods.tokenURI(1).call()
// .then((result) => {
//   console.log(result)
//   console.log(result.split(",")[0])
//   console.log(result.split(",")[1].substring(0, result.split(",")[1].length - 2))
//   base64_string = result.split(",")[1].substring(0, result.split(",")[1].length - 2)
//   console.log(Buffer.from(base64_string, 'base64').toString('ascii'));
// })
// .catch((err) => {
//     console.log(err)
// })

// nftContract.methods.tokenIdTokenInfo(1).call()
// .then((result) => {
//   console.log(result)
// })
// .catch((err) => {
//     console.log(err)
// })