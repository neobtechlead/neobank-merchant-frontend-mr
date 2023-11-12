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
    return (
        <>
            {id && <PaymentConfirmationPage id={id}/>}
            {confirm && clientReference && <ConfirmedPayment clientReference={clientReference}/>}
            {reject && clientReference && <RejectPaymentModal clientReference={clientReference}/>}
        </>
    )

};

export default PaymentPage;