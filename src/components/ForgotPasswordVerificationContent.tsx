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
import {IAlert} from "@/utils/interfaces/IAlert";

const ForgotPasswordVerificationContent: React.FC = () => {
        const [title, setTitle] = useState<string>('Enter OTP');
        const [description, setDescription] = useState<string>('Type the verification code sent your mobile number.');
        const [otpVerified, setOtpVerified] = useState<boolean | null>(false);
        const token = useSearchParams().get('token')
        const router = useRouter()
        const [alertInfo, setAlertInfo] = useState<IAlert>({
            alertType: '',
            description: '',
        });

        const {
            user,
            setUser,
            setMerchant,
            setIsAuthenticated,
        } = useUserStore();
        const {loading, setLoading} = useUtilsStore();

        const handleVerifyOtp = async (otp: string) => {
            if (setLoading) setLoading(true)
            setAlertInfo({alertType: '', description: ''})

            const accessKey = user?.accessKey ? user?.accessKey : token
            verifyPasswordResetOtp(accessKey ?? '', otp)
                .then(async (response) => {
                    const feedback = await response.json()
                    if (setLoading) setLoading(false)
                    if (response.ok) {
                        setAlertInfo({alertType: '', description: ''})
                        setOtpVerified(true)
                        setTitle('Create a new password')
                        setDescription('Create a password to sign in to your account')

                        const {data} = feedback
                        if (setUser) setUser({externalId: data.id, ...data})
                        setOtpVerified(true)
                    } else {
                        return setAlertInfo({alertType: 'error', description: getError(feedback)})
                    }

                })
                .catch((error) => {
                    if (setLoading) setLoading(false);
                    return setAlertInfo({alertType: 'error', description: getError(error)})
                })
        };

        const handleResendOtp = () => {
            if (setLoading) setLoading(true);
            setAlertInfo({alertType: '', description: ''})

            const accessKey = user?.accessKey ? user?.accessKey : token
            resendOtp(accessKey ?? '','EMAIL')
                .then(async (response) => {
                    if (setLoading) setLoading(false);

                    const feedback = await response.json()
                    if (response.ok) {
                        const {data} = feedback
                        setAlertInfo({
                            alertType: 'success', description: 'Please provide the new OTP sent to your email.',
                        })
                        if (setUser) return setUser({accessKey: data.accessKey})
                    }
                    setAlertInfo({alertType: 'error', description: getError(feedback)})
                })
                .catch((error) => {
                    if (setLoading) setLoading(false);
                    setAlertInfo({alertType: 'error', description: getError(error)})
                })
        };

        const handlePasswordCreate = (password: string) => {
            setAlertInfo({alertType: '', description: ''})

            if (setLoading) setLoading(true);
            resetPassword(password, user?.accessKey)
                .then(async (response) => {
                    const feedback = await response.json()

                    if (!response.ok) {
                        if (setLoading) setLoading(false);
                        return setAlertInfo({alertType: 'error', description: getError(feedback)})
                    }

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
                    setAlertInfo({alertType: 'error', description: getError(error)})
                })
        };

        const handleError = (error: string) => setAlertInfo({alertType: 'error', description: error})

        return (
            <AuthContentWrapper title={title} description={description} alertInfo={alertInfo}
                                customClasses="py-10 min-w-full mx-10">
                {!otpVerified
                    ? <VerifyOtp handleSubmit={handleVerifyOtp} handleResend={handleResendOtp} otpLength={6}
                                 loading={loading ?? false}/>
                    : <CreatePassword handleError={handleError} handleSubmit={handlePasswordCreate}
                                      loading={loading ?? false}/>}
            </AuthContentWrapper>);
    }
;

export default ForgotPasswordVerificationContent;
