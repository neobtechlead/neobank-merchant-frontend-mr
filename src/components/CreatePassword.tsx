import React, {FormEventHandler, useEffect, useState} from 'react';
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";

interface AlertProps {
    handleSubmit: (password: string) => void;
    handleError: (error: string) => void;
    buttonText?: string;
}

const CreatePassword: React.FC<AlertProps> = ({handleSubmit, handleError, buttonText= 'Create Password'}) => {
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

    const formSubmitted: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            setHasError(true)
            return handleError('Passwords are not identical')
        }

        if (!hasError) return handleSubmit(formData.password)
    }

    return (
        <>
            <form onSubmit={formSubmitted} className="flex flex-col">
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
                    />
                </div>

                <Button buttonType="submit" styleType="primary" disabled={hasError}
                        customStyles={`shadow-sm justify-center mt-[50px] p-4 md:p-5 rounded-lg ${hasError ? 'bg-purple-900 cursor-pointer' : 'bg-purple-200 cursor-not-allowed'}`}>
                    {buttonText}
                </Button>
            </form>
        </>
    );
}

export default CreatePassword;