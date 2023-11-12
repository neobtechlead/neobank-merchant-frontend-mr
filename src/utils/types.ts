export type PaymentData = {
    callbackUrl: string;
    transactionId: string;
    amount: string;
    clientReference: string,
    narration: string;
    merchantName: string;
    accountName: string;
    email: string;
}

export type PaymentLinkData = {
    url: string

}


export type ApiResponse<T> = {
    httpStatusCode: number;
    message: string;
    data: T
}

export type IconWithData = {
    label?: string;
    value?: string;
    icon?: string;
}

