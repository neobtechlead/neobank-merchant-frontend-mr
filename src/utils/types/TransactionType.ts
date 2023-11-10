export type TransactionType = {
    id?: string,
    date: string,
    time?: string,
    recipient?: string,
    batchNumber?: string,
    type: string,
    amount: number,
    status?: string,
    phone?: string,
    reference: string
}