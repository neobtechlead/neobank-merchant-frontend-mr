'use client'
import React from 'react';
import {useRouter} from 'next/navigation';
import PaymentModal from '@/components/pages/payments/PaymentModal';
import ModalDialog from '@/components/pages/payments/ModalDialog';
import CheckCircle from '@/assets/svgs/CheckCircle.svg';
import Error from '@/assets/svgs/Error.svg'
import IDCard from '@/assets/svgs/IdCard.svg';
import UserCircle from '@/assets/svgs/UserCircle.svg';
import Amount from '@/assets/svgs/Amount.svg';
import ShortDescription from '@/assets/svgs/ShortDescription.svg';
import Loading from '@/app/payments/loading';
import ErrorPage from '@/app/payments/error';

import {usePaymentCallBack} from '@/components/pages/payments/hooks/usePaymentCallBack';
import {formatAmountGHS} from "@/utils/lib";

interface Props {
    searchParams: {
        status: string;
        clientReference: string;
    };
}

const PaymentCallbacksPage = ({searchParams: {status, clientReference}}: Props) => {
    const {
        data,
        isLoading,
        error,
        modalType,
        isModalOpen,
        setModalOpen
    }
        = usePaymentCallBack(status, clientReference);

    const router = useRouter();

    const handleReturn = () => {
        setModalOpen(false);
        return router.push('https://www.completefarmer.com')
    };

    const iconData = data
        ? [
            {label: 'Transaction ID', value: data.transactionId, icon: IDCard},
            {label: 'Name', value: data.accountName, icon: UserCircle},
            {label: 'Amount', value: `GHS ${formatAmountGHS(data.amount)}`, icon: Amount},
            {label: 'Description', value: data.narration, icon: ShortDescription},
        ]
        : [];

    if (isLoading) return <Loading/>;
    if (error) return <ErrorPage errorMessage={error}/>;

    return (
        <>
            <ModalDialog isOpen={isModalOpen} onClose={handleReturn} className="p-[94px]"
                         backdropClassName="bg-black/20">
                <PaymentModal
                    title={modalType === 'success' ? 'Payment Successful' : 'Payment Failed'}
                    description={
                        modalType === 'success'
                            ? `Payment made to ${data?.merchantName} has been made successfully`
                            : 'There was an issue trying to process your payment. Please try again.'
                    }
                    icon={modalType === 'success' ? CheckCircle : Error}
                    iconData={iconData}
                    returnButtonLabel={modalType === 'success' ? 'Return' : 'Try again'}
                    onReturn={handleReturn}
                />
            </ModalDialog>
        </>
    );
};
export default PaymentCallbacksPage;
