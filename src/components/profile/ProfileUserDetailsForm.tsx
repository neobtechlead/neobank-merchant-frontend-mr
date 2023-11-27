import React, {FormEventHandler, useEffect, useState} from "react";
import TextInput from "@/components/forms/TextInput";
import InfoCardItem from "@/components/InfoCardItem";

const ProfileUserDetailsForm: React.FC<IProfileUserDetailsProps> = ({user}) => {

    useEffect(() => {
    }, []);

    const handleFormSubmitted: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
    }

    return (
        <>
            <form method="POST" onSubmit={handleFormSubmitted}
                  className="grid grid-cols-9 overflow-y-auto border-b border-gray-900/10 pb-10">
                <div className="col-span-3">
                    <InfoCardItem
                        title="My Profile"
                        description="My name and personal information."
                        customDescriptionStyles="mt-2"
                        customTitleStyles="font-semibold"
                    />
                </div>

                <div className="ml-40 col-span-6">
                    <div className="flex flex-col items-center">
                        <TextInput
                            label="name"
                            id="user"
                            name="user"
                            type="text"
                            placeholder={user.name}
                            required={false}
                            disabled={true}
                            customClasses="w-full col-span-2"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <TextInput
                            label="contact number"
                            id="contact"
                            name="contact"
                            type="text"
                            placeholder={user.phone}
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
                            placeholder={user.email}
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

export default ProfileUserDetailsForm