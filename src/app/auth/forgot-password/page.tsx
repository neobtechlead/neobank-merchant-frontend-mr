'use client'
import React, {useEffect, useState} from 'react';
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import {useSearchParams} from "next/navigation";
import {useUserStore} from "@/store/UserStore";
import ForgotPasswordVerificationContent from "@/components/ForgotPasswordVerificationContent";

const ForgotPassword: React.FC = () => {
    const [emailSubmitted, setEmailSubmitted] = useState<boolean | null>(false);
    const token = useSearchParams().get('token')
    const {setIsAuthenticated} = useUserStore()

    useEffect(() => {
        if (setIsAuthenticated) setIsAuthenticated(false)
        handleAccessKeyAvailability()
    }, [])

    const handleAccessKeyAvailability = () => {
        if (token && !['', null, undefined].includes(token)) setEmailSubmitted(true)
    }

    return (
        <>
            {!emailSubmitted ? <ForgotPasswordForm/> : <ForgotPasswordVerificationContent/>}
        </>
    );
};

export default ForgotPassword;

