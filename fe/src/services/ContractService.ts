import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import contractArtifact from "../VaxNFT.json";
import TransactionRequest from "../types/TransactionRequest";

const CONTRACT_ADDRESS = "0x840a0877Ff1741e5B246f8D1bEc42CE99702C2e0"
const web3 = createAlchemyWeb3("https://eth-ropsten.alchemyapi.io/v2/YP1lq3MVFwDLVAD5jz2dqU0gDTDzWBGp");
const contract = new web3.eth.Contract(contractArtifact.abi as any, CONTRACT_ADDRESS);

class ContractService {
    web3 : any;
    contract: any;
    contractAddress: any;

    constructor(web3: any, contract: any) {
        this.web3 = web3;
        this.contract = contract;
        this.contractAddress = CONTRACT_ADDRESS;
    }

    getContract() {
        return this.contract;
    }

    getNonce(publicKey : string) {
        return this.web3.eth.getTransactionCount(publicKey, 'latest');
    }

    async signTransaction(data: TransactionRequest, publicKey: string, privateKey: string) {
        data.to = this.contractAddress
        data.from = publicKey
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

    createAccount() {
        const account = this.web3.eth.accounts.create();
        return [account.address, account.privateKey];
    }

    async getBalance(address: string) {
        const balance = await this.web3.eth.getBalance(address)
        return parseInt(balance)
    }

}

export default new ContractService(web3, contract);
