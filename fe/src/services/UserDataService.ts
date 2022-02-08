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

  async setPatientHash(patientPublicKey: string, patientPrivateKey: string, patientHash: string) {
    let setPatientHashRequest: TransactionRequest = {}
    setPatientHashRequest.data = ContractService.getContract().methods.patientSignup(patientHash).encodeABI()

    const signedTransaction = await ContractService.signTransaction(setPatientHashRequest, patientPublicKey, patientPrivateKey);
    const receipt = await ContractService.sendSignedTransaction(signedTransaction.rawTransaction as string).on("receipt", (receipt : any)=>{});

    return "done";
  }

  createAccount() {
    return ContractService.createAccount();
  }

}

export default new PatientDataService();