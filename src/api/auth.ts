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

export async function createPassword(password: string, confirmPassword: string, authToken: string | undefined) {
    return await fetcher('api/v1/auth/create-password', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, confirmPassword})
    });
}

export async function resendOtp(accessKey: string | undefined) {
    return await fetcher(`api/v1/auth/resend-otp?accessKey=${accessKey}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
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

export async function logout(jwtToken: string | undefined) {
    return await fetcher('api/v1/auth/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        },
    });
}

export async function updatePassword(currentPassword: string, newPassword: string, authToken: string | undefined) {
    return await fetcher('api/v1/auth/update-password', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({currentPassword, newPassword})
    });
}

