import {fetcher} from "@/api/http";

export async function getStats(merchant?: string) {
    return await fetcher(`api/v1/merchants/${merchant}/stats`);
}

export async function verifyOtp(accessKey: string | undefined, otp: string) {
    return await fetcher('api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({accessKey, otp})
    });
}



