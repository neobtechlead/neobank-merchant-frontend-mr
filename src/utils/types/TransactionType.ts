export type TransactionType = {
    externalId?: string,
    accountIssuer?: string,
    type?: string,
    amount?: string, // change type to number later
    status?: string,
    clientReference?: string,
    narration?: string,
    scheduled?: boolean
    createdAt?: string,
    updatedAt?: string,
    balanceBefore?: number,
    balanceAfter?: number,
    processAt?: string,
    accountNumber?: string,
    initiatorName?: string,
    callbackUrl?: string,
    batchId?: string

    id?: string,
    date?: string,
    time?: string,
    recipient?: string,
    client?: string,
    batchNumber?: string,
    phone?: string,
    reference?: string,
    email?: string,
    channel?: string,
    sender?: string,
    balance?: string,
    description?: string
}