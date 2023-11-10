'use client'
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import PaymentModal from '@/components/pages/payments/PaymentModal';
import ModalDialog from '@/components/pages/payments/ModalDialog';
import CheckCircle from "@/assets/svgs/CheckCircle.svg";
import Error from "@/assets/svgs/Error.svg";
import IDCard from "@/assets/svgs/IdCard.svg";
import UserCircle from "@/assets/svgs/UserCircle.svg";
import Amount from "@/assets/svgs/Amount.svg";
import ShortDescription from "@/assets/svgs/ShortDescription.svg";
import {PaymentInfo} from '@/utils/types';

const PaymentCallbacksPage: React.FC<Props> = ({searchParams: {status}}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // To determine whether it's a success or error modal

    const router = useRouter();

    //To be Fetched
    const data: PaymentInfo = {
        transactionId: '455122',
        amount: 'GHS 60,000.00',
        name: 'Kwaku Frimpong',
        description: 'A short description of the customer',
    };

    const iconData = [
        {label: "Transaction ID", value: data.transactionId, icon: IDCard},
        {label: "Name", value: data.name, icon: UserCircle},
        {label: "Amount", value: data.amount, icon: Amount},
        {label: "Description", value: data.description, icon: ShortDescription},
    ];

    //To be fetched
    const merchantName = "CompleteFarmer";

    const handleReturn = () => {
        setModalOpen(false);
        router.push(`/payments?id=${data.transactionId}`);
    }

    useEffect(() => {
        if (status === 'success') {
            setModalType('success');
            setModalOpen(true);
        } else if (status === 'error') {
            setModalType('error');
            setModalOpen(true);
        }
    }, [status]);

    return (
        <>
            <ModalDialog isOpen={isModalOpen} onClose={handleReturn}>
                <PaymentModal
                    title={modalType === 'success' ? 'Payment Successful' : 'Payment Failed'}
                    description={modalType === 'success'
                        ? `Payment made to ${merchantName} has been made successfully`
                        : 'There was an issue trying to process your payment. Please try again.'}
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
