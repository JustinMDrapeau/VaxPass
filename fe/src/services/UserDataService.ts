import ContractService from "./ContractService";

// Source:  https://www.bezkoder.com/react-typescript-axios/
class PatientDataService {
  async getUserTokens(patientPublicKey: string) {
    return await ContractService.getContract().methods.tokensOfOwner(patientPublicKey).call()
  }

  getPatientHash(patientPublicKey: string) {
    return ContractService.getContract().methods.walletIdToPatientHash(patientPublicKey).call()
  }
  
  createAccount() {
    return (ContractService.createAccount()[0])
  }
}

export default new PatientDataService();