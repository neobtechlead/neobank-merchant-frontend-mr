import React, {useEffect, useState} from "react";
import ProfileUserDetailsForm from "@/components/profile/ProfileUserDetailsForm";
import ProfileMerchantDetailsForm from "@/components/profile/ProfileMerchantDetailsForm";

const ProfileContent: React.FC<IProfileContentProps> = () => {
    const [formData, setFormData] = useState({password: "", confirmPassword: ""});
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        if (Object.values(formData).every((field) => field === '')) setHasError(true)
    }, []);

    const user = {
        name: 'Kofi Boakye',
        phone: '+233 50 000 0000',
        email: 'kofiboakye@email.com',
    }

    const merchant = {
        name: 'Complete Farmer',
        phone: '+233 55 555 5555',
        email: 'completefarmer@email.com',
    }

    return (
        <>
            <div className="w-full h-full flex justify-center">
                <div className="mt-10">
                    <div className="gap-x-8">
                        <ProfileUserDetailsForm user={user}/>
                        <ProfileMerchantDetailsForm merchant={merchant}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileContent