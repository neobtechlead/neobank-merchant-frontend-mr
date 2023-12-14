import React from "react";
import ProfileUserDetailsForm from "@/components/profile/ProfileUserDetailsForm";
import ProfileMerchantDetailsForm from "@/components/profile/ProfileMerchantDetailsForm";

const ProfileContent: React.FC<IProfileContentProps> = () => {
    return (
        <>
            <div className="w-full h-full flex justify-center">
                <div className="mt-10">
                    <div className="gap-x-8">
                        <ProfileUserDetailsForm/>
                        <ProfileMerchantDetailsForm/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileContent