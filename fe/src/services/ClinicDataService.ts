import http from "../http-common";
import CreateClinicRequest from "../types/CreateClinicRequest"
import LogInRequest from "../types/LogInRequest"
import ContractService from "../contract-common";
import TransactionRequest from "../types/TransactionRequest";

// Source:  https://www.bezkoder.com/react-typescript-axios/
class ClinicDataService {

  create(data: CreateClinicRequest) {
    return http.post(`/clinic`, data);
  }

  login(data: LogInRequest) {
    return http.post(`/clinic/login`, data);
  }

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