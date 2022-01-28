import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import contractArtifact from "./VaxNFT.json";
import TransactionRequest from "./types/TransactionRequest";

const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_API_URL as string);
const contract = new web3.eth.Contract(contractArtifact.abi as any, process.env.REACT_APP_CONTRACT_ADDRESS);

class ContractService {
    web3 : any;
    contract: any;

    constructor(web3: any, contract: any) {
        this.web3 = web3;
        this.contract = contract;
    }

    getContract() {
        return this.contract;
    }

    getNonce(publicKey : string) {
        return this.web3.eth.getTransactionCount(publicKey, 'latest');
    }

    async signTransaction(data: TransactionRequest, publicKey : string, privateKey: string) {
        data.nonce = await this.getNonce(publicKey);
        data.gas = 500000;
        data.maxPriorityFeePerGas = 1999999987;
        return this.web3.eth.accounts.signTransaction(data, privateKey)
    }

    sendSignedTransaction(signedRawTransaction : string) {
        return this.web3.eth.sendSignedTransaction(signedRawTransaction)
    }

    getTransactionReceipt(hash: string) {
        return this.web3.eth.getTransactionReceipt(hash)
    }

}

export default new ContractService(web3, contract);
