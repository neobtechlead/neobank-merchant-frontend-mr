import type {ApiResponse, PaymentData, PaymentLinkData} from "@/utils/types";

//utility function to handle response error
const handleErrorResponse = async (response: Response) => {
    let errorMessage = "Something went wrong. Please try again.";
    if (response.status >= 400 && response.status < 500) {
        const errorBody: ApiResponse<any> = await response.json();
        if (errorBody && errorBody.message) {
            errorMessage = errorBody.message;
        } else errorMessage = "Invalid Request. Please check and try again."
    }
    return errorMessage;
};


export const getPaymentData = async (id: string): Promise<PaymentData> => {
    const URL = `${process.env.MERCHANT_BASE_URL}/api/v1/merchants/payments/${id}`
    const response = await fetch(URL)
    if (!response.ok) {
        const errorMessage = await handleErrorResponse(response)
        throw new Error(errorMessage)
    }
    const body: ApiResponse<PaymentData> = await response.json();
    return body.data;

}

export const sendRejectionNotification = async (clientReference: string): Promise<void> => {
    const URL = `${process.env.MERCHANT_BASE_URL}/api/v1/merchants/payment-reject/${clientReference}`
    const response = await fetch(URL, {cache: "no-cache"})
    if (!response.ok) {
        const errorMessage = await handleErrorResponse(response)
        throw new Error(errorMessage)
    }

}


//Client Side Fetching
export const getPaymentLink = async (clientReference: string): Promise<PaymentLinkData> => {
    const URL = `${process.env.NEXT_PUBLIC_MERCHANT_BASE_URL}/api/v1/merchants/payment-link/${clientReference}`
    const response = await fetch(URL, {cache: "no-cache"})
    if (!response.ok) {
        const errorMessage = await handleErrorResponse(response)
        throw new Error(errorMessage)
    }
    const body: ApiResponse<PaymentLinkData> = await response.json();
    return body.data;

}


//Client Side Fetching
export const getPaymentDataClient = async (id: string, status = ""): Promise<PaymentData> => {
    const URL = `${process.env.NEXT_PUBLIC_MERCHANT_BASE_URL}/api/v1/merchants/payments/${id}?status=${status}`
    const response = await fetch(URL)
    if (!response.ok) {
        const errorMessage = await handleErrorResponse(response)
        throw new Error(errorMessage)
    }
    const body: ApiResponse<PaymentData> = await response.json();
    return body.data;

}
