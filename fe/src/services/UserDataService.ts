import ContractService from "./ContractService";
import TransactionRequest from "../types/TransactionRequest";

// Source:  https://www.bezkoder.com/react-typescript-axios/
class PatientDataService {
  async getUserTokens(patientPublicKey: string) {
    return await ContractService.getContract().methods.tokensOfOwner(patientPublicKey).call();
  }

  getPatientHash(patientPublicKey: string) {
    return ContractService.getContract().methods.walletIdToPatientHash(patientPublicKey).call();
  }

  async setPatientHash(patientPublicKey: string, clinicPublicKey: string, clinicPrivateKey: string, patientHash: string) {
    console.log("In setPatientHash")
    let setPatientHashRequest: TransactionRequest = {}
    setPatientHashRequest.data = ContractService.getContract().methods.patientSignup(patientHash, patientPublicKey).encodeABI()
    console.log("setPatientHashRequest: " + JSON.stringify(setPatientHashRequest, null, 4))
    const signedTransaction = await ContractService.signTransaction(setPatientHashRequest, clinicPublicKey, clinicPrivateKey);
    console.log("signedTransaction complete")
    await ContractService.sendSignedTransaction(signedTransaction.rawTransaction as string).on("receipt", (receipt : any)=>{});
    console.log("receipt complete")
    return "done";
  }

  createAccount() {
    return ContractService.createAccount();
  }

}

export default new PatientDataService();