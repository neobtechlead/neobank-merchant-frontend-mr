import React, {FormEventHandler, useEffect, useState} from 'react';
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import InfoCardItem from "@/components/InfoCardItem";
import {updatePassword} from "@/api/auth";
import {useUserStore} from "@/store/UserStore";
import {getError} from "@/utils/lib";
import Alert from "@/components/Alert";
import {IAlert} from "@/utils/interfaces/IAlert";
import {useUtilsStore} from "@/store/UtilsStore";
import Loader from "@/components/Loader";

const SettingsChangePasswordForm: React.FC = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const {
        user
    } = useUserStore();

    useEffect(() => {
        if (Object.values(formData).every((field) => field === '')) setHasError(true)
    }, []);

    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string | null>('');
    const [alertInfo, setAlertInfo] = useState<IAlert>({alertType: '', description: ''});
    const {loading, setLoading} = useUtilsStore()


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

        if (name === 'confirmPassword' && value.length > 0) setHasError(false)
    };

    const handleFormSubmitted: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if (formData.newPassword !== formData.confirmPassword) {
            setAlertInfo({alertType: 'error', description: 'Passwords are not identical'})
            return setHasError(true)
        }
        if (!hasError) return handlePasswordChange()
    }

    const handlePasswordChange = () => {
        setAlertInfo({alertType: '', description: ''})
        if (setLoading) setLoading(true)
        updatePassword(formData.currentPassword, formData.confirmPassword, user?.authToken)
            .then(async (response) => {
                const feedback = await response.json()
                if (setLoading) setLoading(false)

                if (response.ok) {
                    setHasError(false)
                    setFormData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    })
                    return setAlertInfo({alertType: 'success', description: getError(feedback)})
                }
                setHasError(true)
                setAlertInfo({alertType: 'error', description: getError(feedback)})
            })
            .catch((error) => {
                if (setLoading) setLoading(false)
                setAlertInfo({alertType: 'error', description: getError(error)})
            })
    }

    return (
        <>
            <div className="w-full h-full flex justify-center">
                <div className="mt-10">
                    <div className="gap-x-8">
                        {alertInfo.alertType && <Alert alertType={alertInfo.alertType}
                                                       description={alertInfo.description ?? ''} customClasses="mb-5"/>}

                        <form method="POST" onSubmit={handleFormSubmitted} className="grid grid-cols-9 overflow-y-auto">
                            <div className="col-span-2">
                                <InfoCardItem
                                    title="Password"
                                    description="Update your password"
                                    customDescriptionStyles="mt-2"
                                    customTitleStyles="font-semibold"
                                />
                            </div>

                            <div className="ml-40 col-span-7">
                                <div className="flex flex-col items-center">
                                    <TextInput
                                        label="current password"
                                        id="currentPassword"
                                        name="currentPassword"
                                        type="password"
                                        placeholder="Current Password"
                                        required={true}
                                        onInputChange={handleInputChange}
                                        hasError={setHasError}
                                        customClasses="w-full col-span-2"
                                        passwordIcon
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <TextInput
                                        label="new password"
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        placeholder="New Password"
                                        required={true}
                                        onInputChange={handleInputChange}
                                        hasError={setHasError}
                                        customClasses="w-full"
                                        passwordIcon
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <TextInput
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        required={true}
                                        onInputChange={handleInputChange}
                                        hasError={setHasError}
                                        customClasses="w-full"
                                        passwordIcon
                                    />
                                </div>
                            </div>

                            <div className="col-span-9 my-10">
                                <Button
                                    styleType="primary"
                                    customStyles="flex justify-center p-4 md:p-5 rounded-lg w-full"
                                    buttonType="submit"
                                    disabled={loading || hasError}
                                >
                                    {!loading && <span className="flex self-center">Save Changes</span>}
                                    {loading && <Loader type="default"
                                                        customClasses="relative"
                                                        customAnimationClasses="w-10 h-10 text-white dark:text-gray-600 fill-purple-900"
                                    />}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsChangePasswordForm;
