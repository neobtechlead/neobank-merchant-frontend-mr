'use client'
import React, {useState} from 'react';
import AuthContentWrapper from "@/components/auth/AuthContentWrapper";
import VerifyOtp from "@/components/VerifyOtp";
import CreatePassword from "@/components/CreatePassword";
import {resendOtp, resetPassword, verifyPasswordResetOtp} from "@/api/auth";
import {getError} from "@/utils/lib";
import {useSearchParams, useRouter} from "next/navigation";
import {useUserStore} from "@/store/UserStore";
import {useUtilsStore} from "@/store/UtilsStore";

const VerificationContent: React.FC = () => {
    const [title, setTitle] = useState<string>('Enter OTP');
    const [description, setDescription] = useState<string>('Type the verification code sent your mobile number.');
    const [error, setError] = useState<string>('');
    const [otpVerified, setOtpVerified] = useState<boolean | null>(false);
    const token = useSearchParams().get('token')
    const router = useRouter()

    const {
        user,
        setUser,
        setMerchant,
        setIsAuthenticated,
    } = useUserStore();
    const {loading, setLoading} = useUtilsStore();

    const handleVerifyOtp = async (otp: string) => {
        if (setLoading) setLoading(true)

        verifyPasswordResetOtp(token, otp)
            .then(async (response) => {
                const feedback = await response.json()
                if (setLoading) setLoading(false)

                if (response.ok) {
                    setError('')
                    setOtpVerified(true)
                    setTitle('Create a new password')
                    setDescription('Create a password to sign in to your account')

                    const {data} = feedback
                    if (setUser) setUser({
                        externalId: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        authToken: data.accessKey
                    })

                    setOtpVerified(true)
                } else
                    return setError(getError(feedback))
            })
            .catch((error) => {
                if (setLoading) setLoading(false);
                setError(error.message)
            })
    };

    const handleResendOtp = () => {
        if (setLoading) setLoading(false);
        setError('')

        resendOtp(token ?? user?.authToken)
            .then(async (response) => {
                if (response.ok) {

                    const data = await response.json()
                    if (setUser) return setUser({accessKey: data.accessKey})
                }
            })
            .catch((error) => {
                if (setLoading) setLoading(false);
                setError(error.message)
            })
    };

    const handlePasswordCreate = (password: string) => {
        if (setLoading) setLoading(true);

        resetPassword(password, user?.authToken)
            .then(async (response) => {
                const feedback = await response.json()
                if (setLoading) setLoading(false);

                if (!response.ok) return setError(getError(feedback))
                setError('')

                const {data} = feedback
                if (setIsAuthenticated) setIsAuthenticated(true)
                if (setMerchant) setMerchant({...data.merchant})
                if (setUser) setUser({
                    externalId: data.id,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    authToken: data.token,
                    roles: data.roles
                })

                return router.push('/overview')
            })
            .catch((error) => {
                if (setLoading) setLoading(false);
                setError(error.message)
            })
    };

    const handleError = (error: string) => setError(error)

    return (
        <AuthContentWrapper title={title} description={description} error={error}>
            <div className="min-w-[27rem]">
                {!otpVerified &&
                    <VerifyOtp handleSubmit={handleVerifyOtp} handleResend={handleResendOtp} otpLength={6}
                               loading={loading ?? false}/>}
                {otpVerified && <CreatePassword handleError={handleError} handleSubmit={handlePasswordCreate}/>}
            </div>
        </AuthContentWrapper>);
};

export default VerificationContent;
