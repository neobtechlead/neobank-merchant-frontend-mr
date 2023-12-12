'use client'

import React from 'react';
import PaymentConfirmationPage from "@/components/pages/payments/PaymentConfirmationPage";
import ConfirmedPayment from "@/components/pages/payments/ConfirmedPayment";
import RejectPaymentModal from "@/components/pages/payments/RejectPaymentModal";

interface Props {
    searchParams: {
        id?: string
        confirm?: string
        reject?: string
        clientReference?: string
    }
}


const PaymentPage = ({searchParams: {id, confirm, reject, clientReference}}: Props) => {
    const handleNoReject = () => {
    }
    const handleReject = () => {
    }
    const onClose = () => {
    }

    return (
        <>
            {id && <PaymentConfirmationPage id={id}/>}
            {confirm && clientReference && <ConfirmedPayment clientReference={clientReference}/>}
            {reject && clientReference &&
                <RejectPaymentModal
                    clientReference={clientReference}
                    handleNoReject={handleNoReject}
                    handleReject={handleReject} onClose={onClose}/>}
        </>
    )

};

export const dynamic = 'dynamic force';

export default PaymentPage;