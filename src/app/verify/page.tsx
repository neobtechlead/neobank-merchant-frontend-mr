'use client'

import React, {useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {useUserStore} from "@/store/UserStore";
import VerificationContent from "@/components/VerificationContent";

const Verify: React.FC = () => {
    const {
        setVerificationToken,
    } = useUserStore();

    const token = useSearchParams().get('token')

    useEffect(() => {
        setVerificationToken(token)
    }, [])

    return (
        <VerificationContent/>
    );
};

export default Verify;
