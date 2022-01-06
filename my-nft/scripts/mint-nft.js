require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const PATIENT_PUBLIC_KEY = process.env.PATIENT_PUBLIC_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/vaxNFT.sol/MyNFT.json");
const contractAddress = "0x50e61f3E38583a6ACF1614B499d83370D3bc0dDD";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY, //TODO CLINIC ? PERSON
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };


  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {

    console.log("in minted!")
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
        while(await web3.eth.getTransactionReceipt(hash) == null){} // Wait for the minting to be done
        
        transferNFT() // Transfer the nft from the clinic to the patient
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });

  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

async function transferNFT() {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest') + 1; //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY, //TODO CLINIC ? PERSON
    'to': contractAddress,
    'nonce': nonce,
    'gas': 1000000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.transferNFT(PUBLIC_KEY, PATIENT_PUBLIC_KEY).encodeABI() // Transfer NFT transaction data
  };


  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transfer transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transfer transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmVfbVxXNiu8sy2wC5n6SRTsrLHSM3XL1b24mDYQ5YqbmH")
transferNFT() 