import {fetcher} from "@/api/http";

export async function getStats(merchant?: string) {
    return await fetcher(`api/v1/merchants/${merchant}/stats`);
}



