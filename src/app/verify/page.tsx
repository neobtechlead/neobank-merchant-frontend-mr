'use client'

import React, {useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import Verification from "@/components/Verification";

const Verify: React.FC = () => {
    const token = useSearchParams().get('token')
    // console.log(token)

    return (
        <Verification token={token}/>
    );
};

export default Verify;
