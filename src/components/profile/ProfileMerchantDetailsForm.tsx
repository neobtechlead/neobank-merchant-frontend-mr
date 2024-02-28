import React, {FormEventHandler, useEffect, useState} from "react";
import TextInput from "@/components/forms/TextInput";
import InfoCardItem from "@/components/InfoCardItem";
import {useUserStore} from "@/store/UserStore";

const ProfileMerchantDetailsForm: React.FC = () => {
    const [formData, setFormData] = useState({password: "", confirmPassword: ""});
    const [hasError, setHasError] = useState<boolean>(false);
    const {
        merchant,
        user
    } = useUserStore();

    useEffect(() => {
        if (Object.values(formData).every((field) => field === '')) setHasError(true)
    }, []);

    const handleFormSubmitted: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
    }

    return (
        <>
            <form method="POST" onSubmit={handleFormSubmitted} className="grid grid-cols-9 overflow-y-auto py-10">
                <div className="col-span-3">
                    <InfoCardItem
                        title="Merchant Profile"
                        description="Name and personal information about this merchant."
                        customDescriptionStyles="mt-2 text-sm"
                        customTitleStyles="font-semibold"
                    />
                </div>

                <div className="ml-40 col-span-6">
                    <div className="flex flex-col items-center">
                        <TextInput
                            label="merchant name"
                            id="merchant"
                            name="merchant"
                            type="text"
                            placeholder={merchant?.businessName}
                            required={false}
                            disabled={true}
                            customClasses="w-full col-span-2"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <TextInput
                            label="contact number"
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder={merchant?.phoneNumber}
                            required={false}
                            disabled={true}
                            customClasses="w-full col-span-2"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <TextInput
                            label="email address"
                            id="email"
                            name="email"
                            type="email"
                            placeholder={user?.email}
                            required={false}
                            disabled={true}
                            customClasses="w-full col-span-2"
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default ProfileMerchantDetailsForm