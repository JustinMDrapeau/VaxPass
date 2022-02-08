import ContractService from "./ContractService";
import TransactionRequest from "../types/TransactionRequest";

const TOPIC_ID= "0x65f4dc08c4c2661a2ccb6e433da77c60168189d45e70829ac6cac16dc09e4984";

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

  login(clinicPublicKey: string, clinicPrivateKey: string) {
    let loginRequest: TransactionRequest = {}
    loginRequest.data = ContractService.getContract().methods.clinicLogin().encodeABI()

    ContractService.signTransaction(loginRequest, clinicPublicKey, clinicPrivateKey).then((signedLogin: any) => {
      ContractService.sendSignedTransaction(signedLogin.rawTransaction as string).on("receipt", (loginReceipt: any) => {
        console.log(loginReceipt);
      })
    })
  }

  getClinicInfo(clinicPublicKey: string) {
    return ContractService.getContract().methods.walletIdToClinic(clinicPublicKey).call()
  }

  createAccount() {
    return (ContractService.createAccount())
  }
  
}

export default new ClinicDataService();