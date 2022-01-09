require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/vaxNFT.sol/VaxNFT.json");
const contractAddress = "0x6C67EFb7305cFf19a918cF79968E90ac785D0bFa";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(firstName, lastName, manufacturer, phase) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY, //TODO CLINIC ? PERSON
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNFT(firstName, lastName, manufacturer, phase).encodeABI()
  };


  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

// mintNFT('Sharan', 'Somas', 'Pfizer', 2)

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

nftContract.methods.tokenIdTokenInfo(1).call()
.then((result) => {
  console.log(result)
})
.catch((err) => {
    console.log(err)
})