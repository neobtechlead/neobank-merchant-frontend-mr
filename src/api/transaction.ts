import {fetcher} from "@/api/http";

export async function listTransactions(merchant?: string, authToken: string = '', params: string = '') {
    return await fetcher(`api/v1/merchants/${merchant}/transactions?${params ? '&' + params : ''}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });
}