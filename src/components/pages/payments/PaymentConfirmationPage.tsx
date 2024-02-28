'use client'
import React, {useState} from 'react';
import PaymentConfirmationHeader from '@/components/pages/payments/PaymentConfirmationHeader';
import PaymentConfirmationBody from '@/components/pages/payments/PaymentConfirmationBody';
import PaymentConfirmationFooter from '@/components/pages/payments/PaymentConfirmationFooter';
import Loading from "@/app/payments/loading";
import useGetPaymentData from "@/components/pages/payments/hooks/useGetPaymentData";
import ErrorPage from "@/app/payments/error";
import RejectPaymentModal from "@/components/pages/payments/RejectPaymentModal";
import {useRouter} from "next/navigation";

interface Props {
    id: string;

}

const PaymentConfirmationPage: React.FC<Props> = ({id}) => {


    const {data, isLoading, error} = useGetPaymentData(id);
    const [isRejectModalOpen, setRejectModalOpen] = useState(false)
    const router = useRouter();


    const handleReject = async () => {
        router.replace(`/payments/cancelled?id=${id}`)

    }

    const handleNoReject = () => {
        setRejectModalOpen(false);

    }

    if (isLoading) return <Loading/>
    if (error) return <ErrorPage errorMessage={error}/>

    return <>
        <RejectPaymentModal
            handleReject={handleReject}
            handleNoReject={handleNoReject}
            isOpen={isRejectModalOpen}
            onClose={handleNoReject}/>

        {data && <div className="flex justify-center mt-4 mb-[185px]">
            <div className="w-5/12 border rounded-[10px] overflow-hidden">
                <div className="border-b border-gray-300">
                    <PaymentConfirmationHeader data={data}/>
                </div>
                <PaymentConfirmationBody data={data}/>
                <PaymentConfirmationFooter data={data} onPaymentReject={() => setRejectModalOpen(true)}/>
            </div>
        </div>}
    </>

};

export default PaymentConfirmationPage;
