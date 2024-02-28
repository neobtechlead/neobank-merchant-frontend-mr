import {useEffect} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import {isInitiator, isPayer} from "@/utils/lib";
import {useUserStore} from "@/store/UserStore";

interface AuthHelperProps {
    setHeaderDetails: () => void;
}

export const useAuthHelper = <T extends AuthHelperProps>({setHeaderDetails}: T) => {
    const router = useRouter();
    const pathName = usePathname();
    const {user, isAuthenticated, setIsAuthenticated} = useUserStore();

    useEffect(() => {
        setHeaderDetails();
        if (!isAuthenticated) {
            if (setIsAuthenticated) setIsAuthenticated(false);
            router.replace('/');
        } else {
            if (isInitiator(user) && !['/overview', '/collections', '/reports'].includes(pathName)) {
                return router.replace('/overview')
            }

            if (isPayer(user) && !['/overview', '/disbursements', '/reports'].includes(pathName)) {
                return router.replace('/overview')
            }
        }
    }, [isAuthenticated]);
};
