import {sendRejectionNotification} from '@/api/payment';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default (clientReference: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const rejectPayment = async () => {
        try {
            await sendRejectionNotification(clientReference);
            setIsLoading(false);
            router.push(`/payments?id=${clientReference}`);
        } catch (err) {
            handleError(err)
        }
    };

    const handleError = (err: any) => {
        setIsLoading(false);
        setError(err.message || 'An unexpected error occurred.');
    };

    useEffect(() => {
        rejectPayment();
    }, [clientReference]);

    return {isLoading, error};
};
