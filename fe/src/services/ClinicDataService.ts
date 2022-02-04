import ContractService from "./ContractService";
import TransactionRequest from "../types/TransactionRequest";

class ClinicDataService {

  mintAndTransfer(clinicPublicKey: string, clinicPrivateKey: string, doseManufacturer: string, lotNumber: string, patientPublicKey: string) {

    let mintRequest: TransactionRequest = {}
    mintRequest.data = ContractService.getContract().methods.mintNFT(doseManufacturer, lotNumber).encodeABI()
    
    let transferRequest: TransactionRequest = {}
    transferRequest.data = ContractService.getContract().methods.transferNFT(patientPublicKey).encodeABI()
    
    ContractService.signTransaction(mintRequest, clinicPublicKey, clinicPrivateKey).then((signedMint : any) => {
      ContractService.sendSignedTransaction(signedMint.rawTransaction as string).on("receipt", (mintReceipt : any) => {
        ContractService.signTransaction(transferRequest, clinicPublicKey, clinicPrivateKey).then((signedTransfer : any) => {
          ContractService.sendSignedTransaction(signedTransfer.rawTransaction as string).on("receipt", (transferReceipt : any) => {
            console.log("Done")
          })
        })
      })
    }) 
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