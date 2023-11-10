import React from 'react';
import PaymentConfirmationPage from "@/components/pages/payments/PaymentConfirmationPage";

interface Props {
    searchParams: {
        id: string
    }
}

const PaymentPage = ({searchParams: {id}}: Props) => {
    return (
        <>
            <PaymentConfirmationPage id={id}/>
        </>
    );
};

export default PaymentPage;