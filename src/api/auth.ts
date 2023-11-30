import {fetcher} from "@/api/http";

export async function verifyEmailLink(token: string | null) {
    return await fetcher(`api/v1/auth/verify-email-link?token=${token}`);
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

export async function createPassword(password: string, confirmPassword: string, jwtToken: string | undefined) {
    return await fetcher('api/v1/auth/create-passwords', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, confirmPassword})
    });
}

export async function resendOtp(email: string | undefined, jwtToken: string | undefined) {
    return await fetcher('api/v1/auth/resend-otp', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    });

export async function verifyOtp(accessKey: string | null, otp: string) {
    const response = await fetch(`https://e7915ae1-ad00-483d-b54a-5a027258d354.mock.pstmn.io/auth/verify-otp`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({accessKey, otp})
    });

    if (!response.ok) throw new Error('Password change could not be completed!');
    return await response.json();
}

export async function login(email: string | undefined, password: string | undefined) {
    return await fetcher('api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
}


