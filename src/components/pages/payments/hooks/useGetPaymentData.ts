import {getPaymentDataClient} from '@/api/payment';
import {useEffect, useState} from 'react';
import {PaymentData} from "@/utils/types";

export default (clientReference: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PaymentData | null>(null)

    const getPaymentData = async () => {
        try {
            const data = await getPaymentDataClient(clientReference);
            setIsLoading(false);
            setData(data)
        } catch (err) {
            handleError(err)
        }
    };

    const handleError = (err: any) => {
        setIsLoading(false);
        setError(err.message || 'An unexpected error occurred.');
    };

    useEffect(() => {
        getPaymentData();
    }, [clientReference]);

    return {data, isLoading, error};
};
