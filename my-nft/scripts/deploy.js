async function main() {
    // Grab the contract factory 
    const MyNFT = await ethers.getContractFactory("VaxNFT");
 
    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await MyNFT.deploy(); // Instance of the contract
    console.log("Contract deployed to address:", myNFT.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });

   //0x64985f6999cB8eaB2F7dbEF5448d9cfDF05DAb48