require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PATIENT_PUBLIC_KEY = process.env.PATIENT_PUBLIC_KEY;
const Wallet = require('ethereumjs-wallet').default
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/vaxNFT.sol/VaxNFT.json");
const contractAddress = "0xad5306305153930e6090FE430aF4573E356B6c3C";
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
    'data': nftContract.methods.mintNFT(manufacturer, phase).encodeABI()
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

async function patientSignup(pubk, privk, hash) {
  const nonce = await web3.eth.getTransactionCount(pubk, 'latest'); // Get latest nonce

  // The transaction that connects the clinic account to the smart contract
  const tx = {
    'from': pubk,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.patientSignup(hash).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, privk);
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

async function clinicSignup(pubk, privk, name, address, email) {
  const nonce = await web3.eth.getTransactionCount(pubk, 'latest'); // Get latest nonce

  // The transaction that connects the clinic account to the smart contract
  const tx = {
    'from': pubk,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.clinicSignup(name, address, email).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, privk);
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

async function clinicLogin(pubk, privk) {
  const nonce = await web3.eth.getTransactionCount(pubk, 'latest'); // Get latest nonce

  // The transaction that connects the clinic account to the smart contract
  const tx = {
    'from': pubk,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.clinicLogin().encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, privk);
  signPromise.then((signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', console.log)
  })
}

// mintNFT('Tharse', 'Yokan', 'Pfizer', 1)

// clinicSignup(PUBLIC_KEY, PRIVATE_KEY, 'Hospital of Toronto', '25 Bay Street Toronto Canada L8B93W', 'admin@torontohospital.com')

// clinicLogin(PUBLIC_KEY, PRIVATE_KEY)
// nftContract.methods.walletIdToClinic(PUBLIC_KEY).call()
// .then((result) => {
//   console.log(result)
// })
// .catch((err) => {
//     console.log(err)
// })

// let sig = web3.eth.sign("test", PRIVATE_KEY);
// console.log(sig)
console.log(Wallet.fromPrivateKey(Buffer.from(PRIVATE_KEY, 'hex')).getAddress().toString('hex'));
// Test that the map tokenIdTokenInfo (tokenId -> NFT metadata) contains the newly minted NFT

// nftContract.methods.tokenIdTokenInfo(1).call()
// .then((result) => {
//   console.log(result)
// })
// .catch((err) => {
//     console.log(err)
// })