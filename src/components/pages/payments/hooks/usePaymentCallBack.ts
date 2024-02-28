import {useEffect, useState} from "react";
import {PaymentData} from "@/utils/types";
import {getPaymentDataClient} from "@/api/payment";

export const usePaymentCallBack = (status: string, clientReference: string) => {
    const [data, setData] = useState<PaymentData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'success' | 'error' | ''>(''); // Initialize modalType as empty string

    const fetchPaymentData = async () => {
        try {
            const paymentData = await getPaymentDataClient(clientReference, status);
            setIsLoading(false);
            setData(paymentData);

            if (status === 'completed') {
                setModalType('success');
            } else {
                setModalType('error');
            }

            setModalOpen(true);
        } catch (err) {
            handleError(err)
        }
    };

    const handleError = (err: any) => {
        setIsLoading(false);
        setError(err.message || 'An unexpected error occurred.');
    };

    useEffect(() => {
        fetchPaymentData();
    }, [status, clientReference]);

    return {data, isLoading, error, modalType, isModalOpen, setModalOpen};
};
