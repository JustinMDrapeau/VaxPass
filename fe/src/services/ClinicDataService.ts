import ContractService from "./ContractService";
import TransactionRequest from "../types/TransactionRequest";

class ClinicDataService {

  async mintAndTransfer(clinicPublicKey: string, clinicPrivateKey: string, product: string, lot: string, phase: number, date: string, patientPublicKey: string) {

    const ID_GOES_HERE = 4;

    let mintRequest: TransactionRequest = {}
    mintRequest.data = ContractService.getContract().methods.mintNFT(product, lot, phase, date).encodeABI()
    
    const mintingSignedTransaction = await ContractService.signTransaction(mintRequest, clinicPublicKey, clinicPrivateKey);
    const mintReceipt = await ContractService.sendSignedTransaction(mintingSignedTransaction.rawTransaction as string).on("receipt", (receipt : any)=>{});

    let transferRequest: TransactionRequest = {}
    transferRequest.data = ContractService.getContract().methods.transferFrom(clinicPublicKey, patientPublicKey, ID_GOES_HERE).encodeABI()

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
}

export default new ClinicDataService();