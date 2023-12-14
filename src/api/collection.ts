import {fetcher} from "@/api/http";

export async function listCollections(merchant?: string, authToken: string = '') {
    return await fetcher(`api/v1/merchants/${merchant}/transactions?type=COLLECTION`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });
}

export async function generatePaymentLink(merchant?: string, authToken?: string, data?: object) {
    return await fetcher(`api/v1/merchants/${merchant}/collections`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}
