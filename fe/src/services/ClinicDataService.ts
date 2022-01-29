import ContractService from "./ContractService";
import TransactionRequest from "../types/TransactionRequest";

// Source:  https://www.bezkoder.com/react-typescript-axios/
class ClinicDataService {

  mintAndTransfer(mintData: TransactionRequest, transferData: TransactionRequest, clinicPublicKey: string, clinicPrivateKey: string) {
    ContractService.signTransaction(mintData, clinicPublicKey, clinicPrivateKey).then((signedMint : any) => {
      ContractService.sendSignedTransaction(signedMint.rawTransaction as string).on("receipt", (mintReceipt : any) => {
        ContractService.signTransaction(transferData, clinicPublicKey, clinicPrivateKey).then((signedTransfer : any) => {
          ContractService.sendSignedTransaction(signedTransfer.rawTransaction as string).on("receipt", (transferReceipt : any) => {
            console.log("Done")
          })
        })
      })
    }) 
  }

}

export default new ClinicDataService();