import React, {useEffect, useState} from 'react';
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import {ICreatePasswordProps} from "@/utils/interfaces/ICreatePasswordProps";
import Loader from "@/components/Loader";

const CreatePassword: React.FC<ICreatePasswordProps> = ({handleSubmit, handleError, buttonText = 'Create Password', loading= false}) => {
    const [formData, setFormData] = useState({password: "", confirmPassword: ""});
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        if (Object.values(formData).every((field) => field === '')) setHasError(true)
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

        if (name === 'confirmPassword' && value.length > 0) setHasError(false)
    };

    const handleCreatePassword: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            setHasError(true)
            return handleError('Passwords are not identical')
        }

        if (!hasError) return handleSubmit(formData.password)
    }

    return (
        <>
            <form onSubmit={handleCreatePassword} className="flex flex-col">
                <div className="space-y-5">
                    <TextInput
                        label="password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="false"
                        placeholder="New password"
                        required={true}
                        onInputChange={handleInputChange}
                        hasError={setHasError}
                        passwordIcon
                        customClasses="w-full"
                    />
                    <TextInput
                        label="confirm password"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="false"
                        placeholder="Confirm password"
                        required={true}
                        onInputChange={handleInputChange}
                        hasError={setHasError}
                        passwordIcon
                        customClasses="w-full"
                    />
                </div>

                <Button buttonType="submit" styleType="primary" disabled={hasError || loading}
                        customStyles={`shadow-sm justify-center mt-[50px] p-4 md:p-5 rounded-lg ${hasError ? 'bg-purple-900 cursor-pointer' : 'bg-purple-200 cursor-not-allowed'}`}>
                    {!loading && <span className="flex self-center">{buttonText}</span>}
                    {loading && <Loader type="default"
                                        customClasses="relative"
                                        customAnimationClasses="w-10 h-10 text-white dark:text-gray-600 fill-purple-900"
                    />}
                </Button>
            </form>
        </>
    );
}

export default CreatePassword;