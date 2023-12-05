import {fetcher} from "@/api/http";

export async function getStats(merchant?: string) {
    return await fetcher(`api/v1/merchants/${merchant}/stats`);
}

export async function getTransactionSummary(merchant?: string, startDate?: Date, endDate?: Date) {
    return await fetcher(`api/v1/merchants/${merchant}/transaction-summary?startDate=${startDate}&endDate=${endDate}`);
}


