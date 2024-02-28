'use client'
import React, {useEffect, useState} from 'react';
import VerificationContent from "@/components/VerificationContent";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import {useSearchParams} from "next/navigation";
import {useUserStore} from "@/store/UserStore";

const ForgotPassword: React.FC = () => {
    const [emailSubmitted, setEmailSubmitted] = useState<boolean | null>(false);
    const token = useSearchParams().get('token')
    const {
        setIsAuthenticated,
    } = useUserStore();

    useEffect(() => {
        if (setIsAuthenticated) setIsAuthenticated(false)
        if (token && !['', null, undefined].includes(token)) setEmailSubmitted(true)
    }, [])

    return (
        <>
            {!emailSubmitted && <ForgotPasswordForm/>}
            {emailSubmitted && <VerificationContent/>}
        </>
    );
};

export default ForgotPassword;

