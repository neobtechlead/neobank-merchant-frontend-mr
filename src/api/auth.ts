export async function verifyEmailLink(token: string) {
    // const response = await fetch(`${process.env.REACT_APP_API_KEY}/auth/verify-email-link?token=${token}`);
    //
    // if (!response.ok) throw new Error('Email link verification could not be completed!');
    //
    // return await response.json();
}

export async function verifyOtp(accessKey: string, otp: string) {
    // const response = await fetch(`${process.env.REACT_APP_API_KEY}/auth/verify-otp`, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${accessKey}`,
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({accessKey, otp})
    // });
    //
    // if (!response.ok) throw new Error('Password change could not be completed!');
    // return await response.json();
}

export async function changePassword(password: string, confirmPassword: string) {
    // const JWTToken = "get the global JWT token"
    // const response = await fetch(`${process.env.REACT_APP_API_KEY}/auth/created-password`, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${JWTToken}`,
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({password, confirmPassword})
    // });
    //
    // if (!response.ok) throw new Error('Password change could not be completed!');
    //
    // return await response.json();
}


