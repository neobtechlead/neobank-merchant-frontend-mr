import {getPaymentLink} from '@/api/payment';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default (clientReference: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const confirmPayment = async () => {
        try {
            const {url} = await getPaymentLink(clientReference);
            setIsLoading(false);
            router.replace(url);
        } catch (err) {
            handleError(err)
        }
    };

    const handleError = (err: any) => {
        setIsLoading(false);
        setError(err.message || 'An unexpected error occurred.');
    };

    useEffect(() => {
        confirmPayment();
    }, [clientReference]);

    return {isLoading, error};
};
