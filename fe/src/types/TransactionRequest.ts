export default interface TransactionRequest {
    from?: string | number;
    to?: string;
    value?: number | string;
    gas?: number | string;
    gasPrice?: number | string;
    maxPriorityFeePerGas?: number | string;
    data?: string;
    nonce?: number;
    chainId?: number;
    chain?: string;
}