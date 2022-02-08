import ContractService from "./ContractService";
import TransactionRequest from "../types/TransactionRequest";

const TOPIC_ID= "0x65f4dc08c4c2661a2ccb6e433da77c60168189d45e70829ac6cac16dc09e4984";
const CENTRAL_PROVIDER_PUBLIC = "0xC3Aec3B04Acfd5fE855Cb7d0c1E6440549CA8589";
const CENTRAL_PROVIDER_PRIVATE = "8a692f566aa1f0315aea38a299bf6f31173a9fbc7426eae597c596c01438de28";
const MINIMUM_ACCOUNT_BALANCE = 0.001;

class ClinicDataService {

  async mintAndTransfer(clinicPublicKey: string, clinicPrivateKey: string, product: string, lot: string, phase: number, date: string, patientPublicKey: string) {
    let mintRequest: TransactionRequest = {}
    mintRequest.data = ContractService.getContract().methods.mintNFT(product, lot, phase, date).encodeABI()
    
    const mintingSignedTransaction = await ContractService.signTransaction(mintRequest, clinicPublicKey, clinicPrivateKey);
    const mintReceipt = await ContractService.sendSignedTransaction(mintingSignedTransaction.rawTransaction as string).on("receipt", (receipt : any)=>{});
    const transactionLog = mintReceipt.logs.filter((log : any) => {return log.topics.includes(TOPIC_ID)})[0]    // TOPIC ID changes if the smart contract is recreated

    let transferRequest: TransactionRequest = {}
    transferRequest.data = ContractService.getContract().methods.transferFrom(clinicPublicKey, patientPublicKey, parseInt(transactionLog.data)).encodeABI()

    const transferSignedTransaction = await ContractService.signTransaction(transferRequest, clinicPublicKey, clinicPrivateKey);
    const transferReceipt = await ContractService.sendSignedTransaction(transferSignedTransaction.rawTransaction as string).on("receipt", (receipt : any) => {});

    return "done";
  }

  getClinicInfo(clinicPublicKey: string) {
    return ContractService.getContract().methods.walletIdToClinic(clinicPublicKey).call();
  }

  async createAccount(name: string, address: string, email: string, publicAddress: string, privateAddress: string) {

    let transactionPublicAddress, transactionPrivateAddress;
    const walletExists = publicAddress && privateAddress ? true : false;

    if (!walletExists) {
      [publicAddress, privateAddress] = ContractService.createAccount();
    }
    [transactionPublicAddress, transactionPrivateAddress]  = walletExists ? [publicAddress, privateAddress]: [CENTRAL_PROVIDER_PUBLIC, CENTRAL_PROVIDER_PRIVATE];

    const accountBalance : number = await ContractService.getBalance(transactionPublicAddress);
    if ( accountBalance < MINIMUM_ACCOUNT_BALANCE) {
      return walletExists ? ["Insufficent ETH balance for wallet. Please load more ETH and try again."] : ["VaxPass is currently experiencing difficulties creating accounts. Try creating an account using your own wallet or try again later."];
    }

    let clinicCreationRequest: TransactionRequest = {};
    clinicCreationRequest.data = ContractService.getContract().methods.clinicSignup(name, address, email, publicAddress).encodeABI();
    
    const clinicCreationSignedTransaction = await ContractService.signTransaction(clinicCreationRequest, transactionPublicAddress, transactionPrivateAddress);
    const clinicCreationReceipt = await ContractService.sendSignedTransaction(clinicCreationSignedTransaction.rawTransaction as string).on("receipt", (receipt : any) => {});

    return [publicAddress, privateAddress];
  }

}

export default new ClinicDataService();