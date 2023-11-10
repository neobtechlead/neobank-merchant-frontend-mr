'use client'
import React from 'react';
import {poppins} from "@/fonts";
import TextButton from "@/components/pages/payments/TextButton";

interface Props {
    onConfirmPayment: () => void
    onRejectPayment: () => void
}

const PaymentConfirmationFooter = ({onConfirmPayment, onRejectPayment}: Props) => {

    return (
        <div className={`flex flex-col px-6 py-[30px] text-[13px] ${poppins.className}`}>
            <TextButton label="Confirm Payment" color="bg-[#652D90] text-white" onClick={onConfirmPayment}/>
            <TextButton label="Reject Payment" color="text-[#EB2F2F]" className="mt-4" onClick={onRejectPayment}/>
        </div>
    );
};

export default PaymentConfirmationFooter;