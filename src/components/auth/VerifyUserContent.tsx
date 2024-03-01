import React, {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {useUserStore} from "@/store/UserStore";
import {useUtilsStore} from "@/store/UtilsStore";
import {createPassword, resendOtp, verifyEmailLink, verifyOtp} from "@/api/auth";
import {getError} from "@/utils/lib";
import VerifyOtp from "@/components/VerifyOtp";
import CreatePassword from "@/components/CreatePassword";
import AuthContentWrapper from "@/components/auth/AuthContentWrapper";
import {IAlert} from "@/utils/interfaces/IAlert";

const VerifyUserContent: React.FC = () => {
    const [title, setTitle] = useState<string>('Enter OTP');
    const [description, setDescription] = useState<string>('We have sent you a One Time Password to your email address.');
    const [otpVerified, setOtpVerified] = useState<boolean | null>(false);
    const [verificationComplete, setVerificationComplete] = useState(false);
    const [alertInfo, setAlertInfo] = useState<IAlert>({alertType: '', description: ''});

    const router = useRouter();
    const {
        user,
        setUser,
        setMerchant,
        setIsAuthenticated
    } = useUserStore();

    useEffect(() => {
        if (!verificationComplete && !['', null, undefined].includes(token)) {
            handleEmailLinkVerification()
        }
    }, [])

    const {loading, setLoading} = useUtilsStore()
    const token = useSearchParams().get('token')

    const handleEmailLinkVerification = () => {
        verifyEmailLink(token)
            .then(async (response) => {
                const feedback = await response.json()
                if (setLoading) setLoading(false);
                setVerificationComplete(true);

                if (response.ok) {
                    const data = feedback.data
                    if (setUser) setUser({
                        verificationToken: token ?? '',
                        accessKey: data.accessKey,
                    })
                } else
                    return setAlertInfo({alertType: 'error', description: getError(feedback)})
            })
            .catch((error) => {
                setVerificationComplete(false);
                setAlertInfo({alertType: 'error', description: getError(error)})
            })
    }

    const handleVerifyOtp = async (otp: string) => {
        if (setLoading) setLoading(true)
        verifyOtp(user?.accessKey, otp)
            .then(async (response) => {
                const feedback = await response.json()
                if (setLoading) setLoading(false)
                if (response.ok) {
                    setAlertInfo({alertType: '', description: ''})
                    setOtpVerified(true)
                    setTitle('Create a Password')
                    setDescription('Create a password to sign in to your account')

                    const data = feedback.data
                    if (setUser) setUser({
                        externalId: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        authToken: data.token,
                        roles: data.roles
                    })
                    if (setMerchant) setMerchant(data.merchant)
                } else
                    return setAlertInfo({alertType: 'error', description: getError(feedback)})
            })
            .catch((error) => {
                if (setLoading) setLoading(false)
                setAlertInfo({alertType: 'error', description: getError(error)})
            })
    };

    const handlePasswordCreate = (password: string,) => {
        if (setLoading) setLoading(true);
        createPassword(password, password, user?.authToken)
            .then(async (response) => {
                const feedback = await response.json()
                if (setLoading) setLoading(false);

                if (response.ok) {
                    if (setIsAuthenticated) setIsAuthenticated(true)
                    setAlertInfo({alertType: '', description: ''})
                    return router.push('/overview')
                } else
                    return setAlertInfo({alertType: 'error', description: getError(feedback)})
            })
            .catch((error) => {
                if (setLoading) setLoading(false);
                setAlertInfo({alertType: 'error', description: getError(error)})
            })
    };
    const handleResendOtp = () => {
        resendOtp(user?.accessKey)
            .then(async (response) => {
                if (response.ok) {
                    setAlertInfo({alertType: '', description: ''})
                    const data = await response.json()
                    if (setUser) return setUser({accessKey: data.accessKey, ...user})
                }
            })
            .catch((error) => {
                if (setLoading) setLoading(false);
                setAlertInfo({alertType: 'error', description: getError(error)})
            })
    };
    const handleError = (error: string) => setAlertInfo({alertType: 'error', description: error})

    return (
        <AuthContentWrapper title={title} description={description} alertInfo={alertInfo}>
            {otpVerified ? <CreatePassword handleError={handleError} handleSubmit={handlePasswordCreate}/>
                : <VerifyOtp handleSubmit={handleVerifyOtp} handleResend={handleResendOtp} otpLength={6}
                             loading={loading ?? false}/>}
        </AuthContentWrapper>
    );
}

export default VerifyUserContent;
